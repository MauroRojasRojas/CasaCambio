'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

interface ConverterCardProps {
	onComplete?: (isComplete: boolean) => void;
	showButton?: boolean;
	onButtonClick?: () => void;
}

export default function ConverterCard({ onComplete, showButton = true, onButtonClick }: ConverterCardProps) {
	const router = useRouter();
	const { user } = useAuth();
	const compra = 3.3465;
	const venta = 3.3765;

	const [mode, setMode] = useState<'compra' | 'venta'>('venta');
	const [rate, setRate] = useState(venta);
	const [fromCurrency, setFromCurrency] = useState('PEN');
	const [toCurrency, setToCurrency] = useState('USD');
	const [amount, setAmount] = useState(100);
	const [converted, setConverted] = useState(100 * venta);
	const [rotating, setRotating] = useState(false);

	// Cargar valores del localStorage al montar el componente
	useEffect(() => {
		const savedSentAmount = localStorage.getItem('converterSentAmount');
		const savedSentCurrency = localStorage.getItem('converterSentCurrency');
		const savedReceivedAmount = localStorage.getItem('converterReceivedAmount');
		const savedReceivedCurrency = localStorage.getItem('converterReceivedCurrency');

		if (savedSentAmount && savedSentCurrency && savedReceivedAmount && savedReceivedCurrency) {
			setAmount(Number(savedSentAmount));
			setFromCurrency(savedSentCurrency);
			setConverted(Number(savedReceivedAmount));
			setToCurrency(savedReceivedCurrency);
			
			const isBuyMode = savedSentCurrency === 'USD';
			setMode(isBuyMode ? 'compra' : 'venta');
			setRate(isBuyMode ? compra : venta);
		}
		
		if (onComplete) {
			onComplete(true);
		}
	}, [onComplete, compra, venta]);

	const changeMode = (newMode: 'compra' | 'venta') => {
		setMode(newMode);

		setRotating(true);
		setTimeout(() => setRotating(false), 400);

		if (newMode === 'compra') {
			setRate(compra);
			setFromCurrency('USD');
			setToCurrency('PEN');
			const converted = amount * compra;
			setConverted(converted);
			// Guardar en localStorage
			localStorage.setItem('converterSentAmount', amount.toString());
			localStorage.setItem('converterSentCurrency', 'USD');
			localStorage.setItem('converterReceivedAmount', converted.toString());
			localStorage.setItem('converterReceivedCurrency', 'PEN');
		} else {
			setRate(venta);
			setFromCurrency('PEN');
			setToCurrency('USD');
			const converted = amount / venta;
			setConverted(converted);
			// Guardar en localStorage
			localStorage.setItem('converterSentAmount', amount.toString());
			localStorage.setItem('converterSentCurrency', 'PEN');
			localStorage.setItem('converterReceivedAmount', converted.toString());
			localStorage.setItem('converterReceivedCurrency', 'USD');
		}
	};

	const defaultOnButtonClick = () => {
		// Guardar estado en localStorage
		localStorage.setItem('converterSentAmount', amount.toString());
		localStorage.setItem('converterSentCurrency', fromCurrency);
		localStorage.setItem('converterReceivedAmount', converted.toString());
		localStorage.setItem('converterReceivedCurrency', toCurrency);
		if (user) {
			router.push('/operacion');
		} else {
			router.push('/login');
		}
	};

	const handleButtonClick = onButtonClick || defaultOnButtonClick;

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = Math.max(100, Number(e.target.value));
		setAmount(val);

		let converted = 0;
		if (mode === 'compra') {
			converted = val * rate;
		} else {
			converted = val / rate;
		}
		setConverted(converted);

		// Guardar en localStorage
		localStorage.setItem('converterSentAmount', val.toString());
		localStorage.setItem('converterSentCurrency', fromCurrency);
		localStorage.setItem('converterReceivedAmount', converted.toString());
		localStorage.setItem('converterReceivedCurrency', toCurrency);
	};

	const swapCurrencies = () => {
		setRotating(true);
		setTimeout(() => setRotating(false), 400);

		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);

		let converted = 0;
		const newMode = mode === 'compra' ? 'venta' : 'compra';
		const newRate = mode === 'compra' ? venta : compra;
		
		if (newMode === 'compra') {
			converted = amount * newRate;
		} else {
			converted = amount / newRate;
		}
		setConverted(converted);

		setMode(newMode);
		setRate(newRate);

		// Guardar en localStorage
		localStorage.setItem('converterSentAmount', amount.toString());
		localStorage.setItem('converterSentCurrency', toCurrency);
		localStorage.setItem('converterReceivedAmount', converted.toString());
		localStorage.setItem('converterReceivedCurrency', fromCurrency);
	};

	return (
		<div className='w-full rounded-3xl overflow-hidden shadow-xl'>
			{/* HEADER */}
			<div className='bg-linear-to-b from-[#B63A42] to-[#3A475F] p-3 text-center'>
				<h2 className='text-white text-xl font-bold'>Realiza tu conversión</h2>
			</div>

			{/* COMPRA / VENTA */}
			<div className='flex justify-center gap-3 bg-white px-4 pt-3 text-sm font-semibold'>
				<button
					onClick={() => changeMode('compra')}
					className={`px-4 py-1 rounded-lg cursor-pointer border transition ${mode === 'compra' ? 'bg-[#0053A4] text-white' : 'bg-gray-50 text-slate-600'}`}
				>
					Compra: {compra}
				</button>

				<button
					onClick={() => changeMode('venta')}
					className={`px-4 py-1 cursor-pointer rounded-lg border transition ${mode === 'venta' ? 'bg-[#0053A4] text-white' : 'bg-gray-50 text-slate-600'}`}
				>
					Venta: {venta}
				</button>
			</div>

			{/* CUERPO */}
			<div className='bg-white p-4 relative space-y-4'>
				{/* TÚ ENVÍAS */}
				<div>
					<label className='text-xs text-slate-500 font-semibold'>Tú envías</label>

					<div className='mt-1 flex items-center rounded-xl border border-slate-300 px-2 py-1 shadow-sm'>
						<input
							type='number'
							min={100}
							value={amount}
							onChange={handleAmountChange}
							className='w-full bg-transparent text-xl font-bold text-[#11334D] outline-none'
						/>

						<span className='ml-4 mr-2 text-lg font-bold text-zinc-900'>{fromCurrency}</span>

						<Image src={`/icons/flags/${fromCurrency.toLowerCase()}.svg`} alt={`Bandera de ${fromCurrency}`} height={24} width={30} style={{ width: 'auto' }} />
					</div>
				</div>

				{/* FLECHA */}
				<button
					onClick={swapCurrencies}
					className='
            absolute left-[calc(50%-20px)] top-[95px]
            w-[55px] h-[55px] rounded-full shadow-lg flex items-center justify-center
            cursor-pointer
            bg-[linear-gradient(145deg,#c1122f,#02254A)]
            transition-transform duration-500
          '
				>
					<Image
						src='/icons/arrows.png'
						alt='swap'
						width={26}
						height={26}
						className={`w-[26px] h-[26px] transition-transform duration-500 ${rotating ? 'rotate-180' : ''}`}
					/>
				</button>

				{/* TÚ RECIBES */}
				<div>
					<label className='text-xs text-slate-500 font-semibold'>Tú recibes</label>

					<div className='mt-1 flex items-center rounded-xl border border-slate-300 px-2 py-1 shadow-sm'>
						<input type='text' readOnly value={converted.toFixed(2)} className='w-full bg-transparent text-xl font-bold text-[#11334D] outline-none' />

						<span className='ml-4 mr-2 text-lg font-bold text-zinc-900'>{toCurrency}</span>

						<Image src={`/icons/flags/${toCurrency.toLowerCase()}.svg`} alt={`Bandera de ${toCurrency}`} height={24} width={30} style={{ height: 'auto' }} />
					</div>
				</div>

				{/* BOTÓN */}
				{showButton && (
					<button
						onClick={handleButtonClick}
						className='w-full bg-linear-to-b from-[#B63A42] to-[#3A475F] text-[#ffffff] py-2 rounded-xl text-base font-semibold shadow cursor-pointer'
					>
						Iniciar operación
					</button>
				)}

				<div className='flex flex-col'>
					<span className='text-[10px] text-slate-400 text-center'>* Las tasas pueden variar según horario o banco.</span>
					<span className='text-[10px] text-slate-400 text-center'>* Monto mínimo de conversión: 100 PEN o 100 USD.</span>
				</div>
			</div>
			<div className='bg-white px-4 pt-1 pb-2'>
				<p className='text-xs text-slate-500 font-semibold text-center'>Registrados</p>
				<div className='flex justify-center mt-1'>
					<Image src='/icons/sbs.png' alt='SBS' width={120} height={40} className='object-contain' />
				</div>
			</div>
		</div>
	);
}
