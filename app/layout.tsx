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

  title: 'Dollariza | Casa de cambio online en Perú – Tipo de cambio en vivo',
  description:
    'Cambia dólares y soles 100% online con tipo de cambio competitivo. Cotiza en vivo (compra/venta), transfiere desde tu banco y recibe en tu cuenta de forma rápida y segura.',

  alternates: { canonical: '/' },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
      'Cotiza en vivo el tipo de cambio (compra/venta) y cambia dólares y soles online de forma segura.',
    images: [
      {
        url: '/icons/logop.svg',
        width: 1200,
        height: 630,
        alt: 'Dollariza',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Dollariza | Casa de cambio online en Perú – Tipo de cambio en vivo',
    description:
      'Cotiza en vivo el tipo de cambio y cambia dólares y soles online de forma segura.',
    images: ['/icons/logop.svg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-PE">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased overflow-x-hidden`}
      >
        <PrimeReactProvider>
          <AuthProvider>{children}</AuthProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}