import { NextRequest, NextResponse } from 'next/server';

// Define types for input and output
interface TranslationRequest {
    text: string;
    source_lang: string;
    target_lang: string;
}

export async function POST(request: NextRequest) {
    try {
        const { text, source_lang, target_lang } = await request.json() as TranslationRequest;

        // Validate input
        if (!text || !source_lang || !target_lang) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        // Mock translation (replace with actual translation service)
        const translated_text = mockTranslate(text, source_lang, target_lang);

        return NextResponse.json({
            source_text: text,
            translated_text
        });

    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json(
            { error: 'Translation failed' },
            { status: 500 }
        );
    }
}

// Mock translation function
function mockTranslate(text: string, sourceLang: string, targetLang: string): string {
    // In a real-world scenario, replace with actual translation API
    const translations: Record<string, Record<string, (text: string) => string>> = {
        en: {
            ja: (text) => `Japanese translation of: ${text}`,
            my: (text) => `Burmese translation of: ${text}`
        },
        ja: {
            en: (text) => `English translation of: ${text}`,
            my: (text) => `Burmese translation of: ${text}`
        },
        my: {
            en: (text) => `English translation of: ${text}`,
            ja: (text) => `Japanese translation of: ${text}`
        }
    };

    return translations[sourceLang]?.[targetLang]?.(text) || 'Translation not available';
}

export const config = {
    api: {
        bodyParser: true,
    },
};
