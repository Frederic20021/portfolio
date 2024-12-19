import { getPostBySlug, getAllPosts } from '@/app/lib/mdx';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map(post => ({
        slug: post.meta.slug
    }));
}

export default async function BlogPostPage({
                                               params
                                           }: {
    params: { slug : string}
}) {
    try {
        const Param = await params;//had to await the params in Next 15
        const { meta, content } = await getPostBySlug(Param.slug);

        return (
            <article className="prose lg:prose-xl text-center container mx-auto px-4">
                <h1>{meta.title}</h1>
                <div className="!text-left text-gray-600 mb-6">
                    {meta.date} • {meta.author.name}
                </div>
                {content}
            </article>
        );
    } catch (error) {
        console.log(error)
        notFound();
    }
}