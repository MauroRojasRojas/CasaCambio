export interface OperationModel {
	id?: number;
	personaCode: string;
	cuentaBancariaOrigenId: string;
	cuentaBancariaDestinoId: string;
	montoEnviado: number;
	monedaEnviada: string;
	montoRecibido: number;
	monedaRecibida: string;
	tipoOperacion: 'COMPRA' | 'VENTA';
	codigoOperacion: string;
	fechaEmision: string;
	estado?: string;
	tasaCompra?: number;
	tasaVenta?: number;
}
