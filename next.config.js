const nextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
  },
    compiler: {
    styledComponents: true,
  },
  // Next.js 15 specific optimizations
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', '@emotion/react'],
  },

  reactStrictMode: true,
}

module.exports = nextConfig
