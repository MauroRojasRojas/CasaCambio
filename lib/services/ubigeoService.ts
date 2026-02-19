import { DepartmentModel, ProvinceModel, DistrictModel } from '../../data/ubigeo.model';
import { apiRequest } from '../utils/apiHelper';

export const getDepartamentos = async (): Promise<DepartmentModel[]> => {
	const response = await apiRequest('/ubigeo/departamentos');
	if (!response.ok) {
		throw new Error('Error al obtener departamentos');
	}
	const result = await response.json();
	const data: DepartmentModel[] = result.message || [];
	return data;
};

export const getProvincias = async (departamentoId: string): Promise<ProvinceModel[]> => {
	const response = await apiRequest(`/ubigeo/provincias/${departamentoId}`);
	if (!response.ok) {
		throw new Error('Error al obtener provincias');
	}
	const result = await response.json();
	const data: ProvinceModel[] = result.message || [];
	return data;
};

export const getDistritos = async (provinciaId: string): Promise<DistrictModel[]> => {
	const response = await apiRequest(`/ubigeo/distritos/${provinciaId}`);
	if (!response.ok) {
		throw new Error('Error al obtener distritos');
	}
	const result = await response.json();
	const data: DistrictModel[] = result.message || [];
	return data;
};