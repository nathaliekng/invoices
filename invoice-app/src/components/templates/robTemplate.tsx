'use client';

import { Invoice } from '@/types/invoice';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { Document } from '@react-pdf/renderer';
import Image from 'next/image';

export function RobTemplate({
  invoice,
  download = false
}: {
  invoice: Invoice;
  download?: boolean;
}) {
  const total = invoice.invoiceItems.reduce(
    (sum, item) => sum + item.rate * (item.quantity || 1),
    0
  );
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: '#ffffff'
    },

    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 24
    },

    container: {
      marginBottom: 24
    },

    text: {
      fontSize: 12,
      marginBottom: 6
    },

    table: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderBottomWidth: 0
    },

    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#e5e7eb',
      padding: 6
    },

    headerRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#e5e7eb',
      backgroundColor: '#f9fafb',
      padding: 6,
      fontWeight: 'bold'
    },

    cell: {
      flex: 1,
      fontSize: 11,
      textAlign: 'left'
    },

    cellRight: {
      flex: 1,
      fontSize: 11,
      textAlign: 'right'
    },

    total: {
      textAlign: 'right',
      marginTop: 24,
      fontSize: 16,
      fontWeight: 'bold'
    }
  });
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

        <Text style={styles.total}>Total: ${total}</Text>
      </Page>
    </Document>
  );

  const RobTemplateView = (
    <>
      <div className="bg-white w-[595px] h-[842px] mx-auto p-[10px]">
        <div className="bg-[#2E3FFF] w-[575px] h-[174px] rounded-xl p-[10px] text-white flex justify-between items-start mx-auto">
          <div className="">
            <h1 className="text-xl font-bold">Invoice</h1>
            <div className="gap-1 flex-col flex items-start">
              <span className="font-regular text-[10px]">Billed To:</span>
              <span className="font-bold text-[14px]">{invoice.billedTo}</span>
              <span className="font-regular text-[10px]">Address</span>
            </div>
          </div>
          <div>
            <div className="gap-1 flex-col flex items-end text-left">
              <span className="font-regular text-[10px]">Invoice No.</span>
              <span className="font-bold text-[13px]">#{invoice.invoiceNumber || '0'}</span>
            </div>
            <div className="gap-1 flex-col flex items-end text-left">
              <span className="font-regular text-[10px]">Issued on</span>
              <span className="font-regular text-[10px]">{invoice.dateIssued}</span>
            </div>
            <div className="gap-1 flex-col flex items-end text-left font-regular text-[10px]">
              <span>GST/HST #</span>
              <span>763481421 RT0001</span>
            </div>
          </div>
        </div>

        <div className="w-[535px] mx-auto mt-9 mb-[70px]">
          <div className="gap-7">
            <table className="w-full border-separate border-spacing-y-3">
              <thead className="">
                <tr className="">
                  <th className="text-left font-bold text-[13px]">Services</th>
                  {invoice.addQuantity && (
                    <th className="text-right text-[10px] text-[#60737D] font-regular">Amount</th>
                  )}
                  <th className="text-right text-[10px] text-[#60737D]">Rate</th>
                  {invoice.addHst && (
                    <th className="text-right text-[10px] text-[#60737D]">
                      HST {invoice.hstRate ? invoice.hstRate * 100 : '0'}%
                    </th>
                  )}
                  <th className="text-right  text-[10px] text-[#60737D]">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.invoiceItems.map((item, i) => (
                  <tr key={item.serviceName + '-' + i} className="mt-10">
                    <td className="text-left text-[11px] text-[#121722]">{item.serviceName}</td>
                    {invoice.addQuantity && (
                      <td className="text-right text-[11px] text-[#60737D]">{item.quantity}</td>
                    )}
                    <td className="text-right text-[11px] text-[#60737D]">CA${item.rate}</td>
                    {invoice.addHst && (
                      <td className="text-right text-[11px] text-[#60737D]">
                        CA${item.rate * (item?.quantity || 1) * (invoice.hstRate || 0)}
                      </td>
                    )}
                    <td className="text-right text-[11px] text-[#121722]">
                      CA$
                      {item.rate *
                        (item?.quantity || 1) *
                        (invoice.addHst && invoice.hstRate ? invoice.hstRate + 1 || 1 : 1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end w-full">
            <div className="flex flex-col gap-1 justify-end w-[243px] py-7">
              <div className="flex justify-between items-center text-[#60737D]">
                <span className="text-left text-[11px]">Subtotal: </span>
                <span className="text-right text-[11px]">CA${total}</span>
              </div>
              <div className="flex justify-between items-center text-[#60737D]">
                {invoice.addHst && (
                  <>
                    <span className="text-left text-[11px]">
                      HST ({invoice.hstRate ? invoice.hstRate * 100 : '0'}%):{' '}
                    </span>
                    <span className="text-right text-[11px]">
                      CA${total * (invoice.hstRate || 0)}
                    </span>
                  </>
                )}
              </div>
              <div className="flex justify-between items-center text-[#121722] text-[13px] font-bold">
                <span className="text-left">Balance Due: </span>
                <span className="text-right">
                  CA$
                  {total + total * (invoice.addHst && invoice.hstRate ? invoice.hstRate || 1 : 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <footer className="gap-3 flex flex-col w-[535px] mx-auto">
          <Image src="/truoStudio.png" alt="truoStudio" width={40} height={40} />
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#121722] text-[14px] font-bold">truo.studio</h3>
              <div className="flex flex-col">
                <span className="font-regular italic text-[10px]">Robert Pham</span>
                <span className="font-regular text-[10px]">
                  119 Claremont Lane, Woodbridge, Ontario, Canada, L4L 8Z8
                </span>
                <span className="text-[#334BC8] text-[10px]">robert@truo.studio</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-[10px] text-[#121722]">Payment Instructions</span>
              <span className="font-regular text-[10px] text-[#60737D]">
                Payment via e-transfer to: truo@wealthsimple.me
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-[10px] text-[#121722]">Additional Notes</span>
              <span className="font-regular text-[10px] text-[#60737D]">
                {invoice.additionalNotes}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
  return download ? RobTemplate : RobTemplateView;
}
