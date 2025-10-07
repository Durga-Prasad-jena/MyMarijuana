/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  // Next.js 15 specific optimizations
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', '@emotion/react'],
  },
  // Skip static generation for pages with client-side dependencies
  exportPathMap: async function (defaultPathMap, { buildId }) {
    const paths = { ...defaultPathMap };
    // Remove problematic paths from static generation
    delete paths['/forms/form-quill'];
    delete paths['/forms/form-elements/date-time'];
    delete paths['/theme-pages/treeview'];
    return paths;
  },
};

module.exports = nextConfig;
