'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { comentariosService } from '@/lib/services/comentariosService';
import type { Comentario } from '@/lib/services/comentariosService';

const AVATAR_COLORS = ['#02254A', '#0053A4', '#0B5ED7', '#1E88E5', '#1565C0', '#0D47A1'];

function getInitials(name: string): string {
	if (!name) return '?';
	return name
		.split(' ')
		.map((w) => w[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
}

function getAvatarColor(name: string): string {
	if (!name) return AVATAR_COLORS[0];
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const getImageUrl = (url: string | null) => {
	if (!url) return null;
	if (url.startsWith('http')) return url;
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:3001';
	return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function Testimonials() {
	const [testimonials, setTestimonials] = useState<Comentario[]>([]);
	const [loading, setLoading] = useState(true);
	const [isPaused, setIsPaused] = useState(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [translateX, setTranslateX] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<number | null>(null);
	const lastTimeRef = useRef<number>(0);

	const loadTestimonials = useCallback(async () => {
		try {
			const data = await comentariosService.getComentarios();
			const visibleTestimonials = data.filter((t) => t.visible === 1 || Boolean(t.visible) === true);
			setTestimonials(visibleTestimonials);
		} catch (error) {
			console.error('Error loading testimonials:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadTestimonials();
	}, [loadTestimonials]);

	// Duplicamos los testimonials para crear el efecto infinito (solo si hay testimonios)
	const duplicatedTestimonials = testimonials.length > 0 ? [...testimonials, ...testimonials, ...testimonials, ...testimonials] : [];

	// Velocidad de movimiento (píxeles por segundo)
	const speed = 40;

	// Ancho de cada card + gap
	const getCardWidth = () => {
		if (typeof window === 'undefined') return 400;
		if (window.innerWidth < 640) return 300 + 16; // w-[300px] + gap-4
		if (window.innerWidth < 768) return 350 + 24; // w-[350px] + gap-6
		return 400 + 32; // w-[400px] + gap-8
	};

	// Animación continua
	useEffect(() => {
		if (isPaused || testimonials.length === 0) {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
			return;
		}

		const animate = (timestamp: number) => {
			if (!lastTimeRef.current) lastTimeRef.current = timestamp;
			const delta = timestamp - lastTimeRef.current;
			lastTimeRef.current = timestamp;

			setTranslateX((prev) => {
				const totalWidth = testimonials.length * getCardWidth();
				let newX = prev - (speed * delta) / 1000;
				// Reset cuando llegamos al final del primer set
				if (Math.abs(newX) >= totalWidth) {
					newX = newX + totalWidth;
				}
				return newX;
			});

			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [isPaused, testimonials.length]);

	// Función para centrar una card al hacer clic
	const centerCard = (idx: number) => {
		if (!containerRef.current) return;

		const containerWidth = containerRef.current.offsetWidth;
		const cardWidth = getCardWidth();
		const cardCenter = idx * cardWidth + cardWidth / 2;
		const targetX = -(cardCenter - containerWidth / 2);

		const startX = translateX;
		const distance = targetX - startX;
		const duration = 800; // milisegundos
		const startTime = performance.now();

		const animateToCenter = (timestamp: number) => {
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

			setTranslateX(startX + distance * easeOut);

			if (progress < 1) {
				requestAnimationFrame(animateToCenter);
			}
		};

		requestAnimationFrame(animateToCenter);
	};

	const handleCardClick = (idx: number, testimonioId: number) => {
		if (selectedId === testimonioId) {
			setIsPaused(false);
			setSelectedId(null);
			lastTimeRef.current = 0;
		} else {
			setIsPaused(true);
			setSelectedId(testimonioId);
			centerCard(idx);
		}
	};

	if (!loading && testimonials.length === 0) {
		return null;
	}

	return (
		<section className='w-full py-20 relative overflow-hidden'>
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-96 h-96 bg-[#02254A]/5 rounded-full blur-3xl" />
				<div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#0053A4]/5 rounded-full blur-3xl" />
			</div>

			<div className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 mb-14 text-center">
				<span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#0053A4] bg-[#0053A4]/10 px-4 py-1.5 rounded-full mb-4">
					Historias de Éxito
				</span>
				<h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#02254A] leading-tight">
					Lo que dicen{' '}
					<span className="bg-gradient-to-r from-[#0053A4] to-[#02254A] bg-clip-text text-transparent">
						nuestros clientes
					</span>
				</h2>
				<p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
					Descubre por qué miles de personas y empresas confían en nosotros para sus cambios de divisas día a día.
				</p>
			</div>

			{/* Contenedor del carrusel */}
			<div className='relative w-full' ref={containerRef}>
				{/* Gradientes de fade en los bordes para dar sensación de profundidad */}
				<div className='absolute left-0 top-0 bottom-0 w-24 sm:w-32 md:w-64 bg-linear-to-r from-white via-white/80 to-transparent z-10 pointer-events-none' />
				<div className='absolute right-0 top-0 bottom-0 w-24 sm:w-32 md:w-64 bg-linear-to-l from-white via-white/80 to-transparent z-10 pointer-events-none' />

				{loading ? (
					<div className='flex justify-center items-center py-20'>
						<div className='animate-spin rounded-full h-14 w-14 border-4 border-blue-100 border-t-[#0053A4]'></div>
					</div>
				) : (
					<div
						ref={carouselRef}
						className='flex gap-4 sm:gap-6 md:gap-8 py-8 px-4'
						style={{
							width: 'max-content',
							transform: `translateX(${translateX}px)`,
						}}
					>
						{duplicatedTestimonials.map((testimonial, idx) => {
							const isSelected = selectedId === testimonial.id;
							const photoUrl = getImageUrl(testimonial.foto_url);

							return (
								<div
									key={`${testimonial.id}-${idx}`}
									onClick={() => handleCardClick(idx, testimonial.id)}
									className={`
										relative bg-white rounded-3xl p-6 sm:p-8 shrink-0 cursor-pointer
										w-[300px] sm:w-[350px] md:w-[400px]
										transition-all duration-500 ease-out border border-slate-100
										${isSelected ? 'shadow-2xl scale-105 ring-2 ring-[#0053A4]/20 z-20' : 'shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2'}
									`}
								>
									{/* Comillas decorativas */}
									<div className='absolute top-6 right-8 opacity-5 text-8xl font-serif text-[#0053A4] pointer-events-none'>
										"
									</div>

									{/* Estrellas */}
									<div className='flex gap-1 mb-4'>
										{[...Array(5)].map((_, i) => (
											<svg
												key={i}
												className={`w-5 h-5 transition-colors duration-300 ${i < (testimonial.estrellas || 5) ? 'text-[#FFCE01] drop-shadow-xs' : 'text-slate-200'}`}
												fill='currentColor'
												viewBox='0 0 20 20'
											>
												<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
											</svg>
										))}
									</div>

									<p className={`text-slate-600 leading-relaxed mb-8 text-sm sm:text-base relative z-10 transition-all duration-300 ${isSelected ? 'line-clamp-none' : 'line-clamp-4'}`}>
										"{testimonial.comentario}"
									</p>

									<div className='flex items-center gap-4 mt-auto pt-4 border-t border-slate-50'>
										<div className='relative'>
											{photoUrl ? (
												<div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-sm ring-2 ring-white'>
													<img
														src={photoUrl}
														className='w-full h-full object-cover'
														alt={testimonial.nombre_cliente}
														onError={(e) => {
															// Fallback in case image fails to load
															e.currentTarget.style.display = 'none';
															e.currentTarget.parentElement!.classList.add('hidden');
															e.currentTarget.parentElement!.nextElementSibling?.classList.remove('hidden');
														}}
													/>
												</div>
											) : null}

											{/* Avatar Fallback (Shown when no photo or if photo fails to load) */}
											<div
												className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-sm ring-2 ring-white text-white font-bold text-lg ${photoUrl ? 'hidden' : ''}`}
												style={{ backgroundColor: getAvatarColor(testimonial.nombre_cliente || '?') }}
											>
												{getInitials(testimonial.nombre_cliente || '?')}
											</div>
										</div>
										<div>
											<h4 className='font-bold text-[#02254A] text-sm sm:text-base'>{testimonial.nombre_cliente}</h4>
											<p className='text-xs sm:text-sm text-slate-400'>Cliente Verificado</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>

			{/* Indicador de pausa */}
			{!loading && testimonials.length > 0 && (
				<div className='flex justify-center mt-8'>
					<button
						onClick={() => setIsPaused(!isPaused)}
						className='flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-slate-500 text-sm hover:text-[#0053A4] transition-colors'
					>
						{isPaused ? (
							<>
								<i className='pi pi-play text-xs' />
								<span>Reanudar carrusel</span>
							</>
						) : (
							<>
								<i className='pi pi-pause text-xs' />
								<span>Pausar carrusel</span>
							</>
						)}
					</button>
				</div>
			)}
		</section>
	);
}

