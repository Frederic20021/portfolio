'use client'
import { useState, useRef } from "react";

const SpeechTranslation = () => {
    const [recording, setRecording] = useState(false);
    const [sourceLang, setSourceLang] = useState("en");
    const [targetLang, setTargetLang] = useState("ja");
    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
            const formData = new FormData();
            formData.append("audio", audioBlob, "recording.wav");
            formData.append("source_lang", sourceLang);
            formData.append("target_lang", targetLang);

            try {
                const response = await fetch("/api/translate", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json",
                    }
                });

                const result = await response.json();
                setSourceText(result.transcript);
                setTranslatedText(result.translated);
                setAudioUrl(result.audioUrl);
            } catch (error) {
                console.error("Translation failed:", error);
            }
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-bold">Speech-to-Speech Translator</h1>
            <div className="my-4">
                <button
                    onClick={startRecording}
                    disabled={recording}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Start Recording
                </button>
                <button
                    onClick={stopRecording}
                    disabled={!recording}
                    className="px-4 py-2 bg-red-500 text-white rounded ml-2 disabled:opacity-50"
                >
                    Stop Recording
                </button>
            </div>
            <div className="my-4">
                <label className="mr-2">Source Language:</label>
                <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                    <option value="en">English</option>
                    <option value="ja">Japanese</option>
                    <option value="my">Burmese</option>
                </select>
            </div>
            <div className="my-4">
                <label className="mr-2">Target Language:</label>
                <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                    <option value="en">English</option>
                    <option value="ja">Japanese</option>
                    <option value="my">Burmese</option>
                </select>
            </div>
            {sourceText && (
                <div className="my-4 p-2 bg-white border rounded">
                    <p><strong>Source Text:</strong> {sourceText}</p>
                    <p><strong>Translated Text:</strong> {translatedText}</p>
                    {audioUrl && <audio controls src={audioUrl}></audio>}
                </div>
            )}
        </div>
    );
};

export default SpeechTranslation;
