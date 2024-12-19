import React from 'react'
import Link from "next/link";

const ReadMoreBtn = ({ blog } : { blog: string}) => {
    return (
        <Link
            href={`/blog/${blog}`}
            className="border my-2 rounded hover:shadow-lg transition"
        >Read More <span className={"hidden"}>...</span>
        </Link>
    )
}
export default ReadMoreBtn
