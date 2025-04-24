'use client'

import { useState, useRef, useEffect } from 'react';
// Use a pure JavaScript implementation instead of native modules
import * as rabbit from 'rabbit-node';

interface Language {
    code: string;
    name: string;
    voice?: string; // Voice identifier for specific TTS voices
}

// Simple JavaScript-based Zawgyi detector function
// This is a simplified version - for production you may want a more robust implementation
const detectZawgyi = (text: string): boolean => {
    // Common Zawgyi-specific characters and patterns
    const zawgyiRegex = /[\u105a\u1060-\u1097]|[\u1033\u1034]|[\u104e\u1039]|\u1031\u103b/g;
    // Count matches of Zawgyi-specific patterns
    const matches = (text.match(zawgyiRegex) || []).length;
    // Calculate a rough probability based on the number of matches and text length
    return matches > 0 && matches / text.length > 0.1;
};

// Proper conversion functions using rabbit-node library
const zawgyiToUnicode = (text: string): string => {
    try {
        return rabbit.zg2uni(text);
    } catch (error) {
        console.error("Error converting Zawgyi to Unicode:", error);
        return text; // Return original text on error
    }
};

const unicodeToZawgyi = (text: string): string => {
    try {
        return rabbit.uni2zg(text);
    } catch (error) {
        console.error("Error converting Unicode to Zawgyi:", error);
        return text; // Return original text on error
    }
};

// Function to detect if text is likely Zawgyi
const isZawgyi = (text: string): boolean => {
    // Use our simple detector instead of myanmar-tools
    return detectZawgyi(text);
};

const SpeechTranslator: React.FC = () => {
    const [recording, setRecording] = useState<boolean>(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [sourceText, setSourceText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

    const [sourceLang, setSourceLang] = useState<string>('en');
    const [targetLang, setTargetLang] = useState<string>('ja');

    // Add state for Burmese encoding
    const [burmeseEncoding, setBurmeseEncoding] = useState<'unicode' | 'zawgyi'>('unicode');
    const [displayedText, setDisplayedText] = useState<string>('');
    const [detectedEncoding, setDetectedEncoding] = useState<'unicode' | 'zawgyi' | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<BlobPart[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Enhanced language options with voice hints
    const languages: Language[] = [
        { code: 'en', name: '🇬🇧 English', voice: 'en-US' },
        { code: 'my', name: '🇲🇲 Burmese', voice: 'my' },
        { code: 'ja', name: '🇯🇵 Japanese', voice: 'ja-JP' },
        { code: 'zh', name: '🇨🇳 Chinese', voice: 'zh-CN' }
    ];

    // Update displayed text when translated text or encoding changes
    useEffect(() => {
        if (targetLang === 'my' && translatedText) {
            // Auto-detect if it's the first time we're processing this text
            if (!detectedEncoding && translatedText) {
                const detected = isZawgyi(translatedText) ? 'zawgyi' : 'unicode';
                setDetectedEncoding(detected);

                // If we detected Zawgyi but user wants Unicode (or vice versa), convert
                if (detected !== burmeseEncoding) {
                    updateDisplayedText(translatedText);
                } else {
                    setDisplayedText(translatedText);
                }
            } else {
                updateDisplayedText(translatedText);
            }
        } else {
            setDisplayedText(translatedText);
        }
    }, [translatedText, burmeseEncoding, targetLang, detectedEncoding]);

    // Function to update the displayed text based on the current encoding
    const updateDisplayedText = (text: string): void => {
        if (targetLang === 'my') {
            if (burmeseEncoding === 'zawgyi') {
                // If current text is Unicode, convert to Zawgyi
                const isCurrentTextZawgyi = isZawgyi(text);
                if (!isCurrentTextZawgyi) {
                    setDisplayedText(unicodeToZawgyi(text));
                } else {
                    setDisplayedText(text);
                }
            } else {
                // If current text is Zawgyi, convert to Unicode
                const isCurrentTextZawgyi = isZawgyi(text);
                if (isCurrentTextZawgyi) {
                    setDisplayedText(zawgyiToUnicode(text));
                } else {
                    setDisplayedText(text);
                }
            }
        } else {
            setDisplayedText(text);
        }
    };

    // Toggle the Burmese encoding
    const toggleBurmeseEncoding = (): void => {
        setBurmeseEncoding(prev => {
            const newEncoding = prev === 'unicode' ? 'zawgyi' : 'unicode';

            // Immediately update displayed text when toggling
            if (translatedText && targetLang === 'my') {
                if (newEncoding === 'zawgyi') {
                    setDisplayedText(unicodeToZawgyi(translatedText));
                } else {
                    setDisplayedText(zawgyiToUnicode(translatedText));
                }
            }

            return newEncoding;
        });
    };

    // Load available voices when the component mounts
    useEffect(() => {
        audioRef.current = new Audio();

        // Initialize voices
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            setAvailableVoices(voices);
            console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
        };

        // Handle both immediate and future loading of voices
        if (window.speechSynthesis) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            // Clean up the event listener
            if (window.speechSynthesis) {
                window.speechSynthesis.onvoiceschanged = null;
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

    // Define the translateText function
    const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
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

    // Enhanced speakText function with fallback options
    const speakText = (text: string, lang: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!('speechSynthesis' in window)) {
                reject('Speech synthesis not supported');
                return;
            }

            // For Burmese, ensure we use Unicode for TTS
            const textToSpeak = lang === 'my' && isZawgyi(text) ? zawgyiToUnicode(text) : text;

            // Create utterance
            const utterance = new SpeechSynthesisUtterance(textToSpeak);

            // Find the best voice for the target language
            const langCode = lang.split('-')[0]; // Get base language code
            const voices = availableVoices;

            // Try to find an exact match first
            let voice = voices.find(v => v.lang.toLowerCase() === lang.toLowerCase());

            // If no exact match, try to find a voice that starts with the language code
            if (!voice) {
                voice = voices.find(v => v.lang.toLowerCase().startsWith(langCode.toLowerCase()));
            }

            if (voice) {
                console.log(`Using voice: ${voice.name} (${voice.lang})`);
                utterance.voice = voice;
            } else {
                console.warn(`No voice found for language: ${lang}`);
                // Still set the language even if we don't have a specific voice
                utterance.lang = lang;
            }

            utterance.rate = 1.0; // Normal speed
            utterance.pitch = 1.0; // Normal pitch

            // Handle events
            utterance.onend = () => {
                resolve();
            };

            utterance.onerror = (event) => {
                console.error("Speech synthesis error:", event);
                reject(`Speech synthesis error: ${event.error}`);
            };

            // Speak the text
            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            window.speechSynthesis.speak(utterance);

            // Workaround for Chrome bug where speech sometimes doesn't play
            if (window.navigator.userAgent.includes('Chrome')) {
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                }
            }
        });
    };

    // This is the main translation handler
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
                    const result = reader.result?.toString() || '';
                    const base64data = result.split(',')[1];
                    if (base64data) {
                        resolve(base64data);
                    } else {
                        reject(new Error('Failed to convert audio to base64'));
                    }
                };
                reader.onerror = () => reject(reader.error);
            });

            // 1. Send the audio for speech recognition
            console.log("Sending audio to transcription API...");
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

            const responseData = await speechResponse.json();

            if (!speechResponse.ok) {
                throw new Error(`Speech recognition failed: ${responseData.message || 'Unknown error'}`);
            }

            const recognizedText = responseData.text;
            setSourceText(recognizedText);
            console.log("Transcription successful:", recognizedText);

            // 2. Translate the text
            console.log("Translating text...");
            const translatedResult = await translateText(recognizedText, sourceLang, targetLang);

            // Reset detected encoding when we get new translated text
            setDetectedEncoding(null);
            setTranslatedText(translatedResult);
            console.log("Translation successful:", translatedResult);

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-black">
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

                    {/* Show available voices for debugging */}
                    {targetLang && (
                        <div className="mt-1 text-xs text-gray-500">
                            {availableVoices.some(v => v.lang.startsWith(targetLang))
                                ? `✓ TTS voices available for '${targetLang}'`
                                : `⚠️ No TTS voices found for '${targetLang}'`}
                        </div>
                    )}
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
                        <p className="text-black">{sourceText}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded border">
                        <h3 className="font-semibold text-black mb-2">Translated Text:</h3>
                        <p className="text-black">{displayedText}</p>
                        <div className="mt-2 flex space-x-2">
                            {translatedText && (
                                <button
                                    onClick={() => speakText(translatedText, targetLang)}
                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                >
                                    Play Audio
                                </button>
                            )}

                            {/* Add Burmese encoding toggle button */}
                            {targetLang === 'my' && translatedText && (
                                <button
                                    onClick={toggleBurmeseEncoding}
                                    className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600"
                                >
                                    {burmeseEncoding === 'unicode' ? 'Convert to Zawgyi' : 'Convert to Unicode'}
                                </button>
                            )}
                        </div>
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