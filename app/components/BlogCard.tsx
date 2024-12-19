import React from 'react'
import ReadMoreBTN from "@/app/components/ui/ReadMoreBTN";
import {getAllPosts} from "@/app/lib/mdx";

const BlogCard = async () => {
    const posts = await getAllPosts();

    return (
        <div className="flex flex-col my-4 overflow-y-scroll max-h-[500px] gap-6 sm:max-md:max-w-[500px] md:max-lg:max-w-[600px] lg:max-w-[700px]">
            {posts.map(({meta}) => (
                <>
                    <div
                        key={meta.slug}
                        className="border text-white p-4 rounded"
                    >
                        <h2 className="text-xl font-semibold">{meta.title}</h2>
                        <p className="text-wrap">{meta.excerpt}</p>
                        <div className="mt-2 text-sm">
                            {meta.date} • {meta.tags?.join(', ')}
                        </div>
                        <ReadMoreBTN blog={meta.slug} />
                    </div>
                </>
            ))}
        </div>
)
}
export default BlogCard

{/*<div className={"flex flex-col"}>
        <span>Title</span>
        <p>Excerpt</p>
        <ReadMoreBTN blog={"test"}/>
    </div>
    */}
