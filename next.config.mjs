// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transpilePackages: ['next-mdx-remote'],
    webpack: (config) => {
        // This is needed for working with MDX files
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };
        return config;
    },
}

export default nextConfig