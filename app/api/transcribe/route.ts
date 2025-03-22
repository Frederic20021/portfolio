import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { audio_data, language_code } = body;

        if (!audio_data) {
            return NextResponse.json({ message: 'No audio data provided' }, { status: 400 });
        }

        // Check if API key exists
        const apiKey = process.env.ASSEMBLYAI_API_KEY;
        if (!apiKey) {
            console.error('AssemblyAI API key is missing');
            return NextResponse.json({
                message: 'Configuration error: API key missing',
                details: 'Please set ASSEMBLYAI_API_KEY in environment variables'
            }, { status: 500 });
        }

        console.log(`Audio data length: ${audio_data.length} characters`);

        try {
            // Convert Base64 to binary
            const binaryData = Buffer.from(audio_data, 'base64');
            console.log(`Converted to binary data: ${binaryData.length} bytes`);

            // Log API request details (without the actual API key)
            console.log(`Uploading to AssemblyAI with Content-Type: application/octet-stream`);
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
                language_code: language_code || 'en',  // Default to English if not specified
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

            while (status === 'processing' || status === 'queued' && attempts < maxAttempts) {
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

        } catch (conversionError) {
            console.error('Error processing audio data:', conversionError);
            return NextResponse.json({
                message: 'Error processing audio data',
                details: conversionError instanceof Error ? conversionError.message : String(conversionError)
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Speech recognition API error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
