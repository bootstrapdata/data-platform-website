import { ArrowRight } from 'lucide-react';
import { ctaSection } from '@/content/site';

export default function AccessCta() {
  const { heading, subhead, primary, secondary, footnote } = ctaSection;

  return (
    <section className="section cta-section" id="request-access" aria-labelledby="cta-heading">
      <div className="site-container cta-inner reveal">
        <h2 id="cta-heading" className="cta-heading">
          {heading}
        </h2>
        <p className="cta-subhead">{subhead}</p>

        <div className="cta-buttons">
          <a href={primary.href} className="btn btn--primary btn--lg">
            {primary.label}
            <ArrowRight aria-hidden="true" size={16} />
          </a>
          <a href={secondary.href} className="btn btn--ghost btn--lg">
            {secondary.label}
          </a>
        </div>

        <p className="cta-footnote">{footnote}</p>
      </div>
    </section>
  );
}
