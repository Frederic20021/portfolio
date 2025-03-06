"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';

// Strict type definitions for speech recognition
interface ISpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onstart: ((event: Event) => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: ((event: Event) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

// Extend Window interface to include speech recognition
interface CustomWindow extends Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
    mozSpeechRecognition?: new () => ISpeechRecognition;
    msSpeechRecognition?: new () => ISpeechRecognition;
}

// Strict type definitions
type Language = 'en' | 'ja' | 'my';

interface TranslationResult {
    sourceText: string;
    translatedText: string;
}

export default function TranslationComponent() {
    // State management with explicit types
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [sourceLang, setSourceLang] = useState<Language>('en');
    const [targetLang, setTargetLang] = useState<Language>('ja');
    const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Refs with proper typing
    const recognitionRef = useRef<ISpeechRecognition | null>(null);

    // Typed language display helper
    const getLanguageName = useCallback((lang: Language): string => {
        const languageMap: Record<Language, string> = {
            en: 'English',
            ja: 'Japanese',
            my: 'Burmese'
        };
        return languageMap[lang];
    }, []);

    // Check browser support on component mount
    useEffect(() => {
        // Safely type-cast window
        const customWindow = window as unknown as CustomWindow;

        // Check for speech recognition support
        const SpeechRecognition =
            customWindow.SpeechRecognition ||
            customWindow.webkitSpeechRecognition ||
            customWindow.mozSpeechRecognition ||
            customWindow.msSpeechRecognition;

        if (!SpeechRecognition) {
            setErrorMessage('Speech recognition is not supported in this browser.');
        }
    }, []);

    // Start recording with proper error handling
    const startRecording = useCallback(() => {
        // Clear previous errors
        setErrorMessage(null);

        // Safely type-cast window
        const customWindow = window as unknown as CustomWindow;

        // Attempt to get speech recognition API
        const SpeechRecognition =
            customWindow.SpeechRecognition ||
            customWindow.webkitSpeechRecognition ||
            customWindow.mozSpeechRecognition ||
            customWindow.msSpeechRecognition;

        if (!SpeechRecognition) {
            setErrorMessage('Speech recognition is not supported in this browser.');
            return;
        }

        try {
            // Create recognition instance
            const recognition = new SpeechRecognition() as ISpeechRecognition;
            recognitionRef.current = recognition;

            // Configure recognition
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = sourceLang;

            // Event handlers
            recognition.onstart = () => {
                setIsRecording(true);
                setTranslationResult(null);
            };

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                if (event.results.length > 0) {
                    const transcript = event.results[0][0].transcript;
                    translateText(transcript);
                }
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error:', event.error);
                setErrorMessage(`Recording error: ${event.error}`);
                setIsRecording(false);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };

            // Start recognition
            recognition.start();
        } catch (error) {
            console.error('Error starting speech recognition:', error);
            setErrorMessage('Failed to start speech recognition');
            setIsRecording(false);
        }
    }, [sourceLang]);

    // Stop recording
    const stopRecording = useCallback(() => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
                setIsRecording(false);
            } catch (error) {
                console.error('Error stopping recording:', error);
                setErrorMessage('Failed to stop recording');
            }
        }
    }, []);

    // Translate text
    const translateText = async (text: string) => {
        try {
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    source_lang: sourceLang,
                    target_lang: targetLang
                })
            });

            if (!response.ok) {
                new Error('Translation failed');
            }

            const result = await response.json();

            setTranslationResult({
                sourceText: text,
                translatedText: result.translated_text
            });

            // Attempt text-to-speech
            speakTranslation(result.translated_text);
        } catch (error) {
            console.error('Translation error:', error);
            setErrorMessage('Translation failed. Please try again.');
        }
    };

    // Text-to-speech with proper typing
    const speakTranslation = useCallback((text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);

            // Set language based on target language
            utterance.lang = {
                'en': 'en-US',
                'ja': 'ja-JP',
                'my': 'my-MM'
            }[targetLang] || 'en-US';

            window.speechSynthesis.speak(utterance);
        }
    }, [targetLang]);

    // Rest of the component remains the same as in the previous version...
    // (Render method unchanged)
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Speech Translation</h1>

            {/* Error Message */}
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}

            {/* Language Selection */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Source Language Selection */}
                <div>
                    <label className="block mb-2 font-semibold">Source Language:</label>
                    <div className="flex gap-4">
                        {(['en', 'ja', 'my'] as Language[]).map((lang) => (
                            <label key={lang} className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="sourceLang"
                                    value={lang}
                                    checked={sourceLang === lang}
                                    onChange={() => setSourceLang(lang)}
                                    className="mr-2"
                                    disabled={isRecording}
                                />
                                {getLanguageName(lang)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Target Language Selection */}
                <div>
                    <label className="block mb-2 font-semibold">Target Language:</label>
                    <div className="flex gap-4">
                        {(['en', 'ja', 'my'] as Language[]).map((lang) => (
                            <label key={lang} className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="targetLang"
                                    value={lang}
                                    checked={targetLang === lang}
                                    onChange={() => setTargetLang(lang)}
                                    className="mr-2"
                                    disabled={isRecording}
                                />
                                {getLanguageName(lang)}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recording Buttons */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className={`w-full p-2 rounded ${
                        isRecording
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    {isRecording ? "Recording..." : "Start Recording"}
                </button>
                <button
                    onClick={stopRecording}
                    disabled={!isRecording}
                    className={`w-full p-2 rounded ${
                        !isRecording
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                >
                    Stop Recording
                </button>
            </div>

            {/* Translation Results */}
            {translationResult && (
                <div className="border p-4 rounded-lg bg-gray-50">
                    <p className="mb-2">
                        <strong>Source ({getLanguageName(sourceLang)}):</strong>
                        {translationResult.sourceText}
                    </p>
                    <p>
                        <strong>Translation ({getLanguageName(targetLang)}):</strong>
                        {translationResult.translatedText}
                    </p>
                </div>
            )}
        </div>
    );
}
