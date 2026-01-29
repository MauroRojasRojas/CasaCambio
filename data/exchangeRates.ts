export interface ExchangeRateData {
	date: string;
	rate: number;
}

// Función para generar datos con variaciones alrededor de 3.36
function generateData(points: number, baseRate: number = 3.36, variation: number = 0.05): ExchangeRateData[] {
	const data: ExchangeRateData[] = [];
	const now = new Date(2026, 0, 1); // Enero 2026

	for (let i = 0; i < points; i++) {
		const date = new Date(now);
		date.setDate(now.getDate() - (points - 1 - i)); // Desde el pasado hasta ahora
		const rate = baseRate + (Math.random() - 0.5) * variation * 2; // Variación aleatoria
		data.push({
			date: date.toISOString().split('T')[0], // YYYY-MM-DD
			rate: parseFloat(rate.toFixed(4)),
		});
	}
	return data;
}

// Datos diarios: últimos 30 días
export const dailyData = generateData(30);

// Datos semanales: últimas 52 semanas
export const weeklyData = generateData(52, 3.36, 0.1);

// Datos mensuales: últimos 12 meses
export const monthlyData = generateData(12, 3.36, 0.15);

// Datos anuales: últimos 5 años
export const yearlyData = generateData(5, 3.36, 0.2);
