import { NextRequest, NextResponse } from 'next/server';

// Type definitions for AssemblyAI
interface TranscriptionOptions {
    audio_url: string;
    language_code?: string;
    // Add other options as needed
}

// Function to handle speech recognition with Hugging Face Inference API
async function handleHuggingFaceASR(audioData: Buffer, languageCode: string) {
    // Check if API key exists
    const hfApiKey = process.env.HUGGINGFACE_API_KEY;
    if (!hfApiKey) {
        console.error('Hugging Face API key is missing');
        return {
            error: true,
            response: NextResponse.json({
                message: 'Configuration error: API key missing',
                details: 'Please set HUGGINGFACE_API_KEY in environment variables'
            }, { status: 500 })
        };
    }

    try {
        console.log(`Processing ${audioData.length} bytes of audio data with Hugging Face ASR`);
        console.log(`Using language code: ${languageCode}`);

        // Choose the appropriate model based on language code
        let modelId;

        // Map language codes to appropriate models
        switch (languageCode) {
            case 'my': // Burmese language code
                // Try a more reliable multilingual model that supports Burmese
                modelId = "YeBhoneLin10/openai-whisper-burmese";
                break;
            case 'en':
                modelId = "facebook/wav2vec2-large-960h-lv60-self";
                break;
            // Add other languages as needed
            default:
                // Default to multilingual model for other languages
                modelId = "facebook/wav2vec2-large-xlsr-53";
        }

        console.log(`Selected model: ${modelId}`);

        // Prepare the request to Hugging Face Inference API
        const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${hfApiKey}`,
                'Content-Type': 'audio/wav', // Adjust content type based on your audio format
                'Accept': 'application/json' // Explicitly request JSON response
            },
            body: audioData,
        });

        // Log the response status for debugging
        console.log(`Hugging Face API response status: ${response.status} ${response.statusText}`);

        const contentType = response.headers.get('content-type');
        console.log(`Response content type: ${contentType}`);

        if (!response.ok) {
            let errorDetails;

            // Check if the response is JSON or HTML/text
            if (contentType && contentType.includes('application/json')) {
                errorDetails = await response.json();
            } else {
                // If it's HTML or text, get a sample of it
                const textSample = await response.text();
                errorDetails = `Non-JSON response (${contentType}): ${textSample.substring(0, 100)}...`;
            }

            console.error(`Hugging Face ASR error:`, errorDetails);

            // If model is loading, provide specific error
            if (response.status === 503 && typeof errorDetails === 'object' && errorDetails.error?.includes('loading')) {
                return {
                    error: true,
                    response: NextResponse.json({
                        message: 'Model is currently loading, please try again in a moment',
                        details: errorDetails
                    }, { status: 503 })
                };
            }

            return {
                error: true,
                response: NextResponse.json({
                    message: 'Failed to transcribe audio with Hugging Face',
                    details: errorDetails
                }, { status: response.status })
            };
        }

        const result = await response.json();
        console.log('Hugging Face transcription completed successfully:', result);

        // Handle the different possible response formats from Hugging Face
        let transcribedText = "";
        let confidence = 0;

        if (Array.isArray(result)) {
            // Some models return an array of results
            if (result.length > 0 && result[0].text) {
                transcribedText = result[0].text;
                confidence = result[0].score || 0;
            }
        } else if (typeof result === 'object') {
            // Others return a single object
            transcribedText = result.text || "";
            confidence = result.score || result.confidence || 0;
        }

        return {
            error: false,
            data: {
                text: transcribedText,
                confidence: confidence,
                language: languageCode
            }
        };
    } catch (error) {
        console.error('Error processing audio with Hugging Face:', error);
        return {
            error: true,
            response: NextResponse.json({
                message: 'Error processing audio with Hugging Face',
                details: error instanceof Error ? error.message : String(error)
            }, { status: 500 })
        };
    }
}

// Handler for AssemblyAI transcription
async function handleAssemblyAIASR(binaryData: Buffer, languageCode: string) {
    // Check if API key exists
    const apiKey = process.env.ASSEMBLYAI_API_KEY;
    if (!apiKey) {
        console.error('AssemblyAI API key is missing');
        return NextResponse.json({
            message: 'Configuration error: API key missing',
            details: 'Please set ASSEMBLYAI_API_KEY in environment variables'
        }, { status: 500 });
    }

    console.log(`Audio data length: ${binaryData.length} bytes`);
    console.log(`API key present: ${apiKey ? 'Yes' : 'No'}`);

    // First, upload the audio file to AssemblyAI
    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/octet-stream'
        },
        body: binaryData
    });

    // Log response status
    console.log(`AssemblyAI upload response status: ${uploadResponse.status} ${uploadResponse.statusText}`);

    if (!uploadResponse.ok) {
        // Try to get response as text first
        const responseText = await uploadResponse.text();
        console.error(`AssemblyAI upload error: ${responseText}`);

        // Try to parse as JSON if possible
        try {
            const jsonError = JSON.parse(responseText);
            console.error('AssemblyAI error details:', jsonError);
            return NextResponse.json({
                message: 'Failed to upload audio',
                details: jsonError
            }, { status: 500 });
        } catch {
            // If not JSON, return the text
            return NextResponse.json({
                message: 'Failed to upload audio',
                details: responseText || `HTTP ${uploadResponse.status}`
            }, { status: 500 });
        }
    }

    const uploadData = await uploadResponse.json();
    console.log('AssemblyAI upload successful, URL:', uploadData.upload_url);

    const audioUrl = uploadData.upload_url;

    // Now create a transcription job
    const transcriptionOptions: TranscriptionOptions = {
        audio_url: audioUrl,
        language_code: languageCode || 'en',  // Default to English if not specified
    };

    console.log('Creating transcription job with options:', transcriptionOptions);

    const transcriptionResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transcriptionOptions)
    });

    if (!transcriptionResponse.ok) {
        const errorText = await transcriptionResponse.text();
        console.error('Transcription request failed:', errorText);
        return NextResponse.json({
            message: 'Failed to initiate transcription',
            details: errorText
        }, { status: 500 });
    }

    const transcriptionData = await transcriptionResponse.json();
    const transcriptId = transcriptionData.id;
    console.log('Transcription job created with ID:', transcriptId);

    // Poll for the transcription status
    let transcriptResult;
    let status = 'processing';
    let attempts = 0;
    const maxAttempts = 60; // Maximum polling attempts
    const pollingInterval = 2000; // 2 seconds between polls

    while ((status === 'processing' || status === 'queued') && attempts < maxAttempts) {
        // Wait before polling
        await new Promise(resolve => setTimeout(resolve, pollingInterval));

        const pollingResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
            headers: { 'Authorization': apiKey }
        });

        if (!pollingResponse.ok) {
            const errorText = await pollingResponse.text();
            console.error('Polling failed:', errorText);
            return NextResponse.json({
                message: 'Failed to retrieve transcription',
                details: errorText
            }, { status: 500 });
        }

        transcriptResult = await pollingResponse.json();
        status = transcriptResult.status;
        console.log(`Polling attempt ${attempts + 1}, status: ${status}`);
        attempts++;
    }

    if (status === 'completed') {
        console.log('Transcription completed successfully');
        return NextResponse.json({
            text: transcriptResult.text,
            words: transcriptResult.words,
            confidence: transcriptResult.confidence,
            language: transcriptResult.language_code
        });
    } else if (status === 'error') {
        console.error('Transcription failed:', transcriptResult.error);
        return NextResponse.json({
            message: 'Transcription failed',
            details: transcriptResult.error
        }, { status: 500 });
    } else {
        console.error('Transcription timed out or reached unknown state:', status);
        return NextResponse.json({
            message: 'Transcription timed out',
            details: `Final status: ${status} after ${attempts} polling attempts`
        }, { status: 504 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {audio_data, language_code = 'en', provider = 'assemblyai'} = body;

        if (!audio_data) {
            return NextResponse.json({message: 'No audio data provided'}, {status: 400});
        }

        // Convert Base64 to binary
        const binaryData = Buffer.from(audio_data, 'base64');
        console.log(`Converted to binary data: ${binaryData.length} bytes`);

        // Handle Burmese language with appropriate provider
        if (language_code === 'my' || provider === 'auto') {
            const result = await handleHuggingFaceASR(binaryData, language_code);
            if (result.error) {
                return result.response;
            }
            return NextResponse.json(result.data);
        }
        else {// Use AssemblyAI as default for non-Burmese languages
            return await handleAssemblyAIASR(binaryData, language_code);
        }

    } catch (error) {
        console.error('Speech recognition API error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}