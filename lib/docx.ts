import { Document, Packer, Paragraph, TextRun } from 'docx'

type PolicyData = {
  companyName: string
  abn: string
  location: string
  industry: string
  today: string
}

export async function generateDocxPack(data: PolicyData): Promise<Buffer> {
  const { companyName, abn, location, industry, today } = data

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${companyName} – ${industry} Compliance Policy Pack`,
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(`ABN: ${abn}`),
              new TextRun(`\nLocation: ${location}`),
              new TextRun(`\nDate: ${today}`),
            ],
            spacing: { before: 200, after: 200 },
          }),
          new Paragraph({
            text: `This document includes your policies for the ${industry} sector. These documents are preconfigured for compliance and best practice in your operating jurisdiction.`,
          }),
          new Paragraph({
            text: `Sections:\n- Code of Conduct\n- Risk Management\n- Complaints Handling\n- Privacy and Confidentiality\n- Incident Reporting`,
          }),
        ],
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  return buffer
}
