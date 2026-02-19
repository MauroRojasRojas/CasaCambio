import ComplaintsBook from '@/components/ComplaintsBook';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/Footer';

export default function ReclamosPage() {
	return (
		<main className='min-h-screen bg-[#F5F7FF]'>
			<Navbar />
			<div className='pt-20'>
				<ComplaintsBook />
			</div>
			<Footer />
		</main>
	);
}
