import ComplaintsBook from '@/app/components/ComplaintsBook';
import Navbar from '@/app/components/sections/Navbar';
import Footer from '@/app/components/Footer';

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
