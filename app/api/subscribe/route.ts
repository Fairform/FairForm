import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie') || ''
  const email = cookie.match(/user=([^;]+)/)?.[1]
  if (!email) return new NextResponse('Unauthorized', { status: 401 })

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: email,
    line_items: [{
      price: process.env.STRIPE_PRO_PRICE_ID, // monthly plan ID from Stripe
      quantity: 1,
    }],
    success_url: `${process.env.DOMAIN}/success`,
    cancel_url: `${process.env.DOMAIN}/pricing`,
  })

  return NextResponse.json({ url: session.url })
}
