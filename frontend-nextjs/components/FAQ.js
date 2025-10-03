'use client'

import Script from 'next/script'

export default function FAQ({ items = [], title = 'Frequently Asked Questions' }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
    })),
  }

  return (
    <section style={{ background: '#f9fafb', borderRadius: 12, padding: 24 }}>
      <h2 style={{ marginBottom: 16, color: '#111827', textAlign: 'center' }}>{title}</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((it, idx) => (
          <details key={idx} style={{ background: '#fff', borderRadius: 10, padding: 16, border: '1px solid #e5e7eb' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#111827' }}>{it.q}</summary>
            <div style={{ marginTop: 8, color: '#374151' }} dangerouslySetInnerHTML={{ __html: it.a }} />
          </details>
        ))}
      </div>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
    </section>
  )
}
