'use client';

import Testimonios from './components/Testimonials';
import ScrollAlertsHorizontal from './components/ScrollAlertsHorizontal';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Workflow from './components/sections/Workflow';
import LiveExchangeRate from './components/sections/LiveExchangeRate';
import Benefits from './components/sections/Benefits';
import Footer from './components/Footer';

export default function Home() {
	return (
		<main className='min-h-screen bg-[#F5F7FF] text-slate-900'>
			<Navbar />

			<Hero />

			<Workflow />

			<LiveExchangeRate />

			{/* SECCIÓN — Alertas de tipo de cambio (Banner + Slider + Texto) */}
			<ScrollAlertsHorizontal />

			<Benefits />

			{/* SECCIÓN 5 — Clientes */}
			<Testimonios />

			{/* FOOTER */}
			<Footer />
		</main>
	);
}
