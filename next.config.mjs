/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vmzkfwmyypbgjyjkvoim.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
    domains: ["vmzkfwmyypbgjyjkvoim.supabase.co"],
  },
};

export default nextConfig;
