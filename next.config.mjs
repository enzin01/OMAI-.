/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 960, 1440],
    imageSizes: [32, 64, 96, 128, 256]
  }
};
export default nextConfig;
