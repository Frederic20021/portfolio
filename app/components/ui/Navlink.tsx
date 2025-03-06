"use client"
import React, { useState, useEffect, useRef } from 'react';
import { navItems } from "@/app/constants/NavItems";

const Navlink = () => {
    const [openDropdown, setopenDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null); // Reference to the entire nav

    const toggleDropdown = (id: string) => {
        setopenDropdown(openDropdown === id ? null : id);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
            setopenDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav ref={navRef} className="relative mx-6">
            <div className="flex gap-6">
                {navItems.map((item) => (
                    <div key={item.id} className="relative group">
                        {item.dropdownItems ? (
                            <div>
                                <button
                                    onClick={() => toggleDropdown(item.id)}
                                    className="text-white hover:text-gray-200 py-2 flex items-center gap-1"
                                >
                                    {item.title}
                                    <svg
                                        className={`w-4 h-4 transition-transform ${
                                            openDropdown === item.id ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {openDropdown === item.id && (
                                    <div
                                        className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg z-10 grid grid-cols-3 gap-4 py-2 px-4"
                                        style={{ minWidth: "300px" }}
                                    >
                                        {item.dropdownItems.map((dropdownItem) => (
                                            <a
                                                key={dropdownItem}
                                                href={item.id == "Blog" ? `/blog?tag=${dropdownItem.toLowerCase()}` : item.id == 'Services' ? `/${dropdownItem.toLowerCase()}` : `/soon`}
                                                className="block text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded px-2 py-1"
                                            >
                                                {dropdownItem}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a
                                href={`/about`}
                                className="text-white hover:text-gray-200 py-2 block"
                            >
                                {item.title}
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navlink;
