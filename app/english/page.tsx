import Pitch from "@/app/components/english/Pitch";
import TestimonialSeciton from "@/app/components/english/TestimonialSection";
import CourseListing from "../components/english/CourseListing";
import QandA from "../components/english/QandA";
import ProfIntro from "../components/english/ProfIntro";

export default function Home() {
  return (
    <div className="min-h-screen">
        <Pitch />
        <ProfIntro />
        <CourseListing />
        <TestimonialSeciton />
        <QandA />
    </div>
  );
}