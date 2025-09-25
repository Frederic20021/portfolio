import Pitch from "@/app/components/services/Pitch";
import TestimonialSeciton from "@/app/components/services/TestimonialSection";

export default function Home() {
  return (
    <div className="min-h-screen">
        <Pitch />
        <TestimonialSeciton />
    </div>
  );
}