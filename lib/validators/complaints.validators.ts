import {
	runValidations,
	validateEmail,
	validateMaxLength,
	validateMinLength,
	validatePhonePE,
	validateRequired,
	validateDocumentByType,
	type ValidationResult,
} from '@/lib/validators/form-validators';

export type ComplaintFormValidationInput = {
	documentType: string;
	documentNumber: string;
	alternateEmail: string;
	additionalPhone: string;
	detail: string;
	request: string;
};

export type ComplaintFormErrors = {
	documentNumber: ValidationResult;
	alternateEmail: ValidationResult;
	additionalPhone: ValidationResult;
	detail: ValidationResult;
	request: ValidationResult;
};

export const validateComplaintDocumentNumber = (
	documentType: string,
	documentNumber: string
): ValidationResult => {
	return runValidations([
		validateRequired(documentNumber, 'Número de documento'),
		validateDocumentByType(documentType, documentNumber),
	]);
};

export const validateComplaintAlternateEmail = (
	value: string
): ValidationResult => {
	return runValidations([
		validateEmail(value, 'Correo electrónico alternativo', 250),
	]);
};

export const validateComplaintAdditionalPhone = (
	value: string
): ValidationResult => {
	if (!value?.trim()) return null;

	return runValidations([
		validatePhonePE(value, 'Teléfono de contacto adicional'),
	]);
};

export const validateComplaintDetail = (
	value: string
): ValidationResult => {
	return runValidations([
		validateRequired(value, 'Detalle del reclamo'),
		validateMinLength(value, 20, 'Detalle del reclamo'),
		validateMaxLength(value, 2000, 'Detalle del reclamo'),
	]);
};

export const validateComplaintRequest = (
	value: string
): ValidationResult => {
	return runValidations([
		validateRequired(value, 'Solicitud del cliente'),
		validateMinLength(value, 20, 'Solicitud del cliente'),
		validateMaxLength(value, 2000, 'Solicitud del cliente'),
	]);
};

export const validateComplaintField = (
	name: keyof ComplaintFormValidationInput,
	values: ComplaintFormValidationInput
): ValidationResult => {
	switch (name) {
		case 'documentNumber':
			return validateComplaintDocumentNumber(
				values.documentType,
				values.documentNumber
			);

		case 'alternateEmail':
			return validateComplaintAlternateEmail(values.alternateEmail);

		case 'additionalPhone':
			return validateComplaintAdditionalPhone(values.additionalPhone);

		case 'detail':
			return validateComplaintDetail(values.detail);

		case 'request':
			return validateComplaintRequest(values.request);

		default:
			return null;
	}
};

export const validateComplaintForm = (
	values: ComplaintFormValidationInput
): ComplaintFormErrors => {
	return {
		documentNumber: validateComplaintDocumentNumber(
			values.documentType,
			values.documentNumber
		),
		alternateEmail: validateComplaintAlternateEmail(values.alternateEmail),
		additionalPhone: validateComplaintAdditionalPhone(values.additionalPhone),
		detail: validateComplaintDetail(values.detail),
		request: validateComplaintRequest(values.request),
	};
};

export const hasComplaintErrors = (errors: ComplaintFormErrors): boolean => {
	return Object.values(errors).some(Boolean);
};