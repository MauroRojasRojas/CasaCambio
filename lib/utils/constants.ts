// lib/utils/constants.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
export const RAZON_SOCIAL = process.env.NEXT_PUBLIC_RAZON_SOCIAL || 'M&M DIVISAS SRL';
export const RUC = process.env.NEXT_PUBLIC_RUC || '20614994364';
export const ADDRESS_RUC =  process.env.NEXT_PUBLIC_ADDRESS_RUC || 'Av. Producción Nacional N° 185 – Urb. La Villa, Chorrillos, Lima – Perú.';

export const BANK_ID_ONE = process.env.NEXT_PUBLIC_BANK_ID_ONE || 'BBVA';
export const TYPE_ACC_BANK_ONE = process.env.NEXT_PUBLIC_TYPE_ACC_BANK_ONE || 'Cuenta Corriente';
export const MONEY_BANK_ONE = process.env.NEXT_PUBLIC_MONEY_BANK_ONE || 'SOLES';
export const BANK_CCI_ONE = process.env.NEXT_PUBLIC_BANK_CCI_ONE || '01137800010008127676';

export const BANK_ID_TWO = process.env.NEXT_PUBLIC_BANK_ID_TWO || 'BBVA';
export const TYPE_ACC_BANK_TWO = process.env.NEXT_PUBLIC_TYPE_ACC_BANK_TWO || 'Cuenta Corriente';
export const MONEY_BANK_TWO = process.env.NEXT_PUBLIC_MONEY_BANK_TWO || 'DOLARES';
export const BANK_CCI_TWO = process.env.NEXT_PUBLIC_BANK_CCI_TWO || '01137800010008129273';

export const BANK_ID_THREE = process.env.NEXT_PUBLIC_BANK_ID_THREE || 'BCP';
export const TYPE_ACC_BANK_THREE = process.env.NEXT_PUBLIC_TYPE_ACC_BANK_THREE || 'Cuenta Corriente';
export const MONEY_BANK_THREE = process.env.NEXT_PUBLIC_MONEY_BANK_THREE || 'SOLES';
export const BANK_CCI_THREE = process.env.NEXT_PUBLIC_BANK_CCI_THREE || '';

export const BANK_ID_FOUR = process.env.NEXT_PUBLIC_BANK_ID_FOUR || 'BCP';
export const TYPE_ACC_BANK_FOUR = process.env.NEXT_PUBLIC_TYPE_ACC_BANK_FOUR || 'Cuenta Corriente';
export const MONEY_BANK_FOUR = process.env.NEXT_PUBLIC_MONEY_BANK_FOUR || 'DOLARES';
export const BANK_CCI_FOUR = process.env.NEXT_PUBLIC_BANK_CCI_FOUR || '';

export const DOC_TYPES = ['DNI', 'CE', 'PAS', 'RUC'] as const;

export const GENDERS = ['M', 'F', 'X'] as const;

export const COUNTRIES = [
	{ code: 'PE', name: 'Perú', dialCode: '+51' },
	{ code: 'US', name: 'Estados Unidos', dialCode: '+1' },
	// Add more countries if needed
] as const;

export const UBIGEO_PERU = [
	{
		nombre: 'Lima',
		provincias: [
			{
				nombre: 'Lima',
				distritos: [
					{ nombre: 'Miraflores' },
					{ nombre: 'San Isidro' },
				],
			},
		],
	},
	// Add more departments
] as const;