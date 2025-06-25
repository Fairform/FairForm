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
    const email = session.customer_email || session.metadata?.email
    if (!email) return new NextResponse('Email not found', { status: 403 })

    // Check if user has active Pro subscription
    const subscriptions = await stripe.subscriptions.list({ limit: 5 })
    const isPro = subscriptions.data.some(
      sub => sub.customer_email === email && sub.status === 'active'
    )

    if (!isPro) {
      return new NextResponse('Upgrade to Pro to download editable DOCX files', { status: 403 })
    }

    const buffer = await generateDocxPack({
      companyName: session.metadata.companyName,
      abn: session.metadata.abn,
      location: session.metadata.location,
      industry: session.metadata.industry,
      today: new Date().toLocaleDateString(),
    })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${session.metadata.industry}_pack.docx"`,
      },
    })
  } catch (err) {
    return new NextResponse('Error generating DOCX', { status: 500 })
  }
}
