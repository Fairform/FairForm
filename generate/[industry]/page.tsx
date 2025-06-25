'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function GeneratePage() {
  const { industry } = useParams()
  const [formData, setFormData] = useState({
    companyName: '',
    abn: '',
    location: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ ...formData, industry }),
    })
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <section className="py-section max-w-xl mx-auto">
      <h1 className="text-heading font-bold mb-8">Generate Your Compliance Pack</h1>
      <div className="space-y-6">
        {['Company Name', 'ABN', 'Location', 'Email'].map((label, idx) => {
          const name = label.toLowerCase().replace(/\s/g, '')
          return (
            <div key={idx}>
              <label className="block text-sm font-semibold mb-1">{label}</label>
              <input
                type="text"
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded bg-white text-text"
              />
            </div>
          )
        })}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded text-sm font-semibold hover:bg-gray-900"
        >
          {loading ? 'Processing...' : 'Start for $199'}
        </button>
      </div>
    </section>
  )
}
