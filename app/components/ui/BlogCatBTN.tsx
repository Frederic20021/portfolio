import React from 'react'
import Link from "next/link";

const BlogCatBTN = ({ category }: { category: string}) => {
    return (
        <Link href={ category != "All" ? `?tag=${category.toLowerCase()}` : "/blog/"}
              className={"border rounded-lg shadow-lg p-1 hover:border-2"}>
            {category}
        </Link>
    )
}
export default BlogCatBTN
