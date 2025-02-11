import React from 'react'
import BlogCard from "@/app/components/BlogCard";
import BrowseCategory from "@/app/components/BrowseCategory";
import PinnedContent from "@/app/components/PinnedContent";
import {GetStaticProps} from "next";
import {getPinnedPosts} from "@/app/lib/mdx";
import {BlogPost} from "@/app/interfaces/BlogPost";

export const getStaticProps: GetStaticProps = async () => {
    const posts: { meta: BlogPost }[] = await getPinnedPosts(); // Fetch pinned posts at build time
    return {
        props: {
            posts,
        },
    };
};

const Blog =  () => {

    return (
        <div className={"flex gap-4 mx-auto justify-center py-8"}>
            <div className={"flex justify-center max-sm:flex-col items-center"}>
                <div className={"sm:hidden gap-4"}>
                    <BrowseCategory visibility={"visible"}/>
                </div>
                <div className={"justify-center sm:basis-7/8 mx-8 my-2"}>
                    <span className={"Title text-2xl"}>Articles & Guides</span>
                    <BlogCard/>
                </div>
            </div>
            <div className={"flex flex-col items-center sm:basis-1/8 gap-4"}>
                <BrowseCategory/>
                <PinnedContent/>
            </div>
        </div>
    )
}
export default Blog
