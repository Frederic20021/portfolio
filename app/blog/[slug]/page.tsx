import { getPostBySlug, getAllPosts } from '@/app/lib/mdx';
import { notFound } from 'next/navigation';
import Link from "next/link";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map(post => ({
        slug: post.meta.slug
    }));
}

export default async function BlogPostPage({
                                               params
                                           }: {
    params: Promise<{ slug : string}>,
}) {
    try {
        const resolvedParam = await params
        const { slug } = resolvedParam;
        const { meta, content } = await getPostBySlug(slug);

        return (
            <article className="prose container mx-auto px-4 max-w-[1000px]">
                <h1 className={"text-3xl text-center"}>{meta.title}</h1>
                <div className="!text-left mb-6">
                    {meta.date} <div className={"float-end inline"}> Author : <Link href={"/about"}>{meta.author.name}</Link></div>
                </div>
                <div className={"md:w-[700px] mx-auto text-justify blog-style"}>
                    {content}
                    <p>
                        Thanks for reading thus far!
                    </p>
                </div>
            </article>
        );
    } catch (error) {
        console.log(error)
        notFound();
    }
}