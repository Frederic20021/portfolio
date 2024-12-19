import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { BlogPost } from "@/app/interfaces/BlogPost";

const rootDirectory = path.join(process.cwd(), 'content', 'blog');
export async function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(rootDirectory, `${realSlug}.mdx`);

    const fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
    const { frontmatter, content } = await compileMDX({
        source: fileContents,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypePrism,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                ]
            }
        }
    });

    return {
        meta: {
            ...frontmatter,
            slug: realSlug
        } as BlogPost,
        content
    };
}

export async function getAllPosts(): Promise<{ meta: BlogPost }[]> {
    const files = fs.readdirSync(rootDirectory);

    const posts = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx$/, '');
            return await getPostBySlug(slug);
        })
    );

    return posts
        .filter(post => !post.meta.draft)
        .sort((a, b) =>
            new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
        );
}

export async function getPinnedPosts(): Promise<{ meta: BlogPost }[]> {
    const files = fs.readdirSync(rootDirectory);

    const posts = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx$/, '');
            return await getPostBySlug(slug);
        })
    );

    return posts
        .filter(post => post.meta.pinned)
        .sort((a, b) =>
            new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
        );
}
