import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl({
  experimental: {
    // Avoid truncated multipart bodies when proxy buffers uploads (large PDFs + careers form).
    proxyClientMaxBodySize: "15mb",
  },
  async redirects() {
    return [
      // Legacy training slug kept in Google index.
      {
        source: "/:locale(sq|en|de)/trainings/bazat-e-tik",
        destination: "/:locale/trainings/smm",
        permanent: true,
      },
      {
        source: "/trainings/bazat-e-tik",
        destination: "/en/trainings/smm",
        permanent: true,
      },
      // Historical opengraph cache-busted path.
      {
        source: "/opengraph-image:hash",
        destination: "/opengraph-image",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
});
