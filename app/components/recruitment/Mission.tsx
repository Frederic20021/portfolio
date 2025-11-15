'use client';
import { useEffect, useRef, useState } from 'react';

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Only trigger once
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -100px 0px', // Start animation slightly before fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <>
    {/* Mission Section */}
      <section
        ref={sectionRef}
        style={{
          backgroundImage: `url('/recruitment/mission.jpg')`,
        }}
        className="relative py-12 px-6 text-white bg-cover text-center"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className={`relative z-10 px-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0s' : '0s' }}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            MISSION
          </h1>
          <h3 className="text-xl sm:text-2xl font-semibold mb-6">
            (ミッション)
          </h3>
        </div>
         <h2 className={`relative z-10 text-lg sm:text-xl lg:text-2xl font-bold mb-4 px-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '0.5s' : '0s' }}>
          人材不足の<span className="text-blue-500">解決</span>と国際競争力の<span className="text-blue-500">向上</span>
        </h2>
        <div className={`relative z-10 text-lg sm:text-xl lg:text-2xl font-bold mb-6 px-4 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '1.5s' : '0s' }}>
          これが私たちのミッションです。
        </div>
        <p className={`relative z-10 max-w-3xl font-semibold mx-auto indent-4 text-justify leading-relaxed px-4 text-sm sm:text-base break-words ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: isVisible ? '3.5s' : '0s' }}>
          日本が直面する深刻な労働力不足という社会課題に立ち向かい、優秀な外国人材と日本企業を結びつけることで、
          持続可能な経済成長に寄与します。同時に、グローバルな視野を持つ日本人材には海外での活躍機会を提供し、
          双方向の人材交流を通じて、より豊かで多様性に満ちた日本社会の実現を目指しています。
        </p>
      </section>
    </>
  )
}
