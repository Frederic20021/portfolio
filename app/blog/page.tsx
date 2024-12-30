import { getAllPosts } from '../lib/mdx';
import BrowseCategory from "@/app/components/BrowseCategory";
import BlogRender from "@/app/components/BlogRender";

export default async function BlogPage({ searchParams } : { searchParams : Promise<{ tag?: string }>}) {
    const [posts, param] = await Promise.all([getAllPosts(), searchParams]);


    const filteredPosts = param.tag && param.tag != "all blogs"
        ? posts.filter(post => post.meta.tags?.includes(param.tag as string))
        : posts;

    const postCount = filteredPosts.length;

    return (
        <div className="container mx-auto text-center px-4 justify-center">
            <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
            <BrowseCategory visibility={"visible"}/>
            <div className={`${param.tag ? "flex justify-between" : " "} justify-center`}>
                <span>{param.tag?.toUpperCase()}</span>
                <span>{postCount} Articles</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 ">
                <BlogRender posts={filteredPosts} />
            </div>
        </div>
    );
}

{/*filteredPosts.map(({meta}) => (
                    <div
                        key={meta.slug}
                        className="border text-white p-4 rounded-lg max-md:w-[500px] max-md:mx-auto"
                    >
                        <h2 className="text-xl font-semibold">{meta.title}</h2>
                        <p className="text-wrap">{meta.excerpt}</p>
                        <div className="my-2 text-sm">
                            {meta.date} • {meta.tags?.join(', ')}
                        </div>
                        <ReadMoreBTN blog={meta.slug} />
                    </div>
                    ))*/}
