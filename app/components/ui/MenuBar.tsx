"use client"
import React from 'react'
import { FaBars } from "react-icons/fa"
import {navItems} from "@/app/constants/NavItems"
import Link from "next/link";

const MenuBar = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <>
            <button onClick={toggle} className={"text-2xl p-2"}>
                <FaBars/>
            </button>
            {isOpen && (
                <>
                    <div className={"absolute bg-white text-black flex flex-col rounded-lg px-4"}>
                        {navItems.map((item, index) => (
                            <>
                                <Link
                                    href={`/${item.title == "Study in Japan" ? "blog" : item.title.toLowerCase()}`}
                                    key={index}>
                                    {item.title}
                                </Link>
                            </>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}
export default MenuBar
