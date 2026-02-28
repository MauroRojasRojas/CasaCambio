'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { getTasaActual, TasaCambio } from '@/lib/services/tasaCambioService';

interface ConverterCardProps {
	onComplete?: (isComplete: boolean) => void;
	showButton?: boolean;
	onButtonClick?: () => void;
}

export default function ConverterCard({ onComplete, showButton = true, onButtonClick }: ConverterCardProps) {
	const router = useRouter();
	const { user } = useAuth();

	// Estados para las tasas dinámicas
	const [tasas, setTasas] = useState<TasaCambio | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [mode, setMode] = useState<'compra' | 'venta'>('venta');
	const [rate, setRate] = useState(0);
	const [fromCurrency, setFromCurrency] = useState('PEN');
	const [toCurrency, setToCurrency] = useState('USD');

	// ✅ amount = "Tú envías" (valor real)
	// ✅ amountInput = lo que teclea el usuario en "Tú envías"
	const [amount, setAmount] = useState(350);
	const [amountInput, setAmountInput] = useState('350');

	// ✅ converted = "Tú recibes" (valor real)
	// ✅ receivedInput = lo que teclea el usuario en "Tú recibes"
	const [converted, setConverted] = useState(0);
	const [receivedInput, setReceivedInput] = useState('0.00');

	const [rotating, setRotating] = useState(false);

	// evita loops cuando actualizamos inputs desde efectos
	const syncingRef = useRef(false);

	// refs para interval
	const modeRef = useRef(mode);
	useEffect(() => {
		modeRef.current = mode;
	}, [mode]);

	// ✅ mínimos: COMPRA => USD 100 (envías USD) | VENTA => S/ 350 (envías PEN)
	const minSendAmount = mode === 'compra' ? 100 : 350;

	// helper: clamp y redondeo
	const toNum = (s: string) => {
		const n = Number(s);
		return Number.isFinite(n) ? n : NaN;
	};

	const round2 = (n: number) => Math.round(n * 100) / 100;

	// =========================
	// Cargar tasas
	// =========================
	const cargarTasas = async () => {
		try {
			const tasasActuales = await getTasaActual();
			setTasas(tasasActuales);
			setError(null);

			const currentMode = modeRef.current;
			const nuevaRate = currentMode === 'compra' ? tasasActuales.tasa_compra_usd : tasasActuales.tasa_venta_usd;
			setRate(nuevaRate);

			setLoading(false);
		} catch (err) {
			console.error('Error al cargar tasas:', err);
			setError('Error al cargar las tasas de cambio');
			setLoading(false);
		}
	};

	// Cargar tasas al montar + refresh cada 10 min
	useEffect(() => {
		cargarTasas();

		const interval = setInterval(() => {
			cargarTasas();
		}, 600000);

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// =========================
	// Restaurar desde localStorage (AUTOCARGA CORRECTA)
	// =========================
	useEffect(() => {
		if (!tasas) return;

		const savedSentAmount = localStorage.getItem('converterSentAmount');
		const savedSentCurrency = localStorage.getItem('converterSentCurrency');

		let nextMode: 'compra' | 'venta' = 'venta';
		if (savedSentCurrency === 'USD') nextMode = 'compra';

		setMode(nextMode);

		if (nextMode === 'compra') {
			setFromCurrency('USD');
			setToCurrency('PEN');
			setRate(tasas.tasa_compra_usd);
		} else {
			setFromCurrency('PEN');
			setToCurrency('USD');
			setRate(tasas.tasa_venta_usd);
		}

		const raw = Number(savedSentAmount ?? '');
		const base = Number.isFinite(raw) ? raw : nextMode === 'compra' ? 100 : 350;
		const min = nextMode === 'compra' ? 100 : 350;
		const fixed = Math.max(min, base);

		setAmount(fixed);
		setAmountInput(String(fixed));

		onComplete?.(true);
	}, [tasas, onComplete]);

	// =========================
	// Recalcular convertido SIEMPRE con amount/rate/mode
	// y sincronizar inputs visibles (sin loops)
	// =========================
	useEffect(() => {
		if (!rate) return;

		const newConverted = mode === 'compra' ? amount * rate : amount / rate;

		setConverted(newConverted);

		// sincroniza el input de "tú recibes" solo si no está siendo editado manualmente
		if (!syncingRef.current) {
			setReceivedInput(Number.isFinite(newConverted) ? round2(newConverted).toFixed(2) : '0.00');
		}
	}, [amount, mode, rate]);

	// =========================
	// Si cambia el modo, asegurar mínimo en "envías"
	// =========================
	useEffect(() => {
		if (amount < minSendAmount) {
			setAmount(minSendAmount);
			setAmountInput(String(minSendAmount));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	// =========================
	// Guardar en localStorage
	// =========================
	useEffect(() => {
		localStorage.setItem('converterSentAmount', amount.toString());
		localStorage.setItem('converterSentCurrency', fromCurrency);
		localStorage.setItem('converterReceivedAmount', converted.toString());
		localStorage.setItem('converterReceivedCurrency', toCurrency);
	}, [amount, fromCurrency, converted, toCurrency]);

	// =========================
	// UI Actions
	// =========================
	const changeMode = (newMode: 'compra' | 'venta') => {
		if (!tasas) return;

		setMode(newMode);

		setRotating(true);
		setTimeout(() => setRotating(false), 400);

		// importante: al cambiar modo, el mínimo cambia; amount se ajusta en useEffect([mode])
		if (newMode === 'compra') {
			setRate(tasas.tasa_compra_usd);
			setFromCurrency('USD');
			setToCurrency('PEN');
		} else {
			setRate(tasas.tasa_venta_usd);
			setFromCurrency('PEN');
			setToCurrency('USD');
		}
	};

	const defaultOnButtonClick = () => {
		localStorage.setItem('converterSentAmount', amount.toString());
		localStorage.setItem('converterSentCurrency', fromCurrency);
		localStorage.setItem('converterReceivedAmount', converted.toString());
		localStorage.setItem('converterReceivedCurrency', toCurrency);

		if (user) router.push('/admin/operacion');
		else router.push('/login');
	};

	const handleButtonClick = onButtonClick || defaultOnButtonClick;

	// =========================
	// INPUT "TÚ ENVÍAS" (libre, clamp en blur/enter)
	// =========================
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmountInput(e.target.value);
	};

	const applyAmountFromInput = () => {
		const raw = toNum(amountInput);
		const val = Number.isFinite(raw) ? raw : minSendAmount;
		const fixed = Math.max(minSendAmount, val);

		setAmount(fixed);
		setAmountInput(String(fixed));
		// al setAmount, el useEffect recalcula converted y sync de receivedInput
	};

	// =========================
	// INPUT "TÚ RECIBES" (editable, recalcula "envías" respetando mínimo)
	// =========================
	const handleReceivedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// marcamos que estamos editando manualmente para que el useEffect no pise el input
		syncingRef.current = true;
		setReceivedInput(e.target.value);
	};

	const applyReceivedFromInput = () => {
		if (!rate) {
			syncingRef.current = false;
			setReceivedInput(Number.isFinite(converted) ? round2(converted).toFixed(2) : '0.00');
			return;
		}

		const rawRecv = toNum(receivedInput);
		const recv = Number.isFinite(rawRecv) ? rawRecv : NaN;

		// si no es válido, restaura
		if (!Number.isFinite(recv)) {
			syncingRef.current = false;
			setReceivedInput(Number.isFinite(converted) ? round2(converted).toFixed(2) : '0.00');
			return;
		}

		// Queremos que escribiendo "recibes" se ajuste "envías"
		// mode === 'venta' : envías PEN y recibes USD => recv = USD => envias = recv * rate
		// mode === 'compra': envías USD y recibes PEN => recv = PEN => envias = recv / rate
		let newSend = 0;
		if (mode === 'venta') {
			newSend = recv * rate;
		} else {
			newSend = recv / rate;
		}

		// aplicar mínimo de "envías"
		const fixedSend = Math.max(minSendAmount, newSend);

		// setea envías (y su input), esto dispara recálculo de converted
		setAmount(fixedSend);
		setAmountInput(String(Math.round(fixedSend * 100) / 100)); // opcional: 2 dec
		// el useEffect recalcula converted y como syncingRef estaba true, NO pisa receivedInput todavía
		// así que aquí lo sincronizamos al valor final resultante
		const finalConverted = mode === 'compra' ? fixedSend * rate : fixedSend / rate;
		setConverted(finalConverted);
		setReceivedInput(round2(finalConverted).toFixed(2));

		syncingRef.current = false;
	};

	const swapCurrencies = () => {
		if (!tasas) return;

		setRotating(true);
		setTimeout(() => setRotating(false), 400);

		// swap monedas
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);

		// toggle modo y tasa
		const newMode = mode === 'compra' ? 'venta' : 'compra';
		const newRate = mode === 'compra' ? tasas.tasa_venta_usd : tasas.tasa_compra_usd;

		setMode(newMode);
		setRate(newRate);

		// ajustar mínimo del nuevo modo
		const newMin = newMode === 'compra' ? 100 : 350;
		if (amount < newMin) {
			setAmount(newMin);
			setAmountInput(String(newMin));
		}

		// reset flag de edición de received
		syncingRef.current = false;
	};

	// =========================
	// UI States
	// =========================
	if (loading) {
		return (
			<div className='w-full rounded-3xl overflow-hidden shadow-xl bg-white p-8'>
				<div className='flex justify-center items-center h-64'>
					<div className='text-slate-500'>Cargando tasas de cambio...</div>
				</div>
			</div>
		);
	}

	if (error || !tasas) {
		return (
			<div className='w-full rounded-3xl overflow-hidden shadow-xl bg-white p-8'>
				<div className='flex justify-center items-center h-64'>
					<div className='text-red-500'>{error || 'Error al cargar tasas'}</div>
				</div>
			</div>
		);
	}

	return (
		<div className='w-full rounded-3xl overflow-hidden shadow-xl bg-white'>
			{/* HEADER */}
			<div className='bg-linear-to-b from-[#B63A42] to-[#3A475F] p-3 text-center'>
				<h2 className='text-white text-xl font-bold'>Realiza tu conversión</h2>
			</div>

			{/* COMPRA / VENTA */}
			<div className='flex justify-center gap-3 bg-white px-4 pt-3 text-sm font-semibold'>
				<button
					onClick={() => changeMode('compra')}
					className={`px-4 py-1 rounded-lg cursor-pointer border transition ${
						mode === 'compra' ? 'bg-[#0053A4] text-white' : 'bg-gray-50 text-slate-600'
					}`}
				>
					Compra: {tasas.tasa_compra_usd.toFixed(4)}
				</button>

				<button
					onClick={() => changeMode('venta')}
					className={`px-4 py-1 cursor-pointer rounded-lg border transition ${
						mode === 'venta' ? 'bg-[#0053A4] text-white' : 'bg-gray-50 text-slate-600'
					}`}
				>
					Venta: {tasas.tasa_venta_usd.toFixed(4)}
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
							inputMode='decimal'
							min={minSendAmount}
							max={999999999}
							value={amountInput}
							onChange={handleAmountChange}
							onBlur={applyAmountFromInput}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									applyAmountFromInput();
									(e.currentTarget as HTMLInputElement).blur();
								}
								if (e.key === 'Escape') {
									setAmountInput(String(amount));
									(e.currentTarget as HTMLInputElement).blur();
								}
							}}
							className='w-full bg-transparent text-xl font-bold text-[#11334D] outline-none'
						/>

						<span className='ml-4 mr-2 text-lg font-bold text-zinc-900'>{fromCurrency}</span>

						<Image
							src={`/icons/flags/${fromCurrency.toLowerCase()}.svg`}
							alt={`Bandera de ${fromCurrency}`}
							height={24}
							width={30}
							style={{ width: 'auto' }}
						/>
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

				{/* TÚ RECIBES (EDITABLE) */}
				<div>
					<label className='text-xs text-slate-500 font-semibold'>Tú recibes</label>

					<div className='mt-1 flex items-center rounded-xl border border-slate-300 px-2 py-1 shadow-sm'>
						<input
							type='number'
							inputMode='decimal'
							value={receivedInput}
							onChange={handleReceivedChange}
							onBlur={applyReceivedFromInput}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									applyReceivedFromInput();
									(e.currentTarget as HTMLInputElement).blur();
								}
								if (e.key === 'Escape') {
									syncingRef.current = false;
									setReceivedInput(Number.isFinite(converted) ? round2(converted).toFixed(2) : '0.00');
									(e.currentTarget as HTMLInputElement).blur();
								}
							}}
							className='w-full bg-transparent text-xl font-bold text-[#11334D] outline-none'
						/>

						<span className='ml-4 mr-2 text-lg font-bold text-zinc-900'>{toCurrency}</span>

						<Image
							src={`/icons/flags/${toCurrency.toLowerCase()}.svg`}
							alt={`Bandera de ${toCurrency}`}
							height={24}
							width={30}
							style={{ height: 'auto' }}
						/>
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
					<span className='text-[10px] text-slate-400 text-center'>
						* Monto mínimo: {mode === 'compra' ? 'USD 100' : 'S/ 350'} (en “Tú envías”).
					</span>
				</div>
			</div>

			<div className='bg-white px-4 pt-1 pb-2 mb-4'>
				<div className='flex justify-center'>
					<Image
						src='/icons/sbs.png'
						alt='SBS'
						width={120}
						height={40}
						className='object-contain'
						style={{ height: 'auto' }}
					/>
				</div>
			</div>
		</div>
	);
}