'use client';

import * as motion from 'motion/react-client';
import type { Variants } from 'motion/react';

export default function ScrollAlertsHorizontal() {
	const items = [
		{ title: 'Accede', text: 'A todos los beneficios que tenemos para ti.' },
		{
			title: 'Ahorra Más',
			text: 'Dollariza te ayuda a obtener siempre el mejor precio para tus operaciones.',
		},
		{ title: 'Automatiza tu Cambio', text: 'Configura metas y deja que Dollariza trabaje por ti.' },
		{
			title: 'Opera Seguro',
			text: 'Transacciones protegidas y respaldadas por entidades reguladas.',
		},
	];

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-8 lg:gap-12 4k:gap-16 justify-items-center py-12 md:py-16 lg:py-20 4k:py-24 px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16 max-w-[1240px] mx-auto'>
			{items.map((item, i) => (
				<Card key={i} i={i} title={item.title} text={item.text} />
			))}
		</div>
	);
}

interface CardProps {
	title: string;
	text: string;
	i: number;
}

function Card({ title, text, i }: CardProps) {
	return (
		<motion.div className={`card-container-${i} mb-4 md:-mb-10`} style={cardContainer} initial='offscreen' whileInView='onscreen' viewport={{ amount: 0.5 }}>
			<div style={{ ...splash, background: '#092B47' }} />

			<motion.div style={card} variants={cardVariants} className='card w-56 sm:w-60 md:w-64 lg:w-72'>
				<h3 className='text-lg sm:text-xl md:text-2xl font-extrabold text-[#02254A] mb-2'>{title}</h3>
				<p className='text-sm text-[#4A5568] leading-relaxed'>{text}</p>
			</motion.div>
		</motion.div>
	);
}

const cardVariants: Variants = {
	offscreen: { y: 200, opacity: 0 },
	onscreen: {
		y: 0,
		opacity: 1,
		rotate: -6,
		transition: { type: 'spring', bounce: 0.4, duration: 0.9 },
	},
};

const cardContainer: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'relative',
	paddingTop: 20,
	paddingBottom: 20,
};

const splash: React.CSSProperties = {
	position: 'absolute',
	top: -50,
	left: 0,
	right: 0,
	bottom: 0,
	clipPath:
		'path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")',
};

const card: React.CSSProperties = {
  minHeight: 220,          // antes 320
  borderRadius: 20,        // antes 25 (opcional)
  background: '#ffffff',
  boxShadow: '0 0 4px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.08)',
  transformOrigin: '10% 60%',
  padding: '16px 14px',    // antes 20px 15px
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  zIndex: 10,
  textAlign: 'center',
};
