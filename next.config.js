/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode to prevent double initialization
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
}

module.exports = nextConfig
