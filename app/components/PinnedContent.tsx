import React from 'react'
import {getPinnedPosts} from "@/app/lib/mdx";
import Link from "next/link";

const posts = await getPinnedPosts();

const PinnedContent = ({ visibility = "hidden" }) => {
    return (
        <div className={`${visibility} sm:flex flex-col`}>
            <span>Useful Content</span>
            <div>
                {posts.map((pinnedContent, idx) => (
                    <div key={idx} className={"flex"}>
                        <span>{pinnedContent.meta.title}</span>
                        <Link href={`/blog/${pinnedContent.meta.slug}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4 ml-2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                            </svg>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PinnedContent
