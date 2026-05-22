const path = require('path');
const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.join(__dirname, 'components'),
      '@styles': path.join(__dirname, 'styles'),
    };

    config.plugins.push(
      new webpack.ContextReplacementPlugin(/keyv/, (data) => {
        delete data.dependencies[0].critical;
        return data;
      })
    );
    return config;
  },

  transpilePackages: ["@repo/ui", "@repo/common", "@repo/recoil"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2szwvl7yo497w.cloudfront.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'appx-wsb-gcp.akamai.net.in',
        pathname: '**',
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;