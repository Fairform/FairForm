export default function PricingPage() {
  return (
    <section className="py-section">
      <h1 className="text-heading font-bold mb-10">Choose Your Plan</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: 'Lite',
            price: '$199',
            features: ['✓ Full PDF compliance pack', '✓ 1 industry', '✗ No editing', '✗ No updates'],
            cta: 'Start for $199',
            href: '/generate/ndis'
          },
          {
            title: 'Pro',
            price: '$119/month',
            features: ['✓ PDF + editable DOCX', '✓ All industries', '✓ Future updates', '✓ Compliance alerts'],
            cta: 'Subscribe to Pro',
            href: '/upgrade/pro'
          },
          {
            title: 'Enterprise',
            price: 'Custom',
            features: ['✓ All Pro features', '✓ API access', '✓ Custom onboarding', '✓ Quarterly audits'],
            cta: 'Contact Sales',
            href: 'mailto:enterprise@fairform.co'
          }
        ].map((plan, idx) => (
          <div key={idx} className="border rounded-lg p-6 shadow-card bg-white">
            <h2 className="text-xl font-semibold mb-2 uppercase tracking-wide">{plan.title}</h2>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="space-y-2 text-sm text-darkgray mb-6">
              {plan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <a href={plan.href} className="block bg-black text-white py-2 px-4 text-center rounded hover:bg-gray-900">
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
