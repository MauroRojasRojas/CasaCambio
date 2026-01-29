import type { Metadata } from 'next';
import { Geist, Geist_Mono, Anton } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
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

export const metadata: Metadata = {
	title: 'Dollariza',
	description: 'Aplicación para conversión de moneda.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='es'>
			<body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased overflow-x-hidden`}>
				<PrimeReactProvider>
					<AuthProvider>{children}</AuthProvider>
				</PrimeReactProvider>
			</body>
		</html>
	);
}
