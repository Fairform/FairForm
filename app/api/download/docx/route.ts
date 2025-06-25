import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { generateDocxPack } from '@/lib/docx'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) return new NextResponse('Missing session ID', { status: 400 })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (!session.metadata) return new NextResponse('Missing metadata', { status: 403 })

    const buffer = await generateDocxPack({
      companyName: session.metadata.companyName,
      abn: session.metadata.abn,
      location: session.metadata.location,
      industry: session.metadata.industry,
      today: new Date().toLocaleDateString()
    })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${session.metadata.industry}_pack.docx"`
      }
    })
  } catch (err) {
    return new NextResponse('Error generating DOCX', { status: 500 })
  }
}
