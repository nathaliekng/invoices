'use client';

import { Invoice } from '@/types/invoice';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { Document } from '@react-pdf/renderer';
import Image from 'next/image';
import { Image as PDFImage } from '@react-pdf/renderer';

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
  const RobTemplate = (
    <Document>
      <Page style={{ backgroundColor: '#ffffff', width: 595, minHeight: 842, padding: 10, fontFamily: 'Helvetica' }}>

        {/* Header Banner */}
        <View style={{
          backgroundColor: '#2E3FFF',
          width: 575,
          height: 174,
          borderRadius: 12,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <View>
            <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: 'Helvetica-Bold', marginBottom: 8 }}>Invoice</Text>
            <Text style={{ color: '#ffffff', fontSize: 10, marginBottom: 2 }}>Billed To:</Text>
            <Text style={{ color: '#ffffff', fontSize: 14, fontFamily: 'Helvetica-Bold', marginBottom: 2 }}>{invoice.billedTo}</Text>
            <Text style={{ color: '#ffffff', fontSize: 10 }}>Address</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: '#ffffff', fontSize: 10, marginBottom: 1 }}>Invoice No.</Text>
            <Text style={{ color: '#ffffff', fontSize: 13, fontFamily: 'Helvetica-Bold', marginBottom: 6 }}>#{invoice.invoiceNumber || '0'}</Text>
            <Text style={{ color: '#ffffff', fontSize: 10, marginBottom: 1 }}>Issued on</Text>
            <Text style={{ color: '#ffffff', fontSize: 10, marginBottom: 6 }}>{invoice.dateIssued}</Text>
            <Text style={{ color: '#ffffff', fontSize: 10, marginBottom: 1 }}>GST/HST #</Text>
            <Text style={{ color: '#ffffff', fontSize: 10 }}>763481421 RT0001</Text>
          </View>
        </View>

        {/* Table Section */}
        <View style={{ width: 535, marginLeft: 20, marginTop: 36, marginBottom: 70 }}>

          {/* Table Header */}
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <Text style={{ width: 200, fontSize: 13, fontFamily: 'Helvetica-Bold' }}>Services</Text>
            {invoice.addQuantity && (
              <Text style={{ flex: 1, fontSize: 10, color: '#60737D', textAlign: 'right' }}>Amount</Text>
            )}
            <Text style={{ flex: 1, fontSize: 10, color: '#60737D', textAlign: 'right' }}>Rate</Text>
            {invoice.addHst && (
              <Text style={{ flex: 1, fontSize: 10, color: '#60737D', textAlign: 'right' }}>
                HST {invoice.hstRate ? invoice.hstRate * 100 : '0'}%
              </Text>
            )}
            <Text style={{ flex: 1, fontSize: 10, color: '#60737D', textAlign: 'right' }}>Total</Text>
          </View>

          {/* Table Rows */}
          {invoice.invoiceItems.map((item, i) => (
            <View key={item.serviceName + '-' + i} style={{ flexDirection: 'row', marginBottom: 12 }}>
              <Text style={{ width: 200, fontSize: 11, color: '#121722' }}>{item.serviceName}</Text>
              {invoice.addQuantity && (
                <Text style={{ flex: 1, fontSize: 11, color: '#60737D', textAlign: 'right' }}>{item.quantity}</Text>
              )}
              <Text style={{ flex: 1, fontSize: 11, color: '#60737D', textAlign: 'right' }}>CA${item.rate}</Text>
              {invoice.addHst && (
                <Text style={{ flex: 1, fontSize: 11, color: '#60737D', textAlign: 'right' }}>
                  CA${item.rate * (item?.quantity || 1) * (invoice.hstRate || 0)}
                </Text>
              )}
              <Text style={{ flex: 1, fontSize: 11, color: '#121722', textAlign: 'right' }}>
                CA${item.rate * (item?.quantity || 1) * (invoice.addHst && invoice.hstRate ? invoice.hstRate + 1 : 1)}
              </Text>
            </View>
          ))}

          {/* Totals */}
          <View style={{ alignItems: 'flex-end', width: '100%' }}>
            <View style={{ width: 243, paddingTop: 28, paddingBottom: 28 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 11, color: '#60737D' }}>Subtotal:</Text>
                <Text style={{ fontSize: 11, color: '#60737D' }}>CA${total}</Text>
              </View>
              {invoice.addHst && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 11, color: '#60737D' }}>
                    HST ({invoice.hstRate ? invoice.hstRate * 100 : '0'}%):
                  </Text>
                  <Text style={{ fontSize: 11, color: '#60737D' }}>CA${total * (invoice.hstRate || 0)}</Text>
                </View>
              )}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, color: '#121722', fontFamily: 'Helvetica-Bold' }}>Balance Due:</Text>
                <Text style={{ fontSize: 13, color: '#121722', fontFamily: 'Helvetica-Bold' }}>
                  CA${total + total * (invoice.addHst && invoice.hstRate ? invoice.hstRate : 0)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={{ width: 535, marginLeft: 30 }}>
          <PDFImage src="/truoStudio.png" style={{ width: 40, height: 40, marginBottom: 12 }} />
          <View style={{ flexDirection: 'row' }}>
            {/* Col 1 - gap-3 = 12px gap to next col */}
            <View style={{ width: 167, marginRight: 12 }}>
              <Text style={{ fontSize: 14, color: '#121722', fontFamily: 'Helvetica-Bold', marginBottom: 8 }}>truo.studio</Text>
              <Text style={{ fontSize: 10, color: '#121722', marginBottom: 2 }}>Robert Pham</Text>
              <Text style={{ fontSize: 10, color: '#121722', marginBottom: 2 }}>119 Claremont Lane, Woodbridge, Ontario, Canada, L4L 8Z8</Text>
              <Text style={{ fontSize: 10, color: '#334BC8' }}>robert@truo.studio</Text>
            </View>
            {/* Col 2 */}
            <View style={{ width: 167, marginRight: 12 }}>
              <Text style={{ fontSize: 10, color: '#121722', fontFamily: 'Helvetica-Bold', marginBottom: 12 }}>Payment Instructions</Text>
              <Text style={{ fontSize: 10, color: '#60737D' }}>Payment via e-transfer to: truo@wealthsimple.me</Text>
            </View>
            {/* Col 3 */}
            <View style={{ width: 167 }}>
              <Text style={{ fontSize: 10, color: '#121722', fontFamily: 'Helvetica-Bold', marginBottom: 12 }}>Additional Notes</Text>
              <Text style={{ fontSize: 10, color: '#60737D' }}>{invoice.additionalNotes}</Text>
            </View>
          </View>
        </View>

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
