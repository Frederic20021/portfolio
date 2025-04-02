"use client"
import React, {useEffect, useRef} from 'react'
import { FaBars } from "react-icons/fa"
import {navItems} from "@/app/constants/NavItems"

const MenuBar = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const navRef = useRef<HTMLDivElement>(null); // Reference to the entire nav

    const toggle = () => setIsOpen(!isOpen)

    const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <>
            <button onClick={toggle} className={"text-2xl p-2"}>
                <FaBars/>
            </button>
            {isOpen && (
                    <div ref={navRef} className="fixed inset-0 flex top-20 justify-center z-10">
                        <div className={"h-[200px] text-sm bg-white text-black flex gap-5 rounded-lg px-4 py-3"}>
                            {navItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="py-2 rounded-md px-2"
                                    onClick={toggle}>
                                    <a
                                        className={"text-lg font-bold"}
                                        href={`/${item.title == "Study in Japan" ? "blog" : item.title.toLowerCase()}`}
                                        >{item.title}
                                    </a>

                                    {item.dropdownItems && (
                                        <>
                                            {item.dropdownItems.map((dropdownItem) => (
                                                <a
                                                    key={dropdownItem}
                                                    href={item.id == "Blog" ? `/blog?tag=${dropdownItem.toLowerCase()}` : item.id == 'Services' ? `/${dropdownItem.toLowerCase()}` : `/soon`}
                                                    className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded px-2 py-1"
                                                >
                                                    {dropdownItem}
                                                </a>
                                            ))}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
            )}
        </>
    )
}
export default MenuBar
