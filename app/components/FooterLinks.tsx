import React from 'react'
import {navItems} from "@/app/constants/NavItems";

const FooterLinks = () => {
    return (
        <div className={"flex bg-green-800 p-4 justify-center text-center gap-12"}>
            {navItems.map((item, index) => (
                <>
                    {item.id == "Blog" ?
                        <div key={index} className={"hidden md:flex flex-col min-w-[200px]"}>
                            <span>{item.id}</span>
                            <div className={"grid grid-cols-2 gap-2 bg-red-300 text-left"}>
                                {item.dropdownItems && item.dropdownItems.map((dropdownItem) => (
                                    <a
                                        key={dropdownItem}
                                        href={`/${item.id.toLowerCase()}?tag=${dropdownItem.toLowerCase()}`}
                                        className="block text-white hover:text-gray-900 hover:bg-gray-100 rounded px-2 py-1"
                                    >
                                        {dropdownItem}
                                    </a>
                                ))}
                            </div>
                        </div> :
                        <div key={index}>
                            <span>{item.id}</span>
                            <div className={"grid gap-2 bg-red-300 text-left"}>
                                {item.dropdownItems && item.dropdownItems.map((dropdownItem) => (
                                    <a
                                        key={dropdownItem}
                                        href={`/${item.id}/${dropdownItem
                                            .toLowerCase()
                                            .replace(' ', '-')}`}
                                        className="block text-white hover:text-gray-900 hover:bg-gray-100 rounded px-2 py-1"
                                    >
                                        {dropdownItem}
                                    </a>
                                ))}
                                {item.linkItems && item.linkItems.map((linkItem, key) => (
                                    <a
                                        key={key}
                                        href={linkItem.href}
                                        className="block text-white hover:text-gray-900 hover:bg-gray-100 rounded px-2 py-1"
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
