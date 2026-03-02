// lib/utils/constants.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
export const RAZON_SOCIAL = process.env.NEXT_PUBLIC_RAZON_SOCIAL || 'M&M DIVISAS SRL';
export const RUC = process.env.NEXT_PUBLIC_RUC || '20614994364';
export const ADDRESS_RUC =  process.env.NEXT_PUBLIC_ADDRESS_RUC || 'Av. Producción Nacional N° 185 – Urb. La Villa, Chorrillos, Lima – Perú.';


export type BankAccount = {
  bank: string;
  type: string;
  money: string;
  cci: string;
};

export const BANK_ACCOUNTS_JSON =
  process.env.NEXT_PUBLIC_BANK_ACCOUNTS_JSON ||
  '[{"bank":"BBVA","type":"Cuenta Corriente","money":"SOLES","cci":"01137800010008127676"},{"bank":"BBVA","type":"Cuenta Corriente","money":"DOLARES","cci":"01137800010008129273"},{"bank":"BCP","type":"Cuenta Corriente","money":"SOLES","cci":""},{"bank":"BCP","type":"Cuenta Corriente","money":"DOLARES","cci":""}]';

  
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

