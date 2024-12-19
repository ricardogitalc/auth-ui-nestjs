/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co', 'picsum.photos', 'via.placeholder.com', 'ui-avatars.com'],
  },
  // CACHE
  // experimental: {
  //   staleTimes: {
  //     dynamic: 0,
  //     static: 0,
  //   }
  // }
};

export default nextConfig;
