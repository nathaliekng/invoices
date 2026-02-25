'use client';

import React, { useRef, useState } from 'react';
import { Invoice } from '@/types/invoice';
import { useReactToPrint } from 'react-to-print';
import { RobTemplate } from '../templates/robTemplate';
import { generateInvoicePDF } from '../templates/generateInvoice';

export default function CreatePage() {
  const [invoice, setInvoice] = useState<Invoice>({
    invoiceNumber: '',
    dateIssued: '',
    billedTo: '',
    addHst: false,
    invoiceItems: [
      {
        serviceName: '',
        quantity: 0,
        rate: 0,
        hstRate: 0
      }
    ]
  });

  const ref = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    const blob = await generateInvoicePDF(invoice)
  
    const url = URL.createObjectURL(blob)
  
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice-${invoice.invoiceNumber}.pdf`
    a.click()
  }
  const updateItemField = (field: string, value: string | number) => {
    const updatedItems = [...invoice.invoiceItems];
    (updatedItems[0] as any)[field] = value;

    setInvoice({
      ...invoice,
      invoiceItems: updatedItems
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">
      {/* ================= LEFT SIDE PREVIEW ================= */}
      <div className="flex justify-center">
        <div className="sticky top-10">
          <div ref={ref}>
            <RobTemplate invoice={invoice} />
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE FORM ================= */}
      <div className="flex flex-col gap-4 w-[320px] mx-auto">
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

        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Service Name"
          value={invoice.invoiceItems[0].serviceName}
          onChange={(e) => updateItemField('serviceName', e.target.value)}
        />

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Quantity"
          value={invoice.invoiceItems[0].quantity}
          onChange={(e) => updateItemField('quantity', Number(e.target.value))}
        />

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Rate"
          value={invoice.invoiceItems[0].rate}
          onChange={(e) => updateItemField('rate', Number(e.target.value))}
        />

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="HST Rate"
          value={invoice.invoiceItems[0].hstRate}
          onChange={(e) => updateItemField('hstRate', Number(e.target.value))}
        />

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
