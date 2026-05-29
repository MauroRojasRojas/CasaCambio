'use client';

import Testimonials from '../components/sections/Testimonials';
import ScrollAlertsHorizontal from '../components/sections/ScrollAlertsHorizontal';
import Navbar from '../components/sections/Navbar';
import Hero from '../components/sections/Hero';
import Workflow from '../components/sections/Workflow';
import LiveExchangeRate from '../components/sections/LiveExchangeRate';
import Benefits from '../components/sections/Benefits';
import Footer from '../components/Footer';
import EmpresasAliadas from '../components/sections/EmpresasAliadas';
import SeccionNoticias from '../components/sections/SeccionNoticias';

export default function Home() {
	return (
		<main className='min-h-screen bg-[#F5F7FF] text-slate-900'>
			<Navbar />

			<Hero />

			<Workflow />

			<Benefits />

			<ScrollAlertsHorizontal />

			<LiveExchangeRate />

			<SeccionNoticias />

			<Testimonials />

			<EmpresasAliadas />

			<Footer />
		</main>
	);
}
