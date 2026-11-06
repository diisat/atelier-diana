import createNextIntlPlugin from "next-intl/plugin";
const nextConfig = {
  output: "standalone",
  turbopack: { root: import.meta.dirname },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};
export default createNextIntlPlugin("./i18n/request.js")(nextConfig);
