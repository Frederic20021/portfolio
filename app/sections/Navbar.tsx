import React from 'react'
import Navlink from "@/app/components/ui/Navlink";
import SocialLinks from "@/app/components/SocialLinks";
import Link from "next/link";
import MenuBar from "@/app/components/ui/MenuBar";

const Navbar = () => {

    return (
        <div className={"flex justify-between md:justify-center text-xl items-center px-4 gap-3 sticky top-0 z-50 h-[4rem] bg-red-300"}>
            <Link href={"/"}>
                <span>SI THU LIN</span>
            </Link>
            <div className={"hidden md:flex justify-center items-center gap-2 mx-8"}>
                <Navlink/>
            </div>
            <div className={"md:hidden"}>
                <MenuBar />
            </div>
            <SocialLinks/>
        </div>
    )
}
export default Navbar