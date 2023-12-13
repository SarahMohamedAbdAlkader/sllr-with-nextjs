/** @type {import('next').NextConfig} */

const withImages = require("next-images");

const nextConfig = withImages({
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        })
    
        return config
      },
});

module.exports = nextConfig;
