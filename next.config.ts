import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['dulmlbqjgashsopdnpux.supabase.co'],
//   },

// };
// module.exports = {
//   experimental: {
//     missingSuspenseWithCSRBailout: false,
//   },
//    eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
 
// }

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['dulmlbqjgashsopdnpux.supabase.co'],
  },
};

module.exports = nextConfig;
