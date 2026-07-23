import { useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';
import { evalEvents, consentProfiles, evaluatePolicy, verdictClass } from '@/content/site';
import { useTypewriter } from '@/lib/useTypewriter';

/** A combo that deterministically resolves to BLOCK — used by "Try a risky event". */
const RISKY = { eventId: 'ad_attributed', consentId: 'none' } as const;

export default function PolicyEvaluator() {
  const [eventId, setEventId] = useState('checkout_started');
  const [consentId, setConsentId] = useState('analytics');

  const result = evaluatePolicy(eventId, consentId);
  const selectedEvent = evalEvents.find((e) => e.id === eventId) ?? evalEvents[0];
  const { shown: traceShown, typing } = useTypewriter(result.trace);

  const isRiskyActive = eventId === RISKY.eventId && consentId === RISKY.consentId;

  function tryRisky() {
    setEventId(RISKY.eventId);
    setConsentId(RISKY.consentId);
  }

  return (
    <div className="evaluator-panel" aria-label="Illustrative policy model">
      <div className="evaluator-topbar">
        <p className="evaluator-disclosure">
          Illustrative policy model — deterministic browser demo, not live product telemetry.
        </p>
        <button
          type="button"
          className="evaluator-risky"
          aria-pressed={isRiskyActive}
          onClick={tryRisky}
        >
          <Zap aria-hidden="true" size={13} />
          Try a risky event
        </button>
      </div>

      {/* Event selector */}
      <div className="evaluator-field">
        <span className="evaluator-field-label" id="eval-event-label">
          Event type
        </span>
        <div className="evaluator-options" role="group" aria-labelledby="eval-event-label">
          {evalEvents.map((ev) => (
            <button
              key={ev.id}
              type="button"
              className="evaluator-option"
              aria-pressed={ev.id === eventId}
              onClick={() => setEventId(ev.id)}
            >
              <code className="evaluator-option-code">{ev.label}</code>
              <span className="evaluator-option-desc">{ev.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Consent selector */}
      <div className="evaluator-field">
        <span className="evaluator-field-label" id="eval-consent-label">
          Consent profile
        </span>
        <div
          className="evaluator-options evaluator-options--row"
          role="group"
          aria-labelledby="eval-consent-label"
        >
          {consentProfiles.map((cp) => (
            <button
              key={cp.id}
              type="button"
              className="evaluator-option evaluator-option--compact"
              aria-pressed={cp.id === consentId}
              onClick={() => setConsentId(cp.id)}
            >
              <strong>{cp.label}</strong>
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className={`evaluator-result ${verdictClass(result.decision)}`}>
        <div
          className="evaluator-verdict-row"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Decision outcome: ${result.decision}`}
        >
          <span
            key={`${eventId}-${consentId}`}
            className={`evaluator-verdict-badge ${verdictClass(result.decision)}`}
          >
            {result.decision}
          </span>
          {result.destinations.length > 0 ? (
            <ul
              key={`dest-${eventId}-${consentId}`}
              className="evaluator-dests"
              aria-label="Forwarded to destinations"
            >
              {result.destinations.map((d, i) => (
                <li
                  key={d}
                  className="evaluator-dest-chip"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {d}
                </li>
              ))}
            </ul>
          ) : (
            <span className="evaluator-destinations evaluator-destinations--blocked">
              No destinations — event blocked
            </span>
          )}
        </div>

        <p
          className={`evaluator-omitted${
            result.omittedFields.length === 0 ? ' evaluator-omitted--empty' : ''
          }`}
          aria-hidden={result.omittedFields.length === 0}
        >
          {result.omittedFields.length > 0 ? (
            <>
              <span>Omitted fields:</span> <code>{result.omittedFields.join(', ')}</code>
            </>
          ) : (
            <span aria-hidden="true">&nbsp;</span>
          )}
        </p>

        <div className="evaluator-trace" aria-label="Decision trace" aria-live="off">
          <pre>
            <code>
              {traceShown}
              {typing && <span className="evaluator-caret" aria-hidden="true" />}
            </code>
          </pre>
        </div>

        <p className="evaluator-event-fields" aria-label="Inspected fields">
          {Object.entries(selectedEvent.fields).map(([k, v], i) => (
            <span
              key={`${eventId}-${k}`}
              className={`evaluator-field-chip ${
                result.omittedFields.includes(k) ? 'evaluator-field-chip--omitted' : ''
              }`}
              style={{ '--i': i } as React.CSSProperties}
            >
              <code>{k}</code>
              <span>{v}</span>
            </span>
          ))}
        </p>
      </div>

      <a className="evaluator-link" href="#decision-model">
        See how every verdict is defined
        <ChevronDown aria-hidden="true" size={14} />
      </a>
    </div>
  );
}
