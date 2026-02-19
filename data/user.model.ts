export interface UserModel {
	idUsuario: number;
	nombres: string;
	apellidos: string;
	correo: string;
	telefono: string;
	rolNombre: string;
	rolCodigo: string;
	perfilCompleto: string;
	creadoEn: string;
	fullName: string;
	password?: string;
}
