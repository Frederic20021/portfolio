import Pitch from "@/app/components/services/Pitch";
import TestimonialSeciton from "@/app/components/services/TestimonialSection";
import CourseListing from "../components/services/CourseListing";
import QandA from "../components/services/QandA";

export default function Home() {
  return (
    <div className="min-h-screen">
        <Pitch />
        <CourseListing />
        <TestimonialSeciton />
        <QandA />
    </div>
  );
}