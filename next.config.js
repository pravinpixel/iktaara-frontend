/** @type {import('next').NextConfig} */
const TerserPlugin = require("terser-webpack-plugin");
const nextConfig = {
  basePath: '',
  reactStrictMode: false,
  output: 'standalone',
  swcMinify: true,
  generateEtags: false,
  env: {
    API_END_POINT: process.env.API_END_POINT,
    HOST_URL: process.env.HOST_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    CCAVENUE_MERCHANT_ID: process.env.NEXT_PUBLIC_MERCHANT_ID,
    CCAVENUE_ACCESS_CODE: process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE,
    CCAVENUE_WORKING_CODE: process.env.NEXT_PUBLIC_CCAVENUE_WORKING_CODE,
    GOOGLE_LOGIN_ID: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_ID,
    GOOGLE_LOGIN_SECRET: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_SECRET,
    STAGING_URL: process.env.NEXT_PUBLIC_STAGING_URL,

  },

  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.HOST_URL,
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
       
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com *.google.com https://*.ggpht.com *.googleusercontent.com https://accounts.google.com blob:;",
          },
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
      {
        // matching all API routes
        // https://vercel.com/guides/how-to-enable-cors
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

//  async rewrites() {
//     return [
//       {
//         source: '/',
//         destination: process.env.NEXT_PUBLIC_STAGING_URL === 'https://staging.iktaraa.com' ? '/' : '/buy',
//       },
//     ];
//   },
  webpack: (config, { dev, isServer }) => {
    // Add Terser plugin for production builds only
    // if (!dev && !isServer) {
        config.optimization.removeEmptyChunks= true,
        config.optimization.minimize= true,
        config.optimization.mergeDuplicateChunks= true,
        config.optimization.flagIncludedChunks= false,
        config.optimization.minimizer = [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Remove console.log statements
                        passes: 2,
                        // defaults:true,
                    },
                },
            }),
        ];
    // }

    return config;
},
};

module.exports = nextConfig;
