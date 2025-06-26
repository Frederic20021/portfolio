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
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [sourceText, setSourceText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [audioSource, setAudioSource] = useState<'recording' | 'upload'>('recording');

    const [sourceLang, setSourceLang] = useState<string>('en');
    const [targetLang, setTargetLang] = useState<string>('ja');

    // Add state for Burmese encoding
    const [burmeseEncoding, setBurmeseEncoding] = useState<'unicode' | 'zawgyi'>('unicode');
    const [displayedText, setDisplayedText] = useState<string>('');
    const [detectedEncoding, setDetectedEncoding] = useState<'unicode' | 'zawgyi' | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<BlobPart[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    // Handle file upload
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            // Check if it's an audio file
            if (!file.type.startsWith('audio/')) {
                setError('Please select an audio file');
                return;
            }

            // Check file size (limit to 10MB for example)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
                setError('File size is too large. Please select a file smaller than 10MB');
                return;
            }

            setUploadedFile(file);
            setAudioBlob(file); // Treat uploaded file as audio blob
            setAudioSource('upload');
            setError('');
            console.log(`File uploaded: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
        }
    };

    // Clear uploaded file
    const clearUploadedFile = (): void => {
        setUploadedFile(null);
        setAudioBlob(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

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
                setAudioSource('recording');

                // Stop all tracks from the stream to release the microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setRecording(true);
            setError('');

            // Clear any uploaded file when starting to record
            if (uploadedFile) {
                clearUploadedFile();
            }
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

    // Convert blob/file to base64
    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
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
            reader.readAsDataURL(blob);
        });
    };

    // This is the main translation handler
    const handleTranslate = async (): Promise<void> => {
        setIsLoading(true);
        setError('');
        try {
            const currentAudio = audioBlob || uploadedFile;
            if (!currentAudio) {
                throw new Error('No audio to translate. Please record audio or upload an audio file.');
            }

            console.log(`Audio size: ${currentAudio.size} bytes, type: ${currentAudio.type || 'unknown'}`);
            console.log(`Audio source: ${audioSource}`);

            // Convert blob/file to base64
            const audio_base64 = await blobToBase64(currentAudio);

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
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
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

            {/* Audio Input Options */}
            <div className="mb-6">
                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        onClick={() => setAudioSource('recording')}
                        className={`px-4 py-2 rounded font-medium ${
                            audioSource === 'recording'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Record Audio
                    </button>
                    <button
                        onClick={() => setAudioSource('upload')}
                        className={`px-4 py-2 rounded font-medium ${
                            audioSource === 'upload'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Upload File
                    </button>
                </div>

                {/* Recording Controls */}
                {audioSource === 'recording' && (
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={recording ? stopRecording : startRecording}
                            className={`px-4 py-2 rounded font-medium ${
                                recording
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                            disabled={isLoading}
                        >
                            {recording ? '🛑 Stop Recording' : '🎤 Start Recording'}
                        </button>
                        {audioBlob && audioSource === 'recording' && (
                            <span className="px-3 py-2 bg-green-100 text-green-800 rounded text-sm">
                                ✓ Audio Recorded
                            </span>
                        )}
                    </div>
                )}

                {/* File Upload */}
                {audioSource === 'upload' && (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-full max-w-md">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="audio/*"
                                onChange={handleFileUpload}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <div className="mt-1 text-xs text-gray-500">
                                Supported formats: MP3, WAV, M4A, OGG, etc. (Max 10MB)
                            </div>
                        </div>
                        {uploadedFile && (
                            <div className="flex items-center space-x-2">
                                <span className="px-3 py-2 bg-green-100 text-green-800 rounded text-sm">
                                    ✓ {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                                <button
                                    onClick={clearUploadedFile}
                                    className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Translate Button */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={handleTranslate}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-lg"
                    disabled={(!audioBlob && !uploadedFile) || isLoading}
                >
                    {isLoading ? '🔄 Processing...' : '🌐 Transcribe & Translate'}
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
                        <div className="mt-2 flex flex-wrap gap-2">
                            {translatedText && (
                                <button
                                    onClick={() => speakText(translatedText, targetLang)}
                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                >
                                    🔊 Play Audio
                                </button>
                            )}

                            {/* Add Burmese encoding toggle button */}
                            {targetLang === 'my' && translatedText && (
                                <button
                                    onClick={toggleBurmeseEncoding}
                                    className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600"
                                >
                                    {burmeseEncoding === 'unicode' ? '📝 Convert to Zawgyi' : '📝 Convert to Unicode'}
                                </button>
                            )}

                            {/* Copy to clipboard button */}
                            {displayedText && (
                                <button
                                    onClick={() => navigator.clipboard.writeText(displayedText)}
                                    className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                                >
                                    📋 Copy Text
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
};

export default SpeechTranslator;