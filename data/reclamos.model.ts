export type DocumentType = 'DNI' | 'CE' | 'PAS' | 'RUC';
export type ComplaintType = 'reclamo' | 'queja';

export interface CreateComplaintBody {
  email: string;
  alternateEmail: string;
  date: string;

  firstName: string;
  fatherSurname: string;
  motherSurname: string;

  documentType: DocumentType;
  documentNumber: string;

  address: string;
  district: string;
  province: string;
  department: string;

  phone: string;
  additionalPhone: string;

  service: string;
  operationNumber: string;

  amountSoles: string;
  amountDollars: string;

  complaintType: ComplaintType;
  detail: string;
  request: string;

  declaration: boolean;
}