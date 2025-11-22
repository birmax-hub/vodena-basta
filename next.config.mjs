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
      {
        protocol: "https",
        hostname: "vodenabasta.rs",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.vodenabasta.rs",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Production optimizations for Next.js 14
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Production caching headers
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
