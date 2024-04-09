/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.penguin.co.uk",
        port: "",
      },
    ],
  },
};

export default nextConfig;
