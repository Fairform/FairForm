import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie') || ''
  const email = cookie.match(/user=([^;]+)/)?.[1]
  if (!email) return new NextResponse('Unauthorized', { status: 401 })

  // Find customer by email
  const customers = await stripe.customers.list({ email, limit: 1 })
  const customer = customers.data[0]
  if (!customer) return new NextResponse('Not found', { status: 404 })

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${process.env.DOMAIN}/dashboard`
  })

  return NextResponse.json({ url: portalSession.url })
}
