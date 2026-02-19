'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ExchangeRateData } from '@/data/exchangeRates';

interface ChartComponentProps {
	data: ExchangeRateData[];
	period: 'day' | 'week' | 'month';
}

export default function ChartComponent({ data, period }: ChartComponentProps) {
	// Formatear la fecha según el período
	const formatDate = (dateStr: string) => {
		// Para semana y mes, el formato ya viene listo ("Sem 1", "Ene", etc.)
		if (period === 'week' || period === 'month') {
			return dateStr;
		}
		
		// Para día, formatear la fecha YYYY-MM-DD
		if (period === 'day' && dateStr.includes('-')) {
			const [year, month, day] = dateStr.split('-').map(Number);
			const date = new Date(year, month - 1, day);
			return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
		}
		
		return dateStr;
	};

	// Formatear label del tooltip
	const formatTooltipLabel = (value: string) => {
		if (period === 'week') {
			return value; // "Sem 1", "Sem 2", etc.
		}
		if (period === 'month') {
			return `Mes: ${value}`;
		}
		// Para día
		if (value.includes('-')) {
			const [year, month, day] = value.split('-').map(Number);
			const date = new Date(year, month - 1, day);
			return `Fecha: ${date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`;
		}
		return value;
	};

	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='date' tickFormatter={formatDate} fontSize={12} />
				<YAxis
					domain={['dataMin - 0.02', 'dataMax + 0.02']}
					fontSize={12}
					tickFormatter={(value) => parseFloat(value).toFixed(3)}
					label={{ value: 'PEN/USD', angle: -90, position: 'insideLeft' }}
				/>
				<Tooltip
					labelFormatter={formatTooltipLabel}
					formatter={(value: number | undefined) => (value !== undefined ? [`${value.toFixed(4)} PEN`, period === 'month' || period === 'week' ? 'Promedio' : 'Tipo de Cambio'] : ['', 'Tipo de Cambio'])}
				/>
				<Line type='monotone' dataKey='rate' stroke='#02254A' strokeWidth={2} dot={{ fill: '#02254A', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
			</LineChart>
		</ResponsiveContainer>
	);
}
