import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	const SITE = 'https://dollariza.pe';
	const lastModified = new Date();

	const routes = ['/', '/quienes-somos', '/contactanos', '/reclamos'];

	return routes.map((path) => ({
		url: `${SITE}${path}`,
		lastModified,
		changeFrequency: 'weekly',
		priority: path === '/' ? 1 : 0.8,
	}));
}