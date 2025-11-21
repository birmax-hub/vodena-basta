/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enabled for better performance - Next.js will optimize images automatically on Vercel
    // Automatic WebP/AVIF conversion and responsive sizing improves LCP significantly
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vmzkfwmyypbgjyjkvoim.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
    // domains is deprecated in favor of remotePatterns, but kept for compatibility
    domains: ["vmzkfwmyypbgjyjkvoim.supabase.co"],
  },
};

export default nextConfig;
