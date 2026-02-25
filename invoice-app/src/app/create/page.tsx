import { CreateButton } from '@/components/create/createButton';

export default function InvoicePage() {
  const invoice = {
    clientName: 'Sample Client',
    invoiceDate: '2025-01-01',
    invoiceNumber: 'INV-001',
    items: [{ name: 'Contract Work', quantity: 10, price: 50 }]
  };

  return (
    <div className="p-10">
      <CreateButton invoice={invoice} />
    </div>
  );
}
