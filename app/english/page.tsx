import Pitch from "@/app/components/english/Pitch";
import TestimonialSeciton from "@/app/components/english/TestimonialSection";
import CourseListing from "../components/english/CourseListing";
import QandA from "../components/english/QandA";

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