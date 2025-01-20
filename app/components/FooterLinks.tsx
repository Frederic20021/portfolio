import React from 'react'
import {navItems} from "@/app/constants/NavItems";

const cusCss = "block text-white text-center hover:border rounded px-2 py-1"

const FooterLinks = () => {
    return (
        <div className={"flex p-4 justify-center gap-12"}>
            {navItems.map((item, index) => (
                <>
                        <div key={index} className={"hidden md:flex flex-col min-w-[200px]"}>
                            <span className={"Title text-2xl"}>{item.id}</span>
                            <div className={`grid ${item.id == "Blog" ? "grid-cols-2" : ""} gap-2 text-left mx-auto`}>
                                {item.dropdownItems && item.dropdownItems.map((dropdownItem) => (
                                    <a
                                        key={dropdownItem}
                                        href={`/${item.id.toLowerCase()}?tag=${dropdownItem.toLowerCase()}`}
                                        className={cusCss}
                                    >
                                        {dropdownItem}
                                    </a>
                                ))}
                                {item.linkItems && item.linkItems.map((linkItem, key) => (
                                    <a
                                        key={key}
                                        href={linkItem.href}
                                        className={cusCss}
                                    >
                                        {linkItem.id}
                                    </a>
                                ))}
                            </div>
                        </div>
                </>
            ))}
        </div>
    )
}
export default FooterLinks
