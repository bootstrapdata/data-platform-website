import { decisionModel, verdictClass } from '@/content/site';

export default function DecisionModel() {
  const { heading, intro, items } = decisionModel;

  return (
    <section className="section decision-section" id="decision-model" aria-labelledby="decision-heading">
      <div className="site-container">
        <header className="section-header reveal">
          <h2 id="decision-heading" className="section-heading section-heading--centered">
            {heading}
          </h2>
          <p className="section-intro">{intro}</p>
        </header>

        <div className="decision-grid reveal-group" role="list">
          {items.map((item) => (
            <article
              key={item.verdict}
              className={`decision-card ${verdictClass(item.verdict)}`}
              role="listitem"
              data-spotlight
            >
              <p
                className={`decision-badge ${verdictClass(item.verdict)}`}
                aria-label={`Decision: ${item.verdict}`}
              >
                {item.verdict}
              </p>
              <h3 className="decision-card__headline">{item.headline}</h3>
              <p className="decision-card__body">{item.body}</p>
              <p className="decision-card__detail">{item.detail}</p>
              <div className="decision-code">
                <pre>
                  <code>{item.snippet}</code>
                </pre>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
