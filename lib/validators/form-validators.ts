export type ValidationResult = string | null;

const TEMP_EMAIL_DOMAINS = [
	'yopmail.com',
	'mailinator.com',
	'guerrillamail.com',
	'tempmail.com',
	'10minutemail.com',
	'trashmail.com',
	'dispostable.com',
	'fakeinbox.com',
	'temp-mail.org',
	'tempmailo.com'
];

export const normalizeValue = (value: unknown): string => {
	if (value === null || value === undefined) return '';
	return String(value).trim();
};

export const validateRequired = (
	value: unknown,
	label: string
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return `${label} es obligatorio.`;
	return null;
};

export const validateMinLength = (
	value: unknown,
	min: number,
	label: string
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;
	if (normalized.length < min) {
		return `${label} debe tener al menos ${min} caracteres.`;
	}
	return null;
};

export const validateMaxLength = (
	value: unknown,
	max: number,
	label: string
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;
	if (normalized.length > max) {
		return `${label} no debe exceder ${max} caracteres.`;
	}
	return null;
};

export const validateExactLength = (
	value: unknown,
	length: number,
	label: string
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;
	if (normalized.length !== length) {
		return `${label} debe tener exactamente ${length} caracteres.`;
	}
	return null;
};

export const validateEmailFormat = (
	value: unknown,
	label = 'Correo electrónico'
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(normalized)) {
		return `${label} no tiene un formato válido.`;
	}

	return null;
};

export const validateDisposableEmail = (
	value: unknown,
	label = 'Correo electrónico'
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	const parts = normalized.toLowerCase().split('@');
	if (parts.length !== 2) {
		return `${label} no tiene un formato válido.`;
	}

	const domain = parts[1];
	if (TEMP_EMAIL_DOMAINS.includes(domain)) {
		return `${label} no puede pertenecer a un correo temporal.`;
	}

	return null;
};

export const validateEmail = (
	value: unknown,
	label = 'Correo electrónico',
	maxLength = 100
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	return (
		validateEmailFormat(normalized, label) ||
		validateMaxLength(normalized, maxLength, label) ||
		validateDisposableEmail(normalized, label)
	);
};

export const validateOnlyLetters = (
	value: unknown,
	label: string
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
	if (!regex.test(normalized)) {
		return `${label} solo debe contener letras.`;
	}

	return null;
};

export const validateAlphaNumeric = (
	value: unknown,
	label: string
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	const regex = /^[A-Za-z0-9]+$/;
	if (!regex.test(normalized)) {
		return `${label} solo debe contener letras y números.`;
	}

	return null;
};

export const validateNumericOnly = (
	value: unknown,
	label: string
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	const regex = /^\d+$/;
	if (!regex.test(normalized)) {
		return `${label} solo debe contener números.`;
	}

	return null;
};

export const validatePhonePE = (
	value: unknown,
	label = 'Teléfono'
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	if (!/^\d+$/.test(normalized)) {
		return `${label} solo debe contener números.`;
	}

	if (normalized.length !== 9) {
		return `${label} debe tener 9 dígitos.`;
	}

	if (!normalized.startsWith('9')) {
		return `${label} debe iniciar con 9.`;
	}

	return null;
};

export const validateDni = (
	value: unknown,
	label = 'DNI'
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	if (!/^\d{8}$/.test(normalized)) {
		return `${label} debe tener 8 dígitos numéricos.`;
	}

	return null;
};

export const validateRuc = (
	value: unknown,
	label = 'RUC'
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	if (!/^\d{11}$/.test(normalized)) {
		return `${label} debe tener 11 dígitos numéricos.`;
	}

	return null;
};

export const validateStrongPassword = (
	value: unknown,
	label = 'Contraseña'
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	if (normalized.length < 8) {
		return `${label} debe tener al menos 8 caracteres.`;
	}

	if (!/[A-Z]/.test(normalized)) {
		return `${label} debe incluir al menos una letra mayúscula.`;
	}

	if (!/[a-z]/.test(normalized)) {
		return `${label} debe incluir al menos una letra minúscula.`;
	}

	if (!/\d/.test(normalized)) {
		return `${label} debe incluir al menos un número.`;
	}

	return null;
};

export const validateNoSpecialChars = (
	value: unknown,
	label: string
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	const regex = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü\s]+$/;
	if (!regex.test(normalized)) {
		return `${label} contiene caracteres no permitidos.`;
	}

	return null;
};

export const runValidations = (
	validations: Array<ValidationResult>
): ValidationResult => {
	for (const validation of validations) {
		if (validation) return validation;
	}
	return null;
};

export const validateCe = (
	value: unknown,
	label = 'Carnet de Extranjería'
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	if (!/^[A-Za-z0-9]{9,12}$/.test(normalized)) {
		return `${label} debe tener entre 9 y 12 caracteres alfanuméricos.`;
	}

	return null;
};

export const validatePassport = (
	value: unknown,
	label = 'Pasaporte'
): ValidationResult => {
	const normalized = normalizeValue(value);
	if (!normalized) return null;

	if (!/^[A-Za-z0-9]{6,12}$/.test(normalized)) {
		return `${label} debe tener entre 6 y 12 caracteres alfanuméricos.`;
	}

	return null;
};

export const validateDocumentByType = (
	documentType: string,
	documentNumber: unknown
): ValidationResult => {
	const type = normalizeValue(documentType);
	const value = normalizeValue(documentNumber);

	if (!value) return null;

	switch (type) {
		case 'DNI':
			return validateDni(value, 'DNI');

		case 'CE':
			return validateCe(value, 'Carnet de Extranjería');

		case 'PAS':
			return validatePassport(value, 'Pasaporte');

		case 'RUC':
			return validateRuc(value, 'RUC');

		default:
			return null;
	}
};