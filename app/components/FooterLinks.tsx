import React from 'react'
import {navItems} from "@/app/constants/NavItems";

const FooterLinks = () => {
    return (
        <div className={"flex p-4 justify-center gap-12"}>
            {navItems.map((item, index) => (
                <>
                    {item.id == "Blog" ?
                        <div key={index} className={"hidden md:flex flex-col min-w-[200px]"}>
                            <span className={"text-2xl"}>{item.id}</span>
                            <div className={"grid grid-cols-2 gap-2 text-left"}>
                                {item.dropdownItems && item.dropdownItems.map((dropdownItem) => (
                                    <a
                                        key={dropdownItem}
                                        href={`/${item.id.toLowerCase()}?tag=${dropdownItem.toLowerCase()}`}
                                        className="block text-white text-center hover:bg-green-900 rounded px-2 py-1"
                                    >
                                        {dropdownItem}
                                    </a>
                                ))}
                            </div>
                        </div> :
                        <div key={index}>
                            <span className={"text-2xl"}>{item.id}</span>
                            <div className={"grid gap-2 justify-center text-left"}>
                                {item.dropdownItems && item.dropdownItems.map((dropdownItem) => (
                                    <a
                                        key={dropdownItem}
                                        href={`/${item.id}/${dropdownItem
                                            .toLowerCase()
                                            .replace(' ', '-')}`}
                                        className="block text-white hover:bg-green-900 rounded px-2 py-1"
                                    >
                                        {dropdownItem}
                                    </a>
                                ))}
                                {item.linkItems && item.linkItems.map((linkItem, key) => (
                                    <a
                                        key={key}
                                        href={linkItem.href}
                                        className="block text-white hover:bg-green-900 rounded px-2 py-1"
                                    >
                                        {linkItem.id}
                                    </a>
                                    ))}
                            </div>
                        </div>
                    }
                </>
            ))}
        </div>
    )
}
export default FooterLinks
