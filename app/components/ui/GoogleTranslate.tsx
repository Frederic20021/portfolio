"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

// Extend the Window interface for TypeScript compatibility
declare global {
    interface Window {
        google?: {
            translate: {
                TranslateElement: new (
                    options: Record<string, unknown>,
                    containerId: string
                ) => void;
            };
        };
        googleTranslateElementInit?: () => void;
    }
}

const GoogleTranslate = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("auto");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Initialize Google Translate
        window.googleTranslateElementInit = () => {
            if (window.google?.translate?.TranslateElement) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "auto",
                        includedLanguages: "ja,my",
                        autoDisplay: false,
                    },
                    "google_translate_element"
                );
                setLoaded(true);
            }
        };

        // Check if script is already loaded
        if (window.google?.translate?.TranslateElement) {
            window.googleTranslateElementInit();
        }
    }, []);

    // Function to change language manually
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = event.target.value;
        setSelectedLanguage(lang);

        // Simulate user clicking the Google Translate dropdown
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event("change"));
        }
    };

    return (
        <div className="relative">
            {/* ✅ Load Google Translate Script */}
            <Script
                src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                strategy="lazyOnload"
                onLoad={() => {
                    console.log("Google Translate script loaded");
                    if (window.googleTranslateElementInit) {
                        window.googleTranslateElementInit();
                    }
                }}
            />

            {/* ✅ Custom Dropdown */}
            <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="border px-4 py-2 rounded-md cursor-pointer bg-orange-400 shadow-md"
            >
                <option value="auto">🌐</option>
                <option value="ja">🇯🇵</option>
                <option value="my">🇲🇲</option>
            </select>

            {/* ✅ Hidden Google Translate Element (Required for Functionality) */}
            <div id="google_translate_element" className="hidden"></div>
        </div>
    );
};

export default GoogleTranslate;
