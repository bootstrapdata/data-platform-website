import { X, Check } from 'lucide-react';
import { businessNarrative } from '@/content/site';

export default function BusinessCase() {
  const { problem, solution, controlPlane } = businessNarrative;

  return (
    <>
      {/* Problem / Solution */}
      <section className="section narrative-section" id="narrative" aria-labelledby="narrative-heading">
        <div className="site-container">
          <div className="narrative-grid reveal-group">
            {/* Before */}
            <div className="narrative-col narrative-col--before">
              <h2 id="narrative-heading" className="section-heading">
                {problem.heading}
              </h2>
              <p className="narrative-intro">{problem.intro}</p>
              <ul className="narrative-list" role="list">
                {problem.items.map((item) => (
                  <li key={item.id} className="narrative-item narrative-item--problem">
                    <span className="narrative-marker" aria-hidden="true">
                      <X size={14} />
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="narrative-col narrative-col--after">
              <h2 className="section-heading">{solution.heading}</h2>
              <p className="narrative-intro">{solution.intro}</p>
              <ul className="narrative-list" role="list">
                {solution.items.map((item) => (
                  <li key={item.id} className="narrative-item narrative-item--solution">
                    <span className="narrative-marker" aria-hidden="true">
                      <Check size={14} />
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Control plane value proposition */}
      <section
        className="section control-plane-section"
        id="control-plane"
        aria-labelledby="control-plane-heading"
      >
        <div className="site-container">
          <div className="control-plane-inner reveal">
            <h2 id="control-plane-heading" className="section-heading section-heading--centered">
              {controlPlane.heading}
            </h2>
            <p className="control-plane-body">{controlPlane.body}</p>
            <div className="control-plane-wedge">
              <p className="control-plane-wedge-text">{controlPlane.wedge}</p>
            </div>
            <p className="control-plane-footnote">{controlPlane.footnote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
