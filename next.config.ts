
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
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgd.aeplcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.rushlane.com',
      },
      {
        protocol: 'https',
        hostname: 'akm-img-a-in.tosshub.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.motor1.com',
      },
      {
        protocol: 'https',
        hostname: 'www.royalenfield.com',
      },
      {
        protocol: 'https',
        hostname: 'media.zigcdn.com',
      },
    ],
  },
};

export default nextConfig;
