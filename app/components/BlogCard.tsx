import React from 'react'
import {getAllPosts} from "@/app/lib/mdx";
import BlogRender from "@/app/components/BlogRender";

const BlogCard = async () => {
    const posts = await getAllPosts();

    return (
        <div className="flex flex-col my-4 snap-y hover:snap-mandatory overflow-y-scroll max-h-[800px] gap-6 sm:max-md:max-w-[400px] md:max-lg:max-w-[500px] lg:max-w-[600px]">
            <BlogRender posts={posts} />
        </div>
)
}
export default BlogCard

{/*posts.map(({meta}) => (
                <>
                    <div
                        key={meta.slug}
                        className="border text-white p-4 rounded hover:border-2"
                    >
                        <h2 className="text-xl font-semibold">{meta.title}</h2>
                        <p className="text-wrap">{meta.excerpt}</p>
                        <div className="my-2 text-sm">
                            {meta.date} • {meta.tags?.join(', ')}
                        </div>
                        <ReadMoreBTN blog={meta.slug} />
                    </div>
                </>
            ))*/}
