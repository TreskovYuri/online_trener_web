/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    images: {
  
      domains: ['localhost'],// Домен для изображений
    },
    publicRuntimeConfig: {
      URL: process.env.URL,
      NEXT_PUBLIC_STATIC_URL: process.env.NEXT_PUBLIC_STATIC_URL
  
  
      // Другие переменные окружения, которые вы хотите сделать доступными
    },
    async headers() {
      return [
          {
              // matching all API routes
source: "/api/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          }
      ]
  }
  };
  
  export default nextConfig;