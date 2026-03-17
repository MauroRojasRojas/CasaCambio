import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
	const SITE = 'https://dollariza.pe';

	return {
		rules: [
			{
				userAgent: '*',
				allow: ['/'],
				disallow: ['/admin/', '/registro/', '/api/'],
			},
		],
		sitemap: `${SITE}/sitemap.xml`,
		host: SITE,
	};
}