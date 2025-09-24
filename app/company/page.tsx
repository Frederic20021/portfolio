import HeroSection from "../components/sections/hero";
import { companyInfo } from "../constants/heroText";
import Maps from "../components/company/maps";
import ContactButton from "../components/ui/contactButton";
import Info from "../components/company/info";
import CEOMessage from "../components/company/CEOMessage";

export default function page() {
    return <>
        <HeroSection heroText={{ title: companyInfo.title }} />
        <CEOMessage />
        <Info />
        <Maps />
        <ContactButton />
    </>
}