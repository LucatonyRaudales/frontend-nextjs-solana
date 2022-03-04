module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["www.pngkey.com", "api.qrserver.com"],
    formats: ["image/webp"],
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
};
