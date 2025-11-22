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
  
  // Modern browser support - no legacy polyfills
  // Browserslist config (.browserslistrc) targets modern browsers only
  // This eliminates legacy polyfills (Array.flat, Object.fromEntries, etc.)
  // Next.js 14 automatically respects browserslist for modern output
  
  // Force modern ES2020+ output - no transpilation of node_modules
  // This ensures only modern JavaScript is output, reducing bundle size
  transpilePackages: [],
  
  // Experimental optimizations for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Ensure modern output without legacy transforms
    serverComponentsExternalPackages: [],
  },
  
  // Optimize CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
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
      {
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
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
