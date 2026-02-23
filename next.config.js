/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [], // Add your image domains here
    },

    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

module.exports = nextConfig;
