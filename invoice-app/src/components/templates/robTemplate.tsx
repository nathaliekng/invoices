'use client';

import { Invoice } from '@/types/invoice';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { Document } from '@react-pdf/renderer';

export function RobTemplate({ invoice, download = false }: { invoice: Invoice, download?: boolean }) {
  const total = invoice.invoiceItems.reduce(
    (sum, item) => sum + item.rate * (item.quantity || 1),
    0
  );
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: '#ffffff',
    },
  
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 24,
    },
  
    container: {
      marginBottom: 24,
    },
  
    text: {
      fontSize: 12,
      marginBottom: 6,
    },
  
    table: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderBottomWidth: 0,
    },
  
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#e5e7eb',
      padding: 6,
    },
  
    headerRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#e5e7eb',
      backgroundColor: '#f9fafb',
      padding: 6,
      fontWeight: 'bold',
    },
  
    cell: {
      flex: 1,
      fontSize: 11,
      textAlign: 'left',
    },
  
    cellRight: {
      flex: 1,
      fontSize: 11,
      textAlign: 'right',
    },
  
    total: {
      textAlign: 'right',
      marginTop: 24,
      fontSize: 16,
      fontWeight: 'bold',
    },
  })
  const RobTemplate = (
    <Document>
      <Page style={styles.page}>
  
        <Text style={styles.title}>Invoice</Text>
  
        <View style={styles.container}>
          <Text style={styles.text}>Client: {invoice.billedTo}</Text>
          <Text style={styles.text}>Date: {invoice.dateIssued}</Text>
          <Text style={styles.text}>Invoice #: {invoice.invoiceNumber}</Text>
        </View>
  
        <View style={styles.table}>
  
          <View style={styles.headerRow}>
            <Text style={styles.cell}>Item</Text>
            <Text style={styles.cellRight}>Qty</Text>
            <Text style={styles.cellRight}>Price</Text>
          </View>
  
          {invoice.invoiceItems.map((item) => (
            <View style={styles.row} key={item.serviceName}>
              <Text style={styles.cell}>{item.serviceName}</Text>
              <Text style={styles.cellRight}>{item.quantity}</Text>
              <Text style={styles.cellRight}>${item.rate}</Text>
            </View>
          ))}
  
        </View>
  
        <Text style={styles.total}>
          Total: ${total}
        </Text>
  
      </Page>
    </Document>
  )
  
  const RobTemplateView = (
    <>
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
          </tr>
        </thead>
        <tbody>
          {invoice.invoiceItems.map((item) => (
            <tr key={item.serviceName} className="border-b">
              <td className="p-2">{item.serviceName}</td>
              <td className="text-right p-2">{item.quantity}</td>
              <td className="text-right p-2">${item.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-6 text-xl font-semibold">Total: ${total}</div>
    </div>
    </>
  )
  return download ? RobTemplate : RobTemplateView;
}
