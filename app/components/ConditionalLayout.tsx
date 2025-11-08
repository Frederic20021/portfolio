'use client';
import { usePathname } from 'next/navigation';
import Header from "./layout/header";
import Footer from "./layout/footer";

export default function ConditionalLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname();

  // Hide header and footer for recruitment and contact pages
  const hideHeaderFooter = pathname.startsWith('/recruitment') || pathname.startsWith('/contact') || pathname.startsWith('/english') || pathname.startsWith('/offshore');

  if (hideHeaderFooter) {
    // Return only children without header/footer with iframe-optimized wrapper
    return (
      <div className="w-full min-h-screen overflow-x-hidden">
        {children}
      </div>
    );
  }
  
  // Return normal layout with header/footer for other pages
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}