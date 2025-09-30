import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ug.jumia.is',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kwttechmart.ug',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.kwcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.jtgholdings.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sweetcakesug.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'owino.ug',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'base44.app',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      'egruhckzxqulbmrpzhbp.supabase.co',
      // add other domains if needed
    ],
  },
};

export default nextConfig;

