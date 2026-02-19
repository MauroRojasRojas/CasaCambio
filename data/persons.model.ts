interface CommonFields {
	correo: string;
	contrasena: string;
	confirmarContrasena: string;
	terminosAceptados: boolean;
	paisSeleccionado: string;
	telefono: string;
	departamentoSeleccionado: string;
	provinciaSeleccionada: string;
	distritoSeleccionado: string;
	estadoExtranjero: string;
	direccion: string;
}

export interface NaturalPersonModel extends CommonFields {
	tipoDocumento: string;
	numeroDocumento: string;
	nombres: string;
	apellidos: string;
	fechaNacimiento: string;
	genero: string;
}

export interface LegalEntityModel extends CommonFields {
	tipoDocumento: string;
	numeroDocumento: string;
	razonSocial: string;
	accionistas: ShareholderModel[];
	representantesLegales: LegalRepresentativeModel[];
}

export interface ShareholderModel extends NaturalPersonModel {
	porcentaje: number;
}

export interface LegalRepresentativeModel extends NaturalPersonModel {
	cargo: string;
}

export type RegistrationData = NaturalPersonModel | LegalEntityModel;
