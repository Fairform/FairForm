import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  if (email && password) {
    return NextResponse.json({ created: true }, {
      headers: { 'Set-Cookie': `user=${email}; Path=/; HttpOnly` }
    })
  }
  return new NextResponse('Bad Request', { status: 400 })
}
