import React from 'react'
import { BlogPost } from "@/app/interfaces/BlogPost";
import ReadMoreBTN from "@/app/components/ui/ReadMoreBTN";

const BlogRender = ({ posts } : { posts: { meta: BlogPost }[]}) => {
    return (
        posts.map(({meta}) => (
            <div
                key={meta.slug}
                className="border hover:border-2 text-white p-4 rounded-lg md:w-[500px] max-md:mx-auto max-md:w-full"
            >
                <h2 className="text-xl max-sm:text-lg font-semibold">{meta.title}</h2>
                <p className="text-justify indent-8 text-lg my-2">{meta.excerpt}</p>
                <div className="my-2 text-sm">
                    {meta.date} • {meta.tags?.join(', ')}
                </div>
                <ReadMoreBTN blog={meta.slug} />
            </div>
        ))
    )
}

export default BlogRender