import React from 'react'
import {getPinnedPosts} from "@/app/lib/mdx";
import Link from "next/link";

const posts = await getPinnedPosts();

const PinnedContent = ({ visibility = "hidden" }) => {
    return (
        <div className={`${visibility} sm:flex flex-col px-4 w-full`}>
            <span className={"text-2xl my-2 Title"}>Useful Content</span>
            <div className={"text-xl font-bold grid gap-4"}>
                {posts.map((pinnedContent, idx) => (
                        <Link
                            href={`/blog/${pinnedContent.meta.slug}`}
                            className={"group"}
                            key={idx}
                        >
                            <span className={"md:max-w-[400px] text-wrap group-hover:text-yellow-500 flex"}>
                                &gt;
                                <span className={"opacity-0 group-hover:opacity-100 transition-opacity duration-500"}>&gt;&gt;</span>
                                <span className={"ml-2"}>
                                    {pinnedContent.meta.title}
                                </span>
                            </span>
                        </Link>
                ))}
            </div>
        </div>
    )
}
export default PinnedContent
