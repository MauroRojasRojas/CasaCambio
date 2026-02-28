import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const SITE = 'https://dollariza.pe';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/admin/', '/registro/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}