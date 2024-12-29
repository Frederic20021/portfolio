import React from 'react'
import {getPinnedPosts} from "@/app/lib/mdx";
import Link from "next/link";

const posts = await getPinnedPosts();

const PinnedContent = ({ visibility = "hidden" }) => {
    return (
        <div className={`${visibility} sm:flex flex-col px-4 w-full`}>
            <span className={"text-2xl my-2"}>Useful Content</span>
            <div>
                {posts.map((pinnedContent, idx) => (
                    <div key={idx} className={"flex items-center group"}>
                        <span>-&ensp;{pinnedContent.meta.title}</span>
                        <Link href={`/blog/${pinnedContent.meta.slug}`}>
                            <span className={"hidden mx-2 group-hover:inline transition-opacity duration-500"}>&gt;&gt;&gt;</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PinnedContent
