// app/interpretation/translator/page.tsx
import SpeechTranslator from '../components/SpeechTranslator';

export default function TranslatorPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold text-center mb-10">Audio Translation</h1>
            <SpeechTranslator />
        </div>
    );
}
