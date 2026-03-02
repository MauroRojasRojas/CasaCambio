'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
	getTasaActual,
	getTasasDesdeInicioAno,
	TasaCambio,
	TasaHistoricaDesdeInicioAno,
	calcularMinutosDesdeActualizacion,
} from '@/lib/services/tasaCambioService';
import { useRouter } from 'next/navigation';

const ChartComponent = dynamic(() => import('./ChartComponent'), { ssr: false });

// Nombres de meses en español
const MESES = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
];

export default function LiveExchangeRate() {
	const router = useRouter();

	const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');
	const [tasas, setTasas] = useState<TasaCambio | null>(null);
	const [tasasHistoricas, setTasasHistoricas] = useState<TasaHistoricaDesdeInicioAno[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingHistorico, setLoadingHistorico] = useState(true);
	const [minutosActualizacion, setMinutosActualizacion] = useState(0);

	// ⚠️ Evitar hydration mismatch: no usar new Date() directo en render
	const [now, setNow] = useState<Date | null>(null);

	// Nota: estos defaults con new Date() NO rompen tanto como usar new Date() en JSX,
	// pero igual es más seguro inicializarlos una vez en cliente.
	const [selectedMonth, setSelectedMonth] = useState<number>(() => new Date().getMonth()); // 0-11
	const [selectedYear, setSelectedYear] = useState<number>(() => new Date().getFullYear());

	// Función para cargar las tasas históricas desde inicio de año
	const cargarTasasHistoricas = async () => {
		try {
			setLoadingHistorico(true);
			const tasasDesdeAPI = await getTasasDesdeInicioAno();
			setTasasHistoricas(tasasDesdeAPI);
			setLoadingHistorico(false);
		} catch (err) {
			console.error('Error al cargar tasas históricas:', err);
			setLoadingHistorico(false);
		}
	};

	// Función para cargar la tasa actual
	const cargarTasaActual = async () => {
		try {
			const tasaActual = await getTasaActual();
			setTasas(tasaActual);
			setMinutosActualizacion(calcularMinutosDesdeActualizacion(tasaActual.fecha_hora));
			setLoading(false);
		} catch (err) {
			console.error('Error al cargar tasa actual:', err);
			setLoading(false);
		}
	};

	// Cargar tasas al montar el componente
	useEffect(() => {
		// Fecha/hora solo en cliente para evitar mismatch
		setNow(new Date());
		const nowInterval = setInterval(() => setNow(new Date()), 60_000);

		cargarTasasHistoricas();
		cargarTasaActual();

		// Actualizar la tasa actual cada 10 minutos (600000 ms)
		const interval = setInterval(() => {
			cargarTasaActual();
		}, 600000);

		return () => {
			clearInterval(interval);
			clearInterval(nowInterval);
		};
	}, []);

	// Actualizar el contador de minutos cada minuto
	useEffect(() => {
		if (!tasas) return;

		const interval = setInterval(() => {
			setMinutosActualizacion(calcularMinutosDesdeActualizacion(tasas.fecha_hora));
		}, 60000);

		return () => clearInterval(interval);
	}, [tasas]);

	// Obtener meses disponibles en los datos
	const mesesDisponibles = useMemo(() => {
		if (tasasHistoricas.length === 0) return [];

		const mesesSet = new Set<string>();
		tasasHistoricas.forEach((tasa) => {
			const [year, month] = tasa.fecha.split('-');
			mesesSet.add(`${year}-${month}`);
		});

		return Array.from(mesesSet)
			.sort()
			.map((fechaStr) => {
				const [year, month] = fechaStr.split('-').map(Number);
				return { year, month: month - 1, label: `${MESES[month - 1]} ${year}` };
			});
	}, [tasasHistoricas]);

	// Función auxiliar para parsear fecha string YYYY-MM-DD a Date
	const parsearFecha = (fechaStr: string): Date => {
		const [year, month, day] = fechaStr.split('-').map(Number);
		return new Date(year, month - 1, day);
	};

	// Obtener número de semana del mes (1-5)
	const getWeekOfMonth = (date: Date): number => {
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		const firstDayOfWeek = firstDay.getDay(); // 0 = domingo
		const dayOfMonth = date.getDate();
		return Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
	};

	// Filtrar datos según el período seleccionado
	const getData = () => {
		if (tasasHistoricas.length === 0) return [];

		// Ordenar tasas por fecha ascendente
		const tasasOrdenadas = [...tasasHistoricas].sort((a, b) => a.fecha.localeCompare(b.fecha));

		switch (period) {
			case 'day': {
				// Mostrar todos los días del mes seleccionado
				const mesStr = String(selectedMonth + 1).padStart(2, '0');
				const prefijo = `${selectedYear}-${mesStr}`;

				return tasasOrdenadas
					.filter((tasa) => tasa.fecha.startsWith(prefijo))
					.map((tasa) => ({
						date: tasa.fecha,
						rate: tasa.tasa_usd_pen,
					}));
			}

			case 'week': {
				// Agrupar por semana del mes seleccionado
				const mesStr = String(selectedMonth + 1).padStart(2, '0');
				const prefijo = `${selectedYear}-${mesStr}`;

				const tasasDelMes = tasasOrdenadas.filter((tasa) => tasa.fecha.startsWith(prefijo));

				// Agrupar por semana
				const semanas: { [key: number]: { suma: number; count: number; fechaInicio: string; fechaFin: string } } = {};

				tasasDelMes.forEach((tasa) => {
					const fecha = parsearFecha(tasa.fecha);
					const semana = getWeekOfMonth(fecha);

					if (!semanas[semana]) {
						semanas[semana] = { suma: 0, count: 0, fechaInicio: tasa.fecha, fechaFin: tasa.fecha };
					}
					semanas[semana].suma += tasa.tasa_usd_pen;
					semanas[semana].count++;
					semanas[semana].fechaFin = tasa.fecha;
				});

				// Convertir a array para el gráfico
				return Object.entries(semanas)
					.sort(([a], [b]) => Number(a) - Number(b))
					.map(([semana, datos]) => ({
						date: `Sem ${semana}`,
						rate: datos.suma / datos.count,
					}));
			}

			case 'month': {
				// Promedio por mes de todo el año
				const promediosPorMes: { [key: string]: { suma: number; count: number } } = {};

				tasasOrdenadas.forEach((tasa) => {
					const [year, month] = tasa.fecha.split('-');
					const key = `${year}-${month}`;

					if (!promediosPorMes[key]) {
						promediosPorMes[key] = { suma: 0, count: 0 };
					}
					promediosPorMes[key].suma += tasa.tasa_usd_pen;
					promediosPorMes[key].count++;
				});

				// Convertir a array ordenado
				return Object.entries(promediosPorMes)
					.sort(([a], [b]) => a.localeCompare(b))
					.map(([key, datos]) => {
						const [_year, month] = key.split('-').map(Number);
						return {
							date: MESES[month - 1].substring(0, 3), // Ene, Feb, Mar...
							rate: datos.suma / datos.count, // Promedio real (suma / días con datos)
						};
					});
			}

			default:
				return [];
		}
	};

	const goRegister = () => {
		router.push('/registro');
	};

	return (
		<section className='py-12 md:py-16 lg:py-20 4k:py-24 px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16'>
			<h2 className='text-center text-2xl sm:text-3xl md:text-4xl 4k:text-5xl font-bold text-[#02254A] mb-2'>
				Sigue el tipo de <span className='text-[#02254A]/90'>cambio en vivo</span>
			</h2>

			<p className='text-center text-slate-500 mb-6 md:mb-10 text-xs sm:text-sm' suppressHydrationWarning>
				Última actualización:{' '}
				{now ? (
					<>
						{now.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })},{' '}
						{now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} hrs
					</>
				) : (
					'...'
				)}
			</p>

			<div className='grid grid-cols-1 lg:grid-cols-2 max-w-[1240px] mx-auto gap-6 md:gap-8 lg:gap-10'>
				{/* Tabla */}
				<div className='bg-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-md'>
					<div className='flex flex-row justify-between items-center gap-2 mb-4'>
						<h3 className='text-base sm:text-lg font-semibold text-slate-700'>Cambio online</h3>
						<button
							onClick={goRegister}
							className='bg-yellow-400 text-[#02254A] font-semibold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-xl shadow text-xs sm:text-sm whitespace-nowrap cursor-pointer'
						>
							Regístrate
						</button>
					</div>

					<p className='text-justify text-slate-600 text-xs sm:text-sm my-4 sm:my-6'>
						En <strong>Dollariza</strong>, ofrecemos las mejores tasas de cambio con total transparencia y seguridad. ¡Compara nuestras tarifas y verás la diferencia
						frente a otras casas de cambio!
					</p>

					<div className='overflow-x-auto'>
						<table className='w-full text-xs sm:text-sm rounded-xl overflow-hidden min-w-[280px]'>
							<thead>
								<tr className='bg-[#02254A] text-white rounded-xl'>
									<th className='px-2 sm:px-4 py-2 sm:py-3 text-left font-bold'>Proveedor</th>
									<th className='px-2 sm:px-4 py-2 sm:py-3 text-center'>Compra</th>
									<th className='px-2 sm:px-4 py-2 sm:py-3 text-center'>Venta</th>
								</tr>
							</thead>
							<tbody>
								<tr className='border-b'>
									<td className='px-2 sm:px-4 py-2 font-semibold'>Dollariza</td>
									<td className='px-2 sm:px-4 py-2 text-center'>{tasas ? tasas.tasa_compra_usd.toFixed(3) : '...'}</td>
									<td className='px-2 sm:px-4 py-2 text-center'>{tasas ? tasas.tasa_venta_usd.toFixed(3) : '...'}</td>
								</tr>
								<tr className='border-b'>
									<td className='px-2 sm:px-4 py-2 font-semibold'>Ka</td>
									<td className='px-2 sm:px-4 py-2 text-center'>{tasas ? (tasas.tasa_compra_usd - 0.005).toFixed(3) : '...'}</td>
									<td className='px-2 sm:px-4 py-2 text-center'>{tasas ? (tasas.tasa_venta_usd + 0.002).toFixed(3) : '...'}</td>
								</tr>
								<tr className='border-b'>
									<td className='px-2 sm:px-4 py-2 font-semibold'>Re</td>
									<td className='px-2 sm:px-4 py-2 text-center'>{tasas ? (tasas.tasa_compra_usd - 0.002).toFixed(3) : '...'}</td>
									<td className='px-2 sm:px-4 py-2 text-center'>{tasas ? (tasas.tasa_venta_usd + 0.003).toFixed(3) : '...'}</td>
								</tr>
								<tr>
									<td className='px-2 sm:px-4 py-2 font-semibold'>Tk</td>
									<td className='px-2 sm:px-4 py-2 text-center'>{tasas ? tasas.tasa_compra_usd.toFixed(3) : '...'}</td>
									<td className='px-2 sm:px-4 py-2 text-center'>{tasas ? tasas.tasa_venta_usd.toFixed(3) : '...'}</td>
								</tr>
							</tbody>
						</table>
						{tasas && (
							<div className='mt-3 text-xs text-slate-400 text-center'>
								Última actualización: hace {minutosActualizacion} {minutosActualizacion === 1 ? 'minuto' : 'minutos'}
							</div>
						)}
					</div>
				</div>

				{/* Gráfico */}
				<div className='bg-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-md'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4'>
						<h3 className='text-base sm:text-lg font-bold text-[#02254A]'>Histórico de Tipo de cambio</h3>

						{/* Selector de mes - solo visible para día y semana */}
						{period !== 'month' && mesesDisponibles.length > 0 && (
							<select
								value={`${selectedYear}-${selectedMonth}`}
								onChange={(e) => {
									const [year, month] = e.target.value.split('-').map(Number);
									setSelectedYear(year);
									setSelectedMonth(month);
								}}
								className='px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#02254A]'
							>
								{mesesDisponibles.map((mes) => (
									<option key={`${mes.year}-${mes.month}`} value={`${mes.year}-${mes.month}`}>
										{mes.label}
									</option>
								))}
							</select>
						)}
					</div>

					<div className='h-48 sm:h-56 md:h-64 w-full mt-4 relative overflow-hidden'>
						{loadingHistorico ? (
							<div className='flex items-center justify-center h-full'>
								<div className='text-slate-500'>Cargando datos...</div>
							</div>
						) : (
							<ChartComponent data={getData()} period={period} height={260} />
						)}
					</div>
					<div className='grid grid-cols-3 mt-4 sm:mt-6 gap-2 sm:gap-3'>
						<button
							onClick={() => setPeriod('day')}
							className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm ${
								period === 'day' ? 'bg-[#02254A] text-white' : 'text-slate-700'
							}`}
						>
							Día
						</button>
						<button
							onClick={() => setPeriod('week')}
							className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm ${
								period === 'week' ? 'bg-[#02254A] text-white' : 'text-slate-700'
							}`}
						>
							Semana
						</button>
						<button
							onClick={() => setPeriod('month')}
							className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm ${
								period === 'month' ? 'bg-[#02254A] text-white' : 'text-slate-700'
							}`}
						>
							Mes
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}