const CopyPlugin = require("copy-webpack-plugin")

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/@rdkit/rdkit/dist/RDKit_minimal.wasm",
            to: "static/chunks/RDKit_minimal.wasm",
            toType: "file",
          },
        ],
      })
    )

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      }
    }

    return config
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
