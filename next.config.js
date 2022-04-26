// Sets up a default image to be grabbed from Unsplash if the intended image/video fails to load
// Provides the domain for the videos we wish to display (i.ytimg.com)
module.exports = {
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com"],
  },
  mode: 'production',
  productionBrowserSourceMaps: false,
};