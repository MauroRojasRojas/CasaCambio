/* import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	
};

export default nextConfig;
 */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'export',
	trailingSlash: true,
	images: { unoptimized: true },
	productionBrowserSourceMaps: true,
};

export default nextConfig;