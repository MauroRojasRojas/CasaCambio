'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { dailyData, weeklyData, monthlyData, yearlyData } from '../../../data/exchangeRates';

const ChartComponent = dynamic(() => import('./ChartComponent'), { ssr: false });

export default function LiveExchangeRate() {
	const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');

	const getData = () => {
		switch (period) {
			case 'day':
				return dailyData;
			case 'week':
				return weeklyData;
			case 'month':
				return monthlyData;
			case 'year':
				return yearlyData;
			default:
				return weeklyData;
		}
	};

	return (
		<section className='py-12 md:py-16 lg:py-20 4k:py-24 px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16'>
			<h2 className='text-center text-2xl sm:text-3xl md:text-4xl 4k:text-5xl font-bold text-[#02254A] mb-2'>
				Sigue el tipo de <span className='text-[#02254A]/90'>cambio en vivo</span>
			</h2>

			<p className='text-center text-slate-500 mb-6 md:mb-10 text-xs sm:text-sm'>
				Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })},{' '}
				{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} hrs
			</p>

			<div className='grid grid-cols-1 lg:grid-cols-2 max-w-[1800px] mx-auto gap-6 md:gap-8 lg:gap-10'>
				{/* Tabla */}
				<div className='bg-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-md'>
					<div className='flex flex-row justify-between items-center gap-2 mb-4'>
						<h3 className='text-base sm:text-lg font-semibold text-slate-700'>Cambio online</h3>
						<button className='bg-yellow-400 text-[#02254A] font-semibold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-xl shadow text-xs sm:text-sm whitespace-nowrap'>
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
									<td className='px-2 sm:px-4 py-2 text-center'>3.354</td>
									<td className='px-2 sm:px-4 py-2 text-center'>3.379</td>
								</tr>
								<tr className='border-b'>
									<td className='px-2 sm:px-4 py-2 font-semibold'>Ka</td>
									<td className='px-2 sm:px-4 py-2 text-center'>3.349</td>
									<td className='px-2 sm:px-4 py-2 text-center'>3.381</td>
								</tr>
								<tr className='border-b'>
									<td className='px-2 sm:px-4 py-2 font-semibold'>Re</td>
									<td className='px-2 sm:px-4 py-2 text-center'>3.352</td>
									<td className='px-2 sm:px-4 py-2 text-center'>3.382</td>
								</tr>
								<tr>
									<td className='px-2 sm:px-4 py-2 font-semibold'>Tk</td>
									<td className='px-2 sm:px-4 py-2 text-center'>3.354</td>
									<td className='px-2 sm:px-4 py-2 text-center'>3.379</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* Gráfico */}
				<div className='bg-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-md'>
					<h3 className='text-base sm:text-lg font-bold text-[#02254A]'>Histórico de Tipo de cambio</h3>
					<div className='h-48 sm:h-56 md:h-64 w-full mt-4 relative overflow-hidden'>
						<ChartComponent data={getData()} period={period} />
					</div>
					<div className='grid grid-cols-2 lg:grid-cols-4 mt-4 sm:mt-6 gap-2 sm:gap-3'>
						<button
							onClick={() => setPeriod('day')}
							className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm ${period === 'day' ? 'bg-[#02254A] text-white' : 'text-slate-700'}`}
						>
							Día
						</button>
						<button
							onClick={() => setPeriod('week')}
							className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm ${period === 'week' ? 'bg-[#02254A] text-white' : 'text-slate-700'}`}
						>
							Semana
						</button>
						<button
							onClick={() => setPeriod('month')}
							className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm ${period === 'month' ? 'bg-[#02254A] text-white' : 'text-slate-700'}`}
						>
							Mes
						</button>
						<button
							onClick={() => setPeriod('year')}
							className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm ${period === 'year' ? 'bg-[#02254A] text-white' : 'text-slate-700'}`}
						>
							Año
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
