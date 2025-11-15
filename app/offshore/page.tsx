import Contact from "@/app/components/offshore/Contact";
import Pitch from "@/app/components/offshore/Pitch";
import PricePlan from "../components/offshore/PricePlan";

export default function page() {
    return <>
        <div className="h-24 bg-gray-600"></div>
        <Pitch />
        <PricePlan />
        <Contact />
    </>;
}