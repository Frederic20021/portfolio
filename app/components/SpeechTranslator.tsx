'use client'

import { useState, useRef, useEffect } from 'react';

interface Language {
    code: string;
    name: string;
}

const SpeechTranslator: React.FC = () => {
    const [recording, setRecording] = useState<boolean>(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [sourceText, setSourceText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [sourceLang, setSourceLang] = useState<string>('en');
    const [targetLang, setTargetLang] = useState<string>('ja');

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<BlobPart[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Limited language options: Burmese, English, and Japanese
    const languages: Language[] = [
        { code: 'en', name: 'English' },
        { code: 'my', name: 'Burmese' },
        { code: 'ja', name: 'Japanese' }
    ];

    useEffect(() => {
        audioRef.current = new Audio();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    // Start recording audio
    const startRecording = async (): Promise<void> => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioBlob(audioBlob);

                // Stop all tracks from the stream to release the microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setRecording(true);
            setError('');
        } catch (err) {
            setError(`Error accessing microphone: ${err instanceof Error ? err.message : String(err)}`);
            console.error('Error accessing microphone:', err);
        }
    };

    // Stop recording audio
    const stopRecording = (): void => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

// Define the proper type for the speech recognition event
    const recognizeSpeechWithWebAPI = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                reject('Speech recognition is not supported in this browser');
                return;
            }

            // @ts-ignore - TypeScript doesn't know about the browser's SpeechRecognition API
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = sourceLang;
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            // Properly type the event parameter
            recognition.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[0][0].transcript;
                resolve(transcript);
            };

            // Properly type the error event parameter
            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                reject(`Speech recognition error: ${event.error}`);
            };

            recognition.start();
        });
    };

// Define the translateText function if it doesn't exist
    const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
        // Implement your translation logic here, for example:
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                source: sourceLang,
                target: targetLang,
            }),
        });

        const data = await response.json();
        return data.translatedText;
    };

// Define the speakText function
    const speakText = (text: string, lang: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!('speechSynthesis' in window)) {
                reject('Speech synthesis not supported');
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;

            utterance.onend = () => {
                resolve();
            };

            utterance.onerror = (event) => {
                reject(`Speech synthesis error: ${event.error}`);
            };

            window.speechSynthesis.speak(utterance);
        });
    };

// This is just the handleTranslate function with improved debugging
    const handleTranslate = async (): Promise<void> => {
        setIsLoading(true);
        setError('');
        try {
            if (!audioBlob) {
                throw new Error('No recorded audio to translate');
            }

            console.log(`Audio blob size: ${audioBlob.size} bytes, type: ${audioBlob.type}`);

            // Convert blob to base64
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);

            const audio_base64 = await new Promise<string>((resolve, reject) => {
                reader.onloadend = () => {
                    // Remove the data URL prefix (e.g., "data:audio/wav;base64,")
                    const result = reader.result?.toString() || '';
                    console.log(`FileReader result prefix: ${result.substring(0, 50)}...`);

                    const base64data = result.split(',')[1];
                    if (base64data) {
                        console.log(`Converted to base64: ${base64data.substring(0, 50)}... (${base64data.length} chars)`);
                        resolve(base64data);
                    } else {
                        reject(new Error('Failed to convert audio to base64'));
                    }
                };
                reader.onerror = () => reject(reader.error);
            });

            console.log("Sending audio to transcription API...");

            // 1. Send the audio for speech recognition
            const speechResponse = await fetch('/api/transcribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    audio_data: audio_base64,
                    language_code: sourceLang
                }),
            });

            console.log(`API response status: ${speechResponse.status} ${speechResponse.statusText}`);

            const responseData = await speechResponse.json();
            console.log('API response data:', responseData);

            if (!speechResponse.ok) {
                throw new Error(`Speech recognition failed: ${responseData.message || 'Unknown error'}`);
            }

            const recognizedText = responseData.text;
            setSourceText(recognizedText);

            console.log("Transcription successful:", recognizedText);

            // 2. Text translation using LibreTranslate through our proxy API
            console.log("Translating text...");
            const translatedResult = await translateText(recognizedText, sourceLang, targetLang);
            setTranslatedText(translatedResult);

            console.log("Translation successful:", translatedResult);

            // 3. Generate speech from translated text using Web Speech API
            await speakText(translatedResult, targetLang);
        } catch (err) {
            const errorMessage = `Error processing audio: ${err instanceof Error ? err.message : String(err)}`;
            console.error(errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Audio Translator</h2>

            {/* Language Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-gray-700 mb-2">Source Language</label>
                    <select
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    >
                        {languages.map((lang) => (
                            <option key={`source-${lang.code}`} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Target Language</label>
                    <select
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                        className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    >
                        {languages.map((lang) => (
                            <option key={`target-${lang.code}`} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Recording Controls */}
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={recording ? stopRecording : startRecording}
                    className={`px-4 py-2 rounded font-medium ${
                        recording
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={isLoading}
                >
                    {recording ? 'Stop Recording' : 'Start Recording'}
                </button>

                <button
                    onClick={handleTranslate}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
                    disabled={!audioBlob || isLoading}
                >
                    {isLoading ? 'Translating...' : 'Translate'}
                </button>
            </div>

            {/* Results Display */}
            {(sourceText || translatedText) && (
                <div className="mt-6 space-y-4">
                    <div className="p-4 bg-gray-50 rounded border">
                        <h3 className="font-semibold text-black mb-2">Original Text:</h3>
                        <p className={"text-black"}>{sourceText}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded border">
                        <h3 className="font-semibold text-black mb-2">Translated Text:</h3>
                        <p className={"text-black"}>{translatedText}</p>
                    </div>
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

        </div>
    );
};

export default SpeechTranslator;
