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
        let fallbackModelId = null;

        // Map language codes to appropriate models
        switch (languageCode) {
            case 'my': // Burmese language code
                // Primary model for Burmese
                modelId = "Chonlasitk/whisper-burmese";
                // Fallback model if primary fails
                fallbackModelId = "chuuhtetnaing/whisper-tiny-myanmar";
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

        // Function to make request to a specific model
        const requestTranscription = async (model:string) => {
            console.log(`Attempting transcription with model: ${model}`);

            // Prepare the request to Hugging Face Inference API
            const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${hfApiKey}`,
                    'Content-Type': 'audio/wav',
                    'Accept': 'application/json'
                },
                body: audioData,

                signal: AbortSignal.timeout(10000)
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

                console.error(`Hugging Face ASR error with model ${model}:`, errorDetails);

                // If model is loading, provide specific error
                if (response.status === 503) {
                    const isLoading = typeof errorDetails === 'object' &&
                        errorDetails.error?.includes('loading');

                    return {
                        error: true,
                        loading: isLoading,
                        response: NextResponse.json({
                            message: isLoading ?
                                'Model is currently loading, please try again in a moment' :
                                'Service temporarily unavailable',
                            details: errorDetails,
                            model: model
                        }, { status: 503 })
                    };
                }

                return {
                    error: true,
                    response: NextResponse.json({
                        message: 'Failed to transcribe audio with Hugging Face',
                        details: errorDetails,
                        model: model
                    }, { status: response.status })
                };
            }

            const result = await response.json();
            console.log(`Hugging Face transcription with model ${model} completed successfully:`, result);

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
                    language: languageCode,
                    model: model
                }
            };
        };

        // Try with primary model first
        const primaryResult = await requestTranscription(modelId);

        // If primary model succeeded, return its result
        if (!primaryResult.error) {
            return primaryResult;
        }

        // If primary model failed with a 503 loading error, and we have a fallback model, try the fallback
        if (primaryResult.error && fallbackModelId && primaryResult.loading) {
            console.log(`Primary model ${modelId} is loading, trying fallback model ${fallbackModelId}`);
            return await requestTranscription(fallbackModelId);
        }

        // If no fallback or fallback also failed, return the primary error
        return primaryResult;

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

// Function to handle speech recognition with ElevenLabs API
async function handleElevenLabsASR(binaryData: Buffer, languageCode: string) {
    // Check if API key exists
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
        console.error('ElevenLabs API key is missing');
        return {
            error: true,
            response: NextResponse.json({
                message: 'Configuration error: API key missing',
                details: 'Please set ELEVENLABS_API_KEY in environment variables'
            }, { status: 500 })
        };
    }

    try {
        console.log(`Processing ${binaryData.length} bytes of audio data with ElevenLabs ASR`);
        console.log(`Using language code: ${languageCode}`);

        // ElevenLabs Speech-to-Text API endpoint
        const endpoint = 'https://api.elevenlabs.io/v1/speech-to-text';

        // Create request body with parameters
        // The API structure here assumes direct binary upload - adjust based on ElevenLabs documentation
        const response = await fetch(`${endpoint}?language=${languageCode}`, {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'audio/wav',  // Adjust based on your audio format
                'Accept': 'application/json'
            },
            body: binaryData,
        });

        // Log the response status for debugging
        console.log(`ElevenLabs API response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            let errorDetails;

            // Check if the response is JSON or plain text
            if (contentType && contentType.includes('application/json')) {
                errorDetails = await response.json();
            } else {
                errorDetails = await response.text();
            }

            console.error('ElevenLabs ASR error:', errorDetails);
            return {
                error: true,
                response: NextResponse.json({
                    message: 'Failed to transcribe audio with ElevenLabs',
                    details: errorDetails
                }, { status: response.status })
            };
        }

        const result = await response.json();
        console.log('ElevenLabs transcription completed successfully:', result);

        // Handle ElevenLabs response format
        // Adjust this based on the actual response format from ElevenLabs
        const transcribedText = result.text || "";

        return {
            error: false,
            data: {
                text: transcribedText,
                confidence: result.confidence || 0,
                language: languageCode,
                provider: 'elevenlabs'
            }
        };
    } catch (error) {
        console.error('Error processing audio with ElevenLabs:', error);
        return {
            error: true,
            response: NextResponse.json({
                message: 'Error processing audio with ElevenLabs',
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
        return {
            error: true,
            response: NextResponse.json({
                message: 'Configuration error: API key missing',
                details: 'Please set ASSEMBLYAI_API_KEY in environment variables'
            }, { status: 500 })
        };
    }

    console.log(`Audio data length: ${binaryData.length} bytes`);
    console.log(`API key present: ${apiKey ? 'Yes' : 'No'}`);

    try {
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
                return {
                    error: true,
                    response: NextResponse.json({
                        message: 'Failed to upload audio',
                        details: jsonError
                    }, { status: 500 })
                };
            } catch {
                // If not JSON, return the text
                return {
                    error: true,
                    response: NextResponse.json({
                        message: 'Failed to upload audio',
                        details: responseText || `HTTP ${uploadResponse.status}`
                    }, { status: 500 })
                };
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
            return {
                error: true,
                response: NextResponse.json({
                    message: 'Failed to initiate transcription',
                    details: errorText
                }, { status: 500 })
            };
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
                return {
                    error: true,
                    response: NextResponse.json({
                        message: 'Failed to retrieve transcription',
                        details: errorText
                    }, { status: 500 })
                };
            }

            transcriptResult = await pollingResponse.json();
            status = transcriptResult.status;
            console.log(`Polling attempt ${attempts + 1}, status: ${status}`);
            attempts++;
        }

        if (status === 'completed') {
            console.log('Transcription completed successfully');
            return {
                error: false,
                data: {
                    text: transcriptResult.text,
                    words: transcriptResult.words,
                    confidence: transcriptResult.confidence,
                    language: transcriptResult.language_code
                }
            };
        } else if (status === 'error') {
            console.error('Transcription failed:', transcriptResult.error);
            return {
                error: true,
                response: NextResponse.json({
                    message: 'Transcription failed',
                    details: transcriptResult.error
                }, { status: 500 })
            };
        } else {
            console.error('Transcription timed out or reached unknown state:', status);
            return {
                error: true,
                response: NextResponse.json({
                    message: 'Transcription timed out',
                    details: `Final status: ${status} after ${attempts} polling attempts`
                }, { status: 504 })
            };
        }
    } catch (error) {
        console.error('Error processing audio with AssemblyAI:', error);
        return {
            error: true,
            response: NextResponse.json({
                message: 'Error processing audio with AssemblyAI',
                details: error instanceof Error ? error.message : String(error)
            }, { status: 500 })
        };
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

        // Custom handling for Burmese with multiple provider options
        if (language_code === 'my') {
            const eleven_language_code = 'mya';
            // For Burmese, use ElevenLabs as the primary provider unless specifically overridden
            if (provider === 'elevenlabs' || provider === 'auto') {
                console.log('Using ElevenLabs as primary provider for Burmese');
                const elevenLabsResult = await handleElevenLabsASR(binaryData, eleven_language_code);

                // If ElevenLabs succeeds, return the result
                if (!elevenLabsResult.error) {
                    return NextResponse.json(elevenLabsResult.data);
                }

                // If ElevenLabs fails and we're not using auto fallback, return the error
                if (provider === 'elevenlabs') {
                    console.log('ElevenLabs transcription failed, no fallback requested');
                    return elevenLabsResult.response;
                }

                // Otherwise, fall back to Hugging Face models
                console.log('ElevenLabs transcription failed, falling back to Hugging Face models');
            }

            // Use specific Hugging Face models for Burmese (either as fallback or if specifically requested)
            if (provider === 'huggingface' || provider === 'auto' || provider === 'sil-burmese' || provider === 'assemblyai') {
                const customHandleHuggingFaceASR = async (audioData: Buffer, languageCode: string) => {
                    // Your existing Burmese Hugging Face implementation
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

                        // Ordered list of models to try for Burmese
                        const burmeseModels = [
                            "chuuhtetnaing/whisper-tiny-myanmar", // Primary choice
                            "openai/whisper-medium",              // Good multilingual fallback
                            "brickman/whisper-small-my",          // Smaller but specifically for Burmese
                        ];

                        // If user specifically requested the SIL model, try it first
                        if (provider === 'sil-burmese') {
                            burmeseModels.unshift("sil-ai/wav2vec2-bloom-speech-mya");
                        }

                        // Try models in sequence until one works
                        for (const modelId of burmeseModels) {
                            console.log(`Attempting transcription with model: ${modelId}`);

                            try {
                                // Prepare the request to Hugging Face Inference API
                                const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${hfApiKey}`,
                                        'Content-Type': 'audio/wav',
                                        'Accept': 'application/json'
                                    },
                                    body: audioData,
                                    // Add a timeout to avoid hanging indefinitely
                                    signal: AbortSignal.timeout(30000)
                                });

                                // Log the response status for debugging
                                console.log(`Hugging Face API response for ${modelId}: ${response.status} ${response.statusText}`);

                                const contentType = response.headers.get('content-type');

                                // Handle non-JSON responses (like HTML)
                                if (!contentType || !contentType.includes('application/json')) {
                                    if (response.status === 503) {
                                        console.log(`Model ${modelId} is unavailable (503), trying next model if available`);
                                        continue; // Try next model
                                    }

                                    const textSample = await response.text();
                                    console.error(`Non-JSON response from ${modelId}: ${textSample.substring(0, 100)}...`);
                                    continue; // Try next model
                                }

                                if (!response.ok) {
                                    const errorDetails = await response.json();
                                    console.error(`Error from ${modelId}:`, errorDetails);

                                    // If model is loading, try next model
                                    if (response.status === 503 && errorDetails.error?.includes('loading')) {
                                        console.log(`Model ${modelId} is loading, trying next model`);
                                        continue; // Try next model
                                    }

                                    continue; // Try next model for any error
                                }

                                const result = await response.json();
                                console.log(`Transcription with ${modelId} successful:`, result);

                                // Handle the different possible response formats
                                let transcribedText = "";
                                let confidence = 0;

                                if (Array.isArray(result)) {
                                    if (result.length > 0 && result[0].text) {
                                        transcribedText = result[0].text;
                                        confidence = result[0].score || 0;
                                    }
                                } else if (typeof result === 'object') {
                                    transcribedText = result.text || "";
                                    confidence = result.score || result.confidence || 0;
                                }

                                // If we got text, return success
                                if (transcribedText) {
                                    return {
                                        error: false,
                                        data: {
                                            text: transcribedText,
                                            confidence: confidence,
                                            language: languageCode,
                                            model: modelId,
                                            provider: 'huggingface'
                                        }
                                    };
                                }

                                // If no text, try next model
                                console.log(`Model ${modelId} returned empty text, trying next model`);

                            } catch (modelError) {
                                console.error(`Error with model ${modelId}:`, modelError);
                                // Continue to next model on error
                            }
                        }

                        // If we've tried all models and none worked
                        return {
                            error: true,
                            response: NextResponse.json({
                                message: 'Failed to transcribe with any available Burmese model',
                                details: 'All models returned errors or were unavailable'
                            }, { status: 503 })
                        };

                    } catch (error) {
                        console.error('Error in Burmese transcription:', error);
                        return {
                            error: true,
                            response: NextResponse.json({
                                message: 'Error processing Burmese audio',
                                details: error instanceof Error ? error.message : String(error)
                            }, { status: 500 })
                        };
                    }
                };

                // Try with our custom Burmese handler for Hugging Face
                const result = await customHandleHuggingFaceASR(binaryData, language_code);
                if (result.error) {
                    return result.response;
                }
                return NextResponse.json(result.data);
            }

            // If we reach here with an unsupported provider for Burmese
            return NextResponse.json({
                message: 'Invalid provider for Burmese language',
                details: `Provider '${provider}' is not supported for Burmese. Use 'elevenlabs', 'huggingface', 'auto', 'assemblyai', or 'sil-burmese'.`
            }, { status: 400 });
        }

        // For other languages, use AssemblyAI with fallback to Hugging Face
        if (provider === 'assemblyai' || provider === 'auto') {
            const result = await handleAssemblyAIASR(binaryData, language_code);
            if (!result.error) {
                return NextResponse.json(result.data);
            }

            // Fallback to Hugging Face if AssemblyAI fails and provider is 'auto'
            if (provider === 'auto') {
                console.log('AssemblyAI transcription failed, falling back to Hugging Face');
                const hfResult = await handleHuggingFaceASR(binaryData, language_code);
                if (!hfResult.error) {
                    return NextResponse.json(hfResult);
                }
                return hfResult.response;
            }

            return result.response;
        }
        // Use Hugging Face if specifically requested
        else if (provider === 'huggingface') {
            const result = await handleHuggingFaceASR(binaryData, language_code);
            if (result.error) {
                return result.response;
            }
            return NextResponse.json(result);
        }
        // Use ElevenLabs if specifically requested for non-Burmese (added for completeness)
        else if (provider === 'elevenlabs') {
            const result = await handleElevenLabsASR(binaryData, language_code);
            if (result.error) {
                return result.response;
            }
            return NextResponse.json(result.data);
        }

        // If provider is not supported
        return NextResponse.json({
            message: 'Invalid provider specified',
            details: `Provider '${provider}' is not supported. Use 'assemblyai', 'huggingface', 'elevenlabs', 'auto', or 'sil-burmese'.`
        }, { status: 400 });

    } catch (error) {
        console.error('Speech recognition API error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

