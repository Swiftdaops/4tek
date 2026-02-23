/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
};

// Add cache headers for high-value SSR pages to reduce TTFB for repeat visits
export async function headers() {
  return [
    {
      source: "/",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
        },
      ],
    },
    {
      source: "/solutions",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
        },
      ],
    },
    {
      source: "/get-started",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
        },
      ],
    },
  ];
}

export default nextConfig;
