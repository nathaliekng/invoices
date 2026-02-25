export interface InvoiceItem {
  serviceName: string;
  quantity?: number;
  rate: number;
}

export interface Invoice {
  invoiceNumber: string;
  dateIssued: string;
  billedTo: string;
  addHst: boolean;
  addQuantity: boolean;
  hstRate?: number;
  additionalNotes?: string;
  invoiceItems: InvoiceItem[];
}
