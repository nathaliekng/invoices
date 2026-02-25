'use client';

import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import { Invoice } from '@/types/invoice';
import { RobTemplate } from './robTemplate';

export function generateInvoicePDF(invoice: Invoice) {
  const doc = <RobTemplate invoice={invoice} download={true} />;

  return pdf(doc).toBlob();
}
