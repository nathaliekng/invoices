'use client';

import { Invoice } from '@/types/invoice';

export function InvoiceTemplate({ invoice }: { invoice: Invoice }) {
  const total = invoice.invoiceItems.reduce(
    (sum, item) => sum + item.rate * (item.quantity || 1),
    0
  );
  return (
    <div className="p-10 bg-white w-[800px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Invoice</h1>

      <div className="mb-6">
        <p>Client: {invoice.billedTo}</p>
        <p>Date: {invoice.dateIssued}</p>
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
          {invoice.invoiceItems.map((item) => (
            <tr key={item.serviceName} className="border-b">
              <td className="p-2">{item.serviceName}</td>
              <td className="text-right p-2">{item.quantity}</td>
              <td className="text-right p-2">${item.rate}</td>
              <td className="text-right p-2">${item.rate * (item.quantity || 1)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-6 text-xl font-semibold">Total: ${total}</div>
    </div>
  );
}
