import React from 'react'
import {navItems} from "@/app/constants/NavItems";
import BlogCatBTN from "@/app/components/ui/BlogCatBTN";

interface BrowseCategoryProps{
    visibility?: string
}

const BrowseCategory: React.FC<BrowseCategoryProps> = ({ visibility = "hidden" }) => {
    return (
        <div className={`${visibility} sm:flex flex-col text-center m-2`}>
            <span>Browse By Category</span>
            <div className={"flex flex-wrap justify-center gap-2 mx-auto max-w-[300px] bg-blue-500 rounded-lg p-2"}>
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
