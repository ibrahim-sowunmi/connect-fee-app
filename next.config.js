/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Suppress hydration warnings
  onRecoverableError: (error) => {
    if (error.message.includes('Hydration')) {
      return;
    }
    console.error(error);
  },
}

module.exports = nextConfig 