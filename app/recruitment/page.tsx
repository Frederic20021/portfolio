import Hero from "@/app/components/recruitment/Hero";
import Foreign from "../components/recruitment/Foreign";
import MainService from "../components/recruitment/MainService";
import Mission from "../components/recruitment/Mission";
import CTA from "../components/recruitment/CTA";

export default function page() {
  return (
    <>
      <Hero />
      <MainService />
      <Mission />
      <Foreign />
      <CTA />
    </>
  );
}
