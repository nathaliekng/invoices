export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  clientName: string;
  invoiceDate: string;
  invoiceNumber: string;
  items: InvoiceItem[];
}
