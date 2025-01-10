import React from 'react'
import {getPinnedPosts} from "@/app/lib/mdx";
import Link from "next/link";

const posts = await getPinnedPosts();

const PinnedContent = ({ visibility = "hidden" }) => {
    return (
        <div className={`${visibility} sm:flex flex-col px-4 w-full`}>
            <span className={"text-2xl my-2 text-center"}>Useful Content</span>
            <div className={"text-lg grid gap-4"}>
                {posts.map((pinnedContent, idx) => (
                        <Link
                            href={`/blog/${pinnedContent.meta.slug}`}
                            className={"bg-blue-400 group"}
                            key={idx}
                        >
                            <span className={"inline-block"}>
                                {pinnedContent.meta.title}&ensp;<span className={"group-hover:opacity-0 duration-500"}>&gt;</span>
                                <span className={"opacity-0 group-hover:opacity-100 transition-opacity duration-500"}>&gt;&gt;&gt;</span>
                            </span>
                        </Link>
                ))}
            </div>
        </div>
    )
}
export default PinnedContent
