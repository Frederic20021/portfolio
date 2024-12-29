import React from 'react'
import Link from "next/link";

const ReadMoreBtn = ({ blog } : { blog: string}) => {
    return (
        <Link
            href={`/blog/${blog}`}
            className="border group p-1 m-1 rounded hover:shadow-lg transform transition-all duration-1000"
        >
            Read More
            <span className={"hidden mx-2 group-hover:inline transform duration-500"}>&gt;&gt;&gt;</span>
        </Link>
    )
}
export default ReadMoreBtn
