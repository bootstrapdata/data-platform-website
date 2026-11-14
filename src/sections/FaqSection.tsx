import { Plus } from 'lucide-react';
import { faq } from '@/content/site';

const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}).replace(/</g, '\\u003c');

export default function FaqSection() {
  const { eyebrow, heading, items } = faq;

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="site-container faq-layout">
        <header className="faq-header reveal">
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 id="faq-heading" className="section-heading">
            {heading}
          </h2>
        </header>

        <div className="faq-list reveal">
          {items.map((item) => (
            <details key={item.id} className="faq-item" id={`faq-${item.id}`}>
              <summary className="faq-item__q">
                <span>{item.question}</span>
                <Plus className="faq-item__icon" aria-hidden="true" size={18} />
              </summary>
              <p className="faq-item__a">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
    </section>
  );
}
