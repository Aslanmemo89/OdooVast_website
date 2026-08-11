/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // "/" has no content of its own — English is the default entry point.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
