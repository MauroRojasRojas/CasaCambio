export interface CuentaBancaria {
	id: string;
	banco: string;
	numeroCuenta: string;
	tipoCuenta: 'Ahorros' | 'Corriente';
	moneda: 'PEN' | 'USD';
	titular: string;
	estado: 'Activa' | 'Inactiva';
	fechaRegistro: string;
	saldo: number;
}

export const cuentasDefault: CuentaBancaria[] = [
	{
		id: '1',
		banco: 'BCP',
		numeroCuenta: '****1234',
		tipoCuenta: 'Ahorros',
		moneda: 'PEN',
		titular: 'Luis Marco',
		estado: 'Activa',
		fechaRegistro: '2025-01-15',
		saldo: 15500.5,
	},
	{
		id: '2',
		banco: 'INTERBANK',
		numeroCuenta: '****5678',
		tipoCuenta: 'Corriente',
		moneda: 'USD',
		titular: 'Luis Marco',
		estado: 'Activa',
		fechaRegistro: '2025-02-20',
		saldo: 8200.0,
	},
	{
		id: '3',
		banco: 'Scotiabank',
		numeroCuenta: '****9012',
		tipoCuenta: 'Ahorros',
		moneda: 'PEN',
		titular: 'Luis Marco',
		estado: 'Activa',
		fechaRegistro: '2025-03-10',
		saldo: 25000.75,
	},
	{
		id: '4',
		banco: 'BBVA',
		numeroCuenta: '****3456',
		tipoCuenta: 'Corriente',
		moneda: 'USD',
		titular: 'Luis Marco',
		estado: 'Inactiva',
		fechaRegistro: '2024-12-05',
		saldo: 0.0,
	},
	{
		id: '5',
		banco: 'Credicorp',
		numeroCuenta: '****7890',
		tipoCuenta: 'Ahorros',
		moneda: 'PEN',
		titular: 'Luis Marco',
		estado: 'Activa',
		fechaRegistro: '2025-01-28',
		saldo: 12300.25,
	},
	{
		id: '6',
		banco: 'ICBC',
		numeroCuenta: '****2345',
		tipoCuenta: 'Corriente',
		moneda: 'USD',
		titular: 'Luis Marco',
		estado: 'Activa',
		fechaRegistro: '2025-04-01',
		saldo: 45600.0,
	},
	{
		id: '7',
		banco: 'Mizuho Bank',
		numeroCuenta: '****6789',
		tipoCuenta: 'Ahorros',
		moneda: 'PEN',
		titular: 'Luis Marco',
		estado: 'Activa',
		fechaRegistro: '2025-02-14',
		saldo: 33200.5,
	},
	{
		id: '8',
		banco: 'Banco del Perú',
		numeroCuenta: '****0123',
		tipoCuenta: 'Corriente',
		moneda: 'USD',
		titular: 'Luis Marco',
		estado: 'Activa',
		fechaRegistro: '2025-03-22',
		saldo: 19800.75,
	},
	{
		id: '9',
		banco: 'Agrobanco',
		numeroCuenta: '****4567',
		tipoCuenta: 'Ahorros',
		moneda: 'PEN',
		titular: 'Luis Marco',
		estado: 'Inactiva',
		fechaRegistro: '2024-11-30',
		saldo: 0.0,
	},
	{
		id: '10',
		banco: 'Citibank',
		numeroCuenta: '****8901',
		tipoCuenta: 'Corriente',
		moneda: 'USD',
		titular: 'Luis Marco',
		estado: 'Activa',
		fechaRegistro: '2025-01-05',
		saldo: 67500.0,
	},
];
