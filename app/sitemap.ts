import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	const SITE = 'https://dollariza.pe';
	const lastModified = new Date();

	return [
		{
			url: SITE,
			lastModified,
			changeFrequency: 'daily', // home cambia con el tipo de cambio
			priority: 1,
		},
		{
			url: `${SITE}/quienes-somos`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${SITE}/contactanos`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${SITE}/reclamos`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.4,
		},
	];
}