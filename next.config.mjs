/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      serverActions: {
          allowedOrigins: ["www.candcprinting.com:8090"],
          allowedForwardedHosts: ["www.candcprinting.com:8090"],
      },
  },
  reactStrictMode: false,
};

export default nextConfig;