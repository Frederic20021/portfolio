import React from 'react'
import Link from "next/link";

const BlogCatBTN = ({ category }: { category: string}) => {
    return (
        <Link href={`/blog?tag=${category.toLowerCase()}`} className={"border rounded-lg shadow-lg p-1 hover:border-2"}>
            {category}
        </Link>
    )
}
export default BlogCatBTN
