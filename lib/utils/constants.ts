// lib/utils/constants.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://casacambioback-production.up.railway.app/api'/* 'http://localhost:3001/api' */;

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