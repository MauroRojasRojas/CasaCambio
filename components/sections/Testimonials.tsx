'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
	{
		id: 1,
		nombre: 'María Fernanda Salazar',
		texto:
			'Cambié dólares para un viaje y me sorprendió lo rápido que fue todo. El tipo de cambio fue mejor que en cualquier banco y me llegó el dinero en minutos. Totalmente recomendado.',
		foto: '/assets/rostro1.jpg',
	},
	{
		id: 2,
		nombre: 'Ricardo Méndez',
		texto:
			'Uso Dollariza desde hace meses para mis pagos del negocio. Es seguro, confiable y siempre encuentro un tipo de cambio competitivo. El servicio al cliente también es excelente.',
		foto: '/assets/rostro2.jpg',
	},
	{
		id: 3,
		nombre: 'Valeria Ortiz',
		texto:
			'Mi experiencia fue muy buena. Me gusta que la plataforma sea simple y clara, sin pasos innecesarios. El dinero llegó súper rápido y el proceso fue seguro.',
		foto: '/assets/rostro3.jpg',
	},
	{
		id: 4,
		nombre: 'Jorge Ramírez',
		texto:
			'He probado varias casas de cambio online, pero Dollariza es la que me generó más confianza. Todo el proceso es transparente y se nota que cuidan mucho la seguridad.',
		foto: '/assets/rostro4.jpg',
	},
	{
		id: 5,
		nombre: 'Carolina Rivas',
		texto: 'Cambio constantemente por motivos de trabajo y Dollariza me ha facilitado la vida. Es rápido, seguro y los tipos de cambio son realmente buenos.',
		foto: '/assets/rostro5.jpg',
	},
	{
		id: 6,
		nombre: 'Sebastián Aguilar',
		texto: 'Me llegó el depósito en menos de 10 minutos. Nunca pensé que cambiar dinero online fuera tan sencillo. Sin dudas seguiré usándolo.',
		foto: '/assets/rostro6.jpg',
	},
];

export default function Testimonials() {
	const [isPaused, setIsPaused] = useState(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [translateX, setTranslateX] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<number | null>(null);
	const lastTimeRef = useRef<number>(0);

	// Duplicamos los testimonials para crear el efecto infinito
	const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

	// Velocidad de movimiento (píxeles por segundo)
	const speed = 50;

	// Ancho de cada card + gap
	const getCardWidth = () => {
		if (typeof window === 'undefined') return 380;
		if (window.innerWidth < 640) return 280 + 16; // w-[280px] + gap-4
		if (window.innerWidth < 768) return 320 + 24; // w-[320px] + gap-6
		return 380 + 32; // w-[380px] + gap-8
	};

	// Animación continua
	useEffect(() => {
		if (isPaused) {
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
	}, [isPaused]);

	// Función para centrar una card
	const centerCard = (idx: number) => {
		if (!containerRef.current) return;

		const containerWidth = containerRef.current.offsetWidth;
		const cardWidth = getCardWidth();
		const cardCenter = idx * cardWidth + cardWidth / 2;
		const targetX = -(cardCenter - containerWidth / 2);

		// Animación suave hacia el centro
		const startX = translateX;
		const distance = targetX - startX;
		const duration = 800; // milisegundos
		const startTime = performance.now();

		const animateToCenter = (timestamp: number) => {
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / duration, 1);
			// Easing function para suavizar
			const easeOut = 1 - Math.pow(1 - progress, 3);

			setTranslateX(startX + distance * easeOut);

			if (progress < 1) {
				requestAnimationFrame(animateToCenter);
			}
		};

		requestAnimationFrame(animateToCenter);
	};

	const handleCardClick = (idx: number, testimonioId: number) => {
		if (selectedId === testimonioId) {
			// Si ya está seleccionado, reanudar
			setIsPaused(false);
			setSelectedId(null);
			lastTimeRef.current = 0;
		} else {
			// Pausar y centrar
			setIsPaused(true);
			setSelectedId(testimonioId);
			centerCard(idx);
		}
	};

	return (
		<section className='py-12 md:py-16 lg:py-20 4k:py-24 bg-[#FFCE01] overflow-hidden'>
			<h2 className='text-center text-2xl sm:text-3xl md:text-4xl 4k:text-5xl font-bold text-[#02254A] mb-8 md:mb-12 px-4'>
				Nuestros <span className='text-[#02254A]/90'>clientes</span>
			</h2>

			{/* Contenedor del carrusel */}
			<div className='relative' ref={containerRef}>
				{/* Gradientes de fade en los bordes */}
				<div className='absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-linear-to-r from-yellow-200 to-transparent z-10 pointer-events-none' />
				<div className='absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-linear-to-l from-yellow-200 to-transparent z-10 pointer-events-none' />

				{/* Carrusel animado */}
				<div
					ref={carouselRef}
					className='flex gap-4 sm:gap-6 md:gap-8'
					style={{
						width: 'max-content',
						transform: `translateX(${translateX}px)`,
					}}
				>
					{duplicatedTestimonials.map((testimonial, idx) => (
						<div
							key={`${testimonial.id}-${idx}`}
							onClick={() => handleCardClick(idx, testimonial.id)}
							className={`bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 w-[280px] sm:w-[320px] md:w-[380px] shrink-0 ${
								selectedId === testimonial.id ? 'ring-4 ring-[#02254A] scale-105' : ''
							}`}
						>
							<div className='text-red-600 text-2xl sm:text-3xl md:text-4xl mb-1'>"</div>

							<p className='text-slate-700 leading-relaxed mb-4 text-xs sm:text-sm line-clamp-4'>{testimonial.texto}</p>

							<div className='flex items-center gap-3'>
								<Image src={testimonial.foto} width={48} height={48} className='rounded-full object-cover shadow w-10 h-10 sm:w-12 sm:h-12' alt={testimonial.nombre} />
								<span className='font-bold text-[#02254A] text-sm sm:text-base'>{testimonial.nombre}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Indicador de pausa */}
			<p className='text-center text-xs text-slate-500 mt-16 px-4'>
				{isPaused ? 'Haz clic en el testimonio seleccionado para continuar' : 'Haz clic en un testimonio para detenerlo'}
			</p>
		</section>
	);
}
