/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Note: unoptimized: true disables Next.js Image Optimization API
    // This is typically used for static exports or CDN-only deployments
    // If deploying to Vercel, consider setting to false for better performance
    // Cloudflare can work with Next.js image optimization if configured properly
    unoptimized: true,
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
