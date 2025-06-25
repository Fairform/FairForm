const industries = [
  'NDIS',
  'Healthcare',
  'Aged Care',
  'Construction',
  'Childcare',
  'Transport',
  'Retail',
  'Hospitality',
  'Trades',
  'Tech Startups'
]

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto py-20">
      <h1 className="text-3xl font-bold mb-8">Choose Your Industry</h1>
      <ul className="space-y-4">
        {industries.map((industry, i) => (
          <li key={i}>
            <a
              href={`/generate/${industry.toLowerCase().replace(/\s+/g, '-')}`}
              className="block border p-4 rounded hover:bg-gray-100"
            >
              {industry}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
