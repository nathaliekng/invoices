'use client';

import React, { useRef, useState } from 'react';
import { Invoice } from '@/types/invoice';
import { RobTemplate } from '../templates/robTemplate';
import { generateInvoicePDF } from '../templates/generateInvoice';

export default function CreatePage() {
  const [invoice, setInvoice] = useState<Invoice>({
    invoiceNumber: '',
    dateIssued: '',
    billedTo: '',
    addHst: false,
    addQuantity: false,
    hstRate: 0.13,
    additionalNotes: '',
    invoiceItems: [
      {
        serviceName: '',
        quantity: 0,
        rate: 0
      }
    ]
  });

  const ref = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    const blob = await generateInvoicePDF(invoice);

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice.invoiceNumber || 'draft'}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const addInvoiceItem = () => {
    setInvoice({
      ...invoice,
      invoiceItems: [
        ...invoice.invoiceItems,
        {
          serviceName: '',
          quantity: 0,
          rate: 0
        }
      ]
    });
  };

  const updateItemField = (index: number, field: string, value: string | number) => {
    const updatedItems = [...invoice.invoiceItems];

    (updatedItems[index] as any)[field] = value;

    setInvoice({
      ...invoice,
      invoiceItems: updatedItems
    });
  };

  const removeItem = (index: number) => {
    if (invoice.invoiceItems.length === 1) return;

    const updated = invoice.invoiceItems.filter((_, i) => i !== index);

    setInvoice({
      ...invoice,
      invoiceItems: updated
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">
      {/* LEFT SIDE PREVIEW */}
      <div className="flex justify-center">
        <div className="sticky top-10">
          <div ref={ref}>
            <RobTemplate invoice={invoice} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex flex-col gap-6 w-[360px] mx-auto">
        <h2 className="text-xl font-semibold">Invoice Editor</h2>

        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Client Name"
          value={invoice.billedTo}
          onChange={(e) => setInvoice({ ...invoice, billedTo: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Invoice Date"
          value={invoice.dateIssued}
          onChange={(e) => setInvoice({ ...invoice, dateIssued: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Invoice Number"
          value={invoice.invoiceNumber}
          onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={invoice.addHst}
            onChange={(e) => setInvoice({ ...invoice, addHst: e.target.checked })}
          />
          Add HST
        </label>

        {invoice.addHst && (
          <input
            className="border p-2 rounded"
            type="number"
            placeholder="HST Rate"
            value={invoice.hstRate}
            onChange={(e) => setInvoice({ ...invoice, hstRate: Number(e.target.value) })}
          />
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={invoice.addQuantity}
            onChange={(e) => setInvoice({ ...invoice, addQuantity: e.target.checked })}
          />
          Add Quantity
        </label>

        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Additional Notes"
          value={invoice.additionalNotes || ''}
          onChange={(e) => setInvoice({ ...invoice, additionalNotes: e.target.value })}
        />

        {/* ITEMS SECTION */}

        <div className="border p-4 rounded-xl flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Invoice Items</h3>

            <button
              onClick={addInvoiceItem}
              className="bg-black text-white px-3 py-1 rounded-lg text-sm"
            >
              + Add Item
            </button>
          </div>

          {invoice.invoiceItems.map((item, index) => (
            <div key={index} className="border p-3 rounded-lg space-y-2">
              <input
                className="border p-2 rounded w-full"
                placeholder="Service Name"
                value={item.serviceName}
                onChange={(e) => updateItemField(index, 'serviceName', e.target.value)}
              />

              {invoice.addQuantity && (
                <input
                  className="border p-2 rounded w-full"
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => updateItemField(index, 'quantity', Number(e.target.value))}
                />
              )}
              <input
                className="border p-2 rounded w-full"
                type="number"
                placeholder="Rate"
                value={item.rate}
                onChange={(e) => updateItemField(index, 'rate', Number(e.target.value))}
              />

              <button onClick={() => removeItem(index)} className="text-red-500 text-sm">
                Remove Item
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={downloadPDF}
          className="bg-black text-white p-3 rounded-xl mt-2"
        >
          Download Invoice PDF
        </button>
      </div>
    </div>
  );
}
