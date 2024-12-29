import React from 'react'
import Link from "next/link";

const BlogCatBTN = ({ category }: { category: string}) => {
    return (
        <Link href={`/blog?tag=${category.toLowerCase()}`} className={"border rounded-lg shadow-lg p-1 hover:bg-green-900"}>
            {category}
        </Link>
    )
}
export default BlogCatBTN
