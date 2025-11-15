import Maps from "../components/company/maps";
import ContactButton from "../components/ui/contactButton";
import Info from "../components/company/info";
import CEOMessage from "../components/company/CEOMessage";

export default function page() {
    return <>
        <div className="h-24 bg-gray-600"></div>
        <CEOMessage />
        <Info />
        <Maps />
        <ContactButton />
    </>
}