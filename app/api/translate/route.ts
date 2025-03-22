import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { text, source, target, tts } = body;

        if (!text) {
            return NextResponse.json({ message: 'No text provided' }, { status: 400 });
        }

        // Check if API key exists
        const apiKey = process.env.MYMEMORY_EMAIL;

        // MyMemory Translation API (free usage even without email, but better with email)
        const sourceLang = source || 'en';
        const targetLang = target || 'ja';

        console.log(`Translating from ${sourceLang} to ${targetLang}`);

        // Construct URL with query parameters
        const url = new URL('https://api.mymemory.translated.net/get');
        url.searchParams.append('q', text);
        url.searchParams.append('langpair', `${sourceLang}|${targetLang}`);
        if (apiKey) {
            url.searchParams.append('de', apiKey); // Use email as identifier for more quota
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Translation error:', errorText);
            return NextResponse.json({
                message: 'Translation failed',
                details: errorText
            }, { status: 500 });
        }

        const data = await response.json();
        console.log('Translation response received:', data);

        // MyMemory specific response format
        if (data && data.responseData && data.responseData.translatedText) {
            const translatedText = data.responseData.translatedText;

            // Create response object
            const responseData: any = { translatedText };

            // Handle TTS if requested
            if (tts) {
                // TTS implementation would go here (same as previous)
                // ...
            }

            return NextResponse.json(responseData);
        } else {
            console.error('Unexpected response format:', data);
            return NextResponse.json({
                message: 'Unexpected response format',
                data: data
            }, { status: 500 });
        }
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
