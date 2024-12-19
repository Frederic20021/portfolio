import Hero from "@/app/sections/Hero";
import Blog from "@/app/sections/Blog";

export default function Home() {
  return (
      <section className={"bg-gradient-to-b from-purple-950 via-gray-800 to-blue-950"}>
          <Hero />
          <Blog />
      </section>
  );
}
