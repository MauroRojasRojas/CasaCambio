export interface DepartmentModel {
	id: string;
	nombre: string;
}

export interface ProvinceModel {
	id: string;
	nombre: string;
	departamento_id: string;
}

export interface DistrictModel {
	id: string;
	nombre: string;
	provincia_id: string;
}