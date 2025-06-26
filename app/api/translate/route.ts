import { NextResponse } from 'next/server';

// Function to split text into chunks while preserving sentence boundaries
function splitTextIntoChunks(text: string, maxChunkSize: number = 200): string[] {
    // If text is short enough, return as single chunk
    if (text.length <= maxChunkSize) {
        return [text];
    }

    const chunks: string[] = [];

    // Split by sentences first (. ! ? followed by space or end of string)
    const sentences = text.split(/(?<=[.!?])\s+/);

    let currentChunk = '';

    for (const sentence of sentences) {
        // If adding this sentence would exceed the limit
        if ((currentChunk + ' ' + sentence).length > maxChunkSize) {
            // If we have accumulated text, add it as a chunk
            if (currentChunk.trim()) {
                chunks.push(currentChunk.trim());
                currentChunk = sentence;
            } else {
                // If even a single sentence is too long, split it by words
                const words = sentence.split(' ');
                let wordChunk = '';

                for (const word of words) {
                    if ((wordChunk + ' ' + word).length > maxChunkSize) {
                        if (wordChunk.trim()) {
                            chunks.push(wordChunk.trim());
                            wordChunk = word;
                        } else {
                            // If even a single word is too long, truncate it
                            chunks.push(word.substring(0, maxChunkSize));
                            if (word.length > maxChunkSize) {
                                wordChunk = word.substring(maxChunkSize);
                            }
                        }
                    } else {
                        wordChunk = wordChunk ? wordChunk + ' ' + word : word;
                    }
                }

                if (wordChunk.trim()) {
                    currentChunk = wordChunk;
                }
            }
        } else {
            // Add sentence to current chunk
            currentChunk = currentChunk ? currentChunk + ' ' + sentence : sentence;
        }
    }

    // Add any remaining text as the last chunk
    if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

// Function to translate a single chunk using LibreTranslate as fallback
async function translateChunk(text: string, sourceLang: string, targetLang: string, apiKey?: string): Promise<string> {
    console.log(`Translating chunk (${text.length} chars) from ${sourceLang} to ${targetLang}`);

    // First try MyMemory with POST request to avoid URL length issues
    try {
        const response = await fetch('https://api.mymemory.translated.net/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                q: text,
                langpair: `${sourceLang}|${targetLang}`,
                ...(apiKey && { de: apiKey })
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('MyMemory translation response received for chunk:', data);

            if (data && data.responseData && data.responseData.translatedText) {
                return data.responseData.translatedText;
            }
        }

        console.log('MyMemory failed, trying with GET request with shorter text');
    } catch (error) {
        console.log('MyMemory POST request failed:', error);
    }

    // Fallback to GET request with potentially truncated text
    try {
        const truncatedText = text.length > 100 ? text.substring(0, 100) + '...' : text;
        const url = new URL('https://api.mymemory.translated.net/get');
        url.searchParams.append('q', truncatedText);
        url.searchParams.append('langpair', `${sourceLang}|${targetLang}`);
        if (apiKey) {
            url.searchParams.append('de', apiKey);
        }

        const response = await fetch(url.toString());

        if (response.ok) {
            const data = await response.json();
            if (data && data.responseData && data.responseData.translatedText) {
                console.log('MyMemory GET (truncated) translation successful');
                return data.responseData.translatedText + (text.length > 100 ? ' [...]' : '');
            }
        }
    } catch (error) {
        console.log('MyMemory GET request also failed:', error);
    }

    // If all else fails, try LibreTranslate public instance
    try {
        console.log('Trying LibreTranslate as final fallback');
        const libreResponse = await fetch('https://libretranslate.com/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: sourceLang === 'my' ? 'auto' : sourceLang, // LibreTranslate might not support 'my'
                target: targetLang === 'my' ? 'en' : targetLang, // Fallback for unsupported languages
                format: 'text'
            })
        });

        if (libreResponse.ok) {
            const libreData = await libreResponse.json();
            if (libreData && libreData.translatedText) {
                console.log('LibreTranslate translation successful');
                return libreData.translatedText;
            }
        }
    } catch (error) {
        console.log('LibreTranslate also failed:', error);
    }

    // If everything fails, return a fallback message
    console.error('All translation services failed for chunk');
    return `[Translation unavailable for: "${text.substring(0, 50)}..."]`;
}

// Function to add delay between requests to avoid rate limiting
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

interface ResponseData {
    translatedText: string;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { text, source, target } = body;

        if (!text) {
            return NextResponse.json({ message: 'No text provided' }, { status: 400 });
        }

        // Check if API key exists
        const apiKey = process.env.MYMEMORY_EMAIL;

        const sourceLang = source || 'en';
        const targetLang = target || 'ja';

        console.log(`Translating from ${sourceLang} to ${targetLang}`);
        console.log(`Original text length: ${text.length} characters`);

        // Use much smaller chunk size to avoid URL length issues
        const MAX_CHUNK_SIZE = 200; // Much more conservative limit

        if (text.length <= MAX_CHUNK_SIZE) {
            // Text is short enough, translate directly
            console.log('Text is short enough, translating directly');
            const translatedText = await translateChunk(text, sourceLang, targetLang, apiKey);

            const responseData: ResponseData = { translatedText };
            return NextResponse.json(responseData);
        } else {
            // Text is too long, split into chunks
            console.log('Text is too long, splitting into chunks');
            const chunks = splitTextIntoChunks(text, MAX_CHUNK_SIZE);
            console.log(`Split text into ${chunks.length} chunks:`, chunks.map(c => c.length));

            const translatedChunks: string[] = [];

            // Translate each chunk with a delay to avoid rate limiting
            for (let i = 0; i < chunks.length; i++) {
                console.log(`Translating chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);

                try {
                    const translatedChunk = await translateChunk(chunks[i], sourceLang, targetLang, apiKey);
                    translatedChunks.push(translatedChunk);

                    // Add delay between requests to avoid rate limiting (except for last chunk)
                    if (i < chunks.length - 1) {
                        await delay(1000); // 1 second delay between requests
                    }
                } catch (error) {
                    console.error(`Error translating chunk ${i + 1}:`, error);
                    // Continue with other chunks, but note the error
                    translatedChunks.push(`[Translation error for chunk ${i + 1}]`);
                }
            }

            // Join all translated chunks
            const finalTranslation = translatedChunks.join(' ');
            console.log(`Final translation length: ${finalTranslation.length} characters`);

            const responseData: ResponseData = { translatedText: finalTranslation };
            return NextResponse.json(responseData);
        }

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}