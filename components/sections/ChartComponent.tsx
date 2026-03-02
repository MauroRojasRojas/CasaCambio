'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ExchangeRateData } from '@/data/exchangeRates';
import { ReactNode } from 'react';

interface ChartComponentProps {
  data: ExchangeRateData[];
  period: 'day' | 'week' | 'month';
  height?: number; // 👈 nuevo
}

export default function ChartComponent({ data, period, height = 260 }: ChartComponentProps) {
  const formatDate = (dateStr: string) => {
    if (period === 'week' || period === 'month') return dateStr;
    if (period === 'day' && dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }
    return dateStr;
  };

  const formatTooltipLabel = (label: ReactNode): string => {
    if (label == null) return '';
    const value = typeof label === 'string' || typeof label === 'number' ? String(label) : '';
    if (!value) return '';

    if (period === 'week') return value;
    if (period === 'month') return `Mes: ${value}`;

    if (value.includes('-')) {
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return `Fecha: ${date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    }
    return value;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatDate} fontSize={12} />
        <YAxis
          domain={['dataMin - 0.02', 'dataMax + 0.02']}
          fontSize={12}
          tickFormatter={(value) => parseFloat(value).toFixed(3)}
          label={{ value: 'PEN/USD', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          labelFormatter={formatTooltipLabel}
          formatter={(value: number | undefined) =>
            value !== undefined
              ? [`${value.toFixed(4)} PEN`, period === 'month' || period === 'week' ? 'Promedio' : 'Tipo de Cambio']
              : ['', 'Tipo de Cambio']
          }
        />
        <Line type="monotone" dataKey="rate" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}