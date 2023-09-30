/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/kriscard/readme-ai",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
