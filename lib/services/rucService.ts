export const fetchRucData = async (ruc: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ruc/${ruc}`);

		if (!response.ok) throw new Error('Error al consultar RUC');

		return await response.json();
	} catch (error) {
		console.error('RUC service error:', error);
		return null;
	}
};