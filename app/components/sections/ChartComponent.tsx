'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ExchangeRateData } from '../../../data/exchangeRates';

interface ChartComponentProps {
	data: ExchangeRateData[];
	period: 'day' | 'week' | 'month' | 'year';
}

export default function ChartComponent({ data, period }: ChartComponentProps) {
	// Formatear la fecha según el período
	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		switch (period) {
			case 'day':
				return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
			case 'week':
				return `Sem ${Math.ceil((date.getDate() - date.getDay() + 1) / 7)}`;
			case 'month':
				return date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
			case 'year':
				return date.getFullYear().toString();
			default:
				return dateStr;
		}
	};

	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='date' tickFormatter={formatDate} fontSize={12} />
				<YAxis
					domain={['dataMin - 0.1', 'dataMax + 0.1']}
					fontSize={12}
					tickFormatter={(value) => parseFloat(value).toFixed(2)}
					label={{ value: 'PEN/USD', angle: -90, position: 'insideLeft' }}
				/>
				<Tooltip
					labelFormatter={(value) => `Fecha: ${formatDate(value)}`}
					formatter={(value: number | undefined) => (value !== undefined ? [`${value.toFixed(4)} PEN`, 'Tipo de Cambio'] : ['', 'Tipo de Cambio'])}
				/>
				<Line type='monotone' dataKey='rate' stroke='#02254A' strokeWidth={2} dot={{ fill: '#02254A', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
			</LineChart>
		</ResponsiveContainer>
	);
}
