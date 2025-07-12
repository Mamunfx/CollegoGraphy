/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
    domains: [
      'upload.wikimedia.org',
      "example.com",
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
