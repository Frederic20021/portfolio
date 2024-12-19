export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags?: string[];
    draft?: boolean;
    readingTime?: number;
    author: {
        name: string;
        image?: string;
    };
    pinned?: boolean;
}