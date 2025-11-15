'use client';
import Link from 'next/link';
import { usePathname }from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { navLinks } from '@/app/constants/header';


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change background when scrolled more than 50px
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    // Don't close if clicking on the button or inside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(target) && 
        buttonRef.current && !buttonRef.current.contains(target)) {
      setDropDownOpen(false)
    }
  }
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  const pathname = usePathname();
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300 ${
        pathname.startsWith("/english") && isScrolled?
        "bg-gray-700/30 backdrop-blur-2xl"
        : isScrolled ?
         'bg-[#40637D]/30 backdrop-blur-lg shadow-lg' 
         : null
      }`}
    >
      <div className="container mx-auto px-8 py-6 sm:p-8">
        <div className="flex items-center justify-between md:px-16 h-full">
          <Link className="smallScreenCompanyName white text-sm md:text-xl cursor-pointer font-bold hover:font-extrabold scaler break-words max-w-[60%] sm:max-w-none" href='/'>
            {`エンパワー&リンク\n株式会社`}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {/*uses Object.entries to convert navLinks to mappable arrays*/} 
            {Object.entries(navLinks).map(([key, { label, href }]) => (
              <Link key={key} href={href} className={`${pathname === href ? "font-bold border-b-1" : "naviLinkUnderline" } `}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            className="md:hidden hover:cursor-pointer flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={() => setDropDownOpen(!dropDownOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${dropDownOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${dropDownOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${dropDownOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div 
          ref={dropdownRef}
          className={`md:hidden transition-all duration-300 ease-in-out ${
            dropDownOpen 
              ? 'max-h-64 opacity-80 bg-black visible' 
              : 'max-h-0 opacity-0 invisible'
          } overflow-hidden`}
        >
          <nav className="py-4 border-t border-white/20">
            {Object.entries(navLinks).map(([key, { label, href }]) => (
              <Link 
                key={key} 
                href={href} 
                className="block py-3 px-4 hover:bg-white/10 hover:text-blue-200 transition-colors"
                onClick={() => setDropDownOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}