import { X, Check } from 'lucide-react';
import { businessNarrative } from '@/content/site';

export default function BusinessCase() {
  const { problem, solution } = businessNarrative;

  return (
    <section className="section narrative-section" id="narrative" aria-labelledby="narrative-heading">
      <div className="site-container">
        <div className="narrative-grid reveal-group">
          {/* Before */}
          <div className="narrative-col narrative-col--before">
            <span className="section-eyebrow">{problem.eyebrow}</span>
            <h2 id="narrative-heading" className="section-heading">
              {problem.heading}
            </h2>
            <p className="narrative-intro">{problem.intro}</p>
            <ul className="narrative-list" role="list">
              {problem.items.map((item) => (
                <li key={item.id} className="narrative-item narrative-item--problem">
                  <span className="narrative-marker" aria-hidden="true">
                    <X size={14} strokeWidth={2.5} />
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="narrative-col narrative-col--after">
            <span className="section-eyebrow">{solution.eyebrow}</span>
            <h2 className="section-heading">{solution.heading}</h2>
            <p className="narrative-intro">{solution.intro}</p>
            <ul className="narrative-list" role="list">
              {solution.items.map((item) => (
                <li key={item.id} className="narrative-item narrative-item--solution">
                  <span className="narrative-marker" aria-hidden="true">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
