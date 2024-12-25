import Hero from "@/app/sections/Hero";
import Blog from "@/app/sections/Blog";

export default function Home() {
  return (
      <section className={"bg-gradient-to-b from-emerald-950 via-[#0d0f1c] to-[#062415]"}>
          <Hero />
          <Blog />
      </section>
  );
}
