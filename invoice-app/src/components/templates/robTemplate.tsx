'use client';

import { Invoice } from '@/types/invoice';

export function InvoiceTemplate({ invoice }: { invoice: Invoice }) {
  const total = invoice.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-10 bg-white w-[800px] mx-auto shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Invoice</h1>

      <div className="mb-6">
        <p>Client: {invoice.clientName}</p>
        <p>Date: {invoice.invoiceDate}</p>
        <p>Invoice #: {invoice.invoiceNumber}</p>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Item</th>
            <th className="text-right p-2">Qty</th>
            <th className="text-right p-2">Price</th>
            <th className="text-right p-2">Total</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.name} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="text-right p-2">{item.quantity}</td>
              <td className="text-right p-2">${item.price}</td>
              <td className="text-right p-2">${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-6 text-xl font-semibold">Total: ${total}</div>
    </div>
  );
}
