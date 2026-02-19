export interface BankAccountModel {
	id: string;
	banco: string;
	numeroCuenta: string;
	tipoCuenta: string;
	moneda: string;
	titular: string;
	estado: boolean;
	fechaRegistro: string;
	saldo: number;
	codigoPersona: string;
}