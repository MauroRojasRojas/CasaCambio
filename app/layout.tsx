import type { Metadata } from 'next';
import { Geist, Geist_Mono, Anton } from 'next/font/google';
import '../styles/globals.css';
import '../styles/primereact-custom.css';
import { AuthProvider } from './context/AuthContext';
import type { ReactNode } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const anton = Anton({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-anton',
});

const SITE_URL = 'https://dollariza.pe';

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	applicationName: 'Dollariza',

	title: {
		default: 'Dollariza | Casa de cambio online en Perú – Tipo de cambio en vivo',
		template: '%s | Dollariza',
	},
	description:
		'Dollariza es la casa de cambio online más confiable de Perú. Cambia dólares y soles 100% online con el mejor tipo de cambio del mercado. Transferencias inmediatas en 15 a 40 minutos.',

	keywords: [
		'Dollariza',
		'dollariza.pe',
		'casa de cambio online Peru',
		'tipo de cambio dolar Peru',
		'cambio de dolares online Peru',
		'cambio dolar sol Peru',
		'mejor tipo de cambio Peru',
		'casa de cambio Peru',
		'cambio divisas online Peru',
		'tipo de cambio en vivo Peru',
	],

	alternates: {
		canonical: SITE_URL,
		languages: { 'es-PE': SITE_URL },
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-snippet': -1,
			'max-image-preview': 'large',
			'max-video-preview': -1,
		},
	},

	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/favicon.ico',
	},

	openGraph: {
		type: 'website',
		siteName: 'Dollariza',
		locale: 'es_PE',
		url: SITE_URL,
		title: 'Dollariza | Casa de cambio online en Perú – Tipo de cambio en vivo',
		description:
			'Dollariza: cambia dólares y soles 100% online con el mejor tipo de cambio del mercado. Rápido, seguro y sin costo adicional.',
		images: [
			{
				url: `${SITE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: 'Dollariza – Casa de cambio online en Perú',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: 'Dollariza | Casa de cambio online en Perú – Tipo de cambio en vivo',
		description:
			'Cambia dólares y soles 100% online con el mejor tipo de cambio del mercado.',
		images: [`${SITE_URL}/og-image.png`],
	},
};

// JSON-LD: le dice a Google exactamente quién es Dollariza como entidad
const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'FinancialService',
	name: 'Dollariza',
	alternateName: ['Dollariza Perú', 'dollariza.pe'],
	url: SITE_URL,
	logo: `${SITE_URL}/icons/logomejorado.png`,
	description:
		'Casa de cambio online en Perú. Cambia dólares y soles al mejor tipo de cambio del mercado con transferencias inmediatas.',
	address: {
		'@type': 'PostalAddress',
		addressCountry: 'PE',
		addressRegion: 'Lima',
	},
	contactPoint: {
		'@type': 'ContactPoint',
		telephone: '+51-956-767-180',
		email: 'info.dollariza@gmail.com',
		contactType: 'customer service',
		availableLanguage: 'Spanish',
	},
	areaServed: {
		'@type': 'Country',
		name: 'Peru',
	},
	currenciesAccepted: 'PEN, USD',
	serviceType: 'Cambio de divisas online',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='es-PE'>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
				/>
			</head>
			<body
				suppressHydrationWarning
				className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased overflow-x-hidden`}
			>
				<PrimeReactProvider>
					<AuthProvider>{children}</AuthProvider>
					<WhatsAppFloatButton />
				</PrimeReactProvider>
			</body>
		</html>
	);
}