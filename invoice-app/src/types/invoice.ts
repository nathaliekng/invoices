export interface InvoiceItem {
  serviceName: string;
  quantity?: number;
  rate: number;
  hstRate?: number;
}

export interface Invoice {
  invoiceNumber: string;
  dateIssued: string;
  billedTo: string;
  addHst: boolean;
  invoiceItems: InvoiceItem[];
}
