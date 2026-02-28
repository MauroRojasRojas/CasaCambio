export type DocumentType = 'DNI' | 'CE' | 'PAS';
export type ComplaintType = 'reclamo' | 'queja';

export interface CreateComplaintBody {
  email: string;
  date: string; // ISO: new Date().toISOString()
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
  service: string;
  operationNumber: string;
  amountSoles: number | null;
  amountDollars: number | null;
  complaintType: ComplaintType;
  detail: string;
  request: string;
  declaration: true; // en backend lo validas como true
}