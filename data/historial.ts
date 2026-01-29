export interface OperacionHistorial {
	id: string;
	codigo: string;
	fecha: string;
	tipoOperacion: 'Compra' | 'Venta' | 'Transferencia';
	monto: number;
	monedaOrigen: 'PEN' | 'USD';
	monedaDestino: 'PEN' | 'USD';
	tasaCambio: number;
	estado: 'Completada' | 'Pendiente' | 'Cancelada';
	descripcion: string;
}

export const historialDefault: OperacionHistorial[] = [
	{
		id: '1',
		codigo: 'MTN7K2P9',
		fecha: '2025-01-20',
		tipoOperacion: 'Compra',
		monto: 1000.0,
		monedaOrigen: 'USD',
		monedaDestino: 'PEN',
		tasaCambio: 3.75,
		estado: 'Completada',
		descripcion: 'Compra de dólares para viaje',
	},
	{
		id: '2',
		codigo: 'VEN5R4L8',
		fecha: '2025-01-18',
		tipoOperacion: 'Venta',
		monto: 500.0,
		monedaOrigen: 'PEN',
		monedaDestino: 'USD',
		tasaCambio: 3.7,
		estado: 'Completada',
		descripcion: 'Venta de soles para inversión',
	},
	{
		id: '3',
		codigo: 'TRF9X1Q6',
		fecha: '2025-01-15',
		tipoOperacion: 'Transferencia',
		monto: 2000.0,
		monedaOrigen: 'PEN',
		monedaDestino: 'PEN',
		tasaCambio: 1.0,
		estado: 'Pendiente',
		descripcion: 'Transferencia a cuenta externa',
	},
	{
		id: '4',
		codigo: 'MTN3B8W2',
		fecha: '2025-01-12',
		tipoOperacion: 'Compra',
		monto: 2500.0,
		monedaOrigen: 'USD',
		monedaDestino: 'PEN',
		tasaCambio: 3.72,
		estado: 'Completada',
		descripcion: 'Compra para negocio',
	},
	{
		id: '5',
		codigo: 'VEN6T3M5',
		fecha: '2025-01-10',
		tipoOperacion: 'Venta',
		monto: 800.0,
		monedaOrigen: 'PEN',
		monedaDestino: 'USD',
		tasaCambio: 3.68,
		estado: 'Cancelada',
		descripcion: 'Venta cancelada por error',
	},
	{
		id: '6',
		codigo: 'TRF2J7N4',
		fecha: '2025-01-08',
		tipoOperacion: 'Transferencia',
		monto: 1500.0,
		monedaOrigen: 'USD',
		monedaDestino: 'USD',
		tasaCambio: 1.0,
		estado: 'Completada',
		descripcion: 'Transferencia internacional',
	},
	{
		id: '7',
		codigo: 'MTN4K9F1',
		fecha: '2025-01-05',
		tipoOperacion: 'Compra',
		monto: 3000.0,
		monedaOrigen: 'USD',
		monedaDestino: 'PEN',
		tasaCambio: 3.65,
		estado: 'Completada',
		descripcion: 'Compra para ahorro',
	},
	{
		id: '8',
		codigo: 'VEN8D5H3',
		fecha: '2025-01-03',
		tipoOperacion: 'Venta',
		monto: 1200.0,
		monedaOrigen: 'PEN',
		monedaDestino: 'USD',
		tasaCambio: 3.62,
		estado: 'Pendiente',
		descripcion: 'Venta pendiente de confirmación',
	},
];
