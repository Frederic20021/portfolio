import HeroSection from "../components/sections/hero";
import ContactForm from "../components/ui/ContactForm";

export default function Page() {
    return <>
        <HeroSection heroText={{ title: 'お問い合わせ' }} />
        <ContactForm />
    </>
}   