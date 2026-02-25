'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { InvoiceTemplate } from '../templates/robTemplate';
import { Invoice } from '@/types/invoice';

export function CreateButton({ invoice }: { invoice: Invoice }) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: `invoice-${invoice.invoiceNumber}`
  });

  return (
    <div>
      <div style={{ display: 'none' }}>
        <div ref={ref}>
          <InvoiceTemplate invoice={invoice} />
        </div>
      </div>

      <button onClick={handlePrint} className="px-4 py-2 bg-black text-white rounded-xl">
        Download Invoice PDF
      </button>
    </div>
  );
}
