import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

export async function POST(req: NextRequest) {
  const { companyName, abn, email, location, industry } = await req.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'aud',
          product_data: {
            name: `Fairform Compliance Pack – ${industry}`,
            description: 'Industry-specific policy documents (PDF)',
          },
          unit_amount: 19900,
        },
        quantity: 1,
      },
    ],
    metadata: { companyName, abn, email, location, industry },
    success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}/generate/${industry}`,
  })

  return NextResponse.json({ url: session.url })
}
