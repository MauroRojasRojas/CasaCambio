export const fetchDniData = async (dni: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dni/${dni}`);

		if (!response.ok) throw new Error('Error al consultar DNI');

		return await response.json();
	} catch (error) {
		console.error('DNI service error:', error);
		return null;
	}
};