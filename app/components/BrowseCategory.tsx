import React from 'react'
import {navItems} from "@/app/constants/NavItems";
import BlogCatBTN from "@/app/components/ui/BlogCatBTN";

interface BrowseCategoryProps{
    visibility?: string
}

const BrowseCategory: React.FC<BrowseCategoryProps> = ({ visibility = "hidden" }) => {
    return (
        <div className={`${visibility} sm:flex flex-col text-center m-2`}>
            <span className={"py-2 text-2xl"}>Browse By Category</span>
            <div className={"flex flex-wrap justify-center gap-2 gap-y-4 mx-auto max-w-[280px] py-2"}>
                {navItems[0].dropdownItems && navItems[0].dropdownItems.map((cat) => (
                    <div key={cat}>
                        <BlogCatBTN category={cat}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default BrowseCategory
