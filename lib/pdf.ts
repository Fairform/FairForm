import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

type PolicyData = {
  companyName: string
  abn: string
  location: string
  industry: string
  today: string
}

export async function generatePdfPack(data: PolicyData): Promise<Uint8Array> {
  const { companyName, abn, location, industry, today } = data

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89]) // A4 size
  const { width, height } = page.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontSize = 18

  page.drawText(`${companyName} – ${industry} Policy Pack`, {
    x: 50,
    y: height - 80,
    size: fontSize,
    font,
    color: rgb(0.1, 0.1, 0.1),
  })

  page.drawText(`ABN: ${abn}`, { x: 50, y: height - 110, size: 12 })
  page.drawText(`Location: ${location}`, { x: 50, y: height - 130, size: 12 })
  page.drawText(`Date: ${today}`, { x: 50, y: height - 150, size: 12 })

  page.drawText(`Included Policies:`, {
    x: 50,
    y: height - 190,
    size: 14,
    font,
  })

  const policies = [
    'Code of Conduct',
    'Risk Management',
    'Complaints Handling',
    'Privacy and Confidentiality',
    'Incident Reporting',
  ]

  policies.forEach((policy, i) => {
    page.drawText(`- ${policy}`, {
      x: 70,
      y: height - 220 - i * 20,
      size: 12,
    })
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
