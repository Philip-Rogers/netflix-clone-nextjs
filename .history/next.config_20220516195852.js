const withPWA = require("next-pwa");

module.exports = withPWA({
  //...before
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  //...after

  // Sets up a default image to be grabbed from Unsplash if the intended image/video fails to load
  // Provides the domain for the videos we wish to display (i.ytimg.com)
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com"],
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});