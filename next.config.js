/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    
    env: {
        NEXT_API_URL: 'https://bible-api-9522.onrender.com',
    },
};

module.exports = nextConfig;
