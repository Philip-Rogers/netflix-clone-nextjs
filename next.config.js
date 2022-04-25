// Sets up a default image to be grabbed from Unsplash if the intended image/video fails to load
// Provides the domain for the videos we wish to display (i.ytimg.com)
module.exports = {
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com"],
  },

  webpack: (config, options) => {
    if (!options.dev) {
      config.devtool = options.isServer ? false : 'your-custom-devtool'
    }
    return config
  },
  
};