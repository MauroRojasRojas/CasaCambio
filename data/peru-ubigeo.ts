export interface Distrito {
	nombre: string;
}

export interface Provincia {
	nombre: string;
	distritos: Distrito[];
}

export interface Region {
	nombre: string;
	provincias: Provincia[];
}

export const peruUbigeo: Region[] = [
	{
		nombre: 'Lambayeque',
		provincias: [
			{
				nombre: 'Chiclayo',
				distritos: [
					{ nombre: 'Chiclayo' },
					{ nombre: 'La Victoria' },
					{ nombre: 'José Leonardo Ortiz' },
					{ nombre: 'Pimentel' },
					{ nombre: 'Reque' },
					{ nombre: 'Monsefú' },
					{ nombre: 'Eten' },
				],
			},
			{
				nombre: 'Lambayeque',
				distritos: [{ nombre: 'Lambayeque' }, { nombre: 'Mochumí' }, { nombre: 'Túcume' }],
			},
			{
				nombre: 'Ferreñafe',
				distritos: [{ nombre: 'Ferreñafe' }, { nombre: 'Incahuasi' }, { nombre: 'Cañaris' }],
			},
		],
	},
];
