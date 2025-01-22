import React from 'react'
import { BlogPost } from "@/app/interfaces/BlogPost";
import Link from "next/link";

const BlogRender = ({ posts } : { posts: { meta: BlogPost }[]}) => {
    return (
        posts.map(({meta}) => (
            <div
                key={meta.slug}
                className="group hover:border snap-start text-white p-4 rounded-lg md:w-[600px] max-md:mx-auto max-md:w-full"
            >
                <h2 className="text-2xl max-sm:text-lg font-semibold text-left">
                    <Link
                        href={`/blog/${meta.slug}`}
                        className="hover:underline"
                    >
                    {meta.title}
                    </Link>
                </h2>
                <p className="text-justify indent-8 text-lg my-2">{meta.excerpt}</p>
                <div className={"flex justify-between max-sm:grid"}>
                    <Link
                        href={`/blog/${meta.slug}`}
                        className="group p-1 m-1 rounded transform transition-all duration-1000"
                    >
                        Read More
                        <div className={"inline-block"}>
                            <span className={"group-hover:opacity-0 duration-500"}>&nbsp;&gt;</span>
                            <span
                                className={"opacity-0 group-hover:opacity-100 transition-opacity duration-300"}>&gt;&gt;&gt;</span>
                        </div>
                    </Link>
                    <div className="my-2 text-sm">
                        {meta.date} • {meta.tags?.join(', ')}
                    </div>
                </div>
            </div>
        ))
    )
}

export default BlogRender