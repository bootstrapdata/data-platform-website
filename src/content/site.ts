/**
 * All site copy lives here in one typed file.
 *
 * PUBLIC REPOSITORY — marketing content only. Do NOT add anything internal or
 * confidential: no architecture details, service names/ports, infra, JDL,
 * credentials, customer names, or private URLs. This file is the single place
 * to review before every publish.
 *
 * Evidence/claim rules: safe to assert — Segment-compatible event shapes,
 * versioned contracts, generated clients (TS/Java/Kotlin/Swift/Python),
 * source types, reusable blueprints, PII/SPII matcher models, ALLOW/BLOCK/OMIT
 * policy configuration, consent-to-destination mapping, permissioned audit
 * history, and modular ingestion/control-plane architecture.
 * Do NOT claim: live runtime enforcement, production-ready connectors,
 * compliance certification, customer outcomes, or verified throughput.
 */

// ---------------------------------------------------------------------------
// Primitive types
// ---------------------------------------------------------------------------

export type DecisionVerdict = 'ALLOW' | 'BLOCK' | 'OMIT';

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

export const brand = {
  name: 'Bootstrap Data',
  domain: 'bootstrapdata.in',
  tagline: 'Governance-native control plane for first-party customer data.',
  email: 'contact@bootstrapdata.in',
  earlyAccessSubject: 'Bootstrap%20Data%20early%20access',
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const nav = {
  links: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Decision model', href: '#decision-model' },
    { label: 'Platform', href: '#platform' },
    { label: 'Use cases', href: '#use-cases' },
  ] satisfies readonly NavLink[],
  cta: {
    label: 'Request early access',
    href: `mailto:contact@bootstrapdata.in?subject=Bootstrap%20Data%20early%20access`,
  },
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: 'Data control plane',
  headline: 'The control plane for customer data you can trust.',
  subhead: 'Define what data should be allowed to become before it moves downstream.',
  body: 'Bootstrap Data brings versioned contracts, sensitive-data policies, and consent mappings into one source configuration — giving teams a shared model for each downstream decision.',
  primary: {
    label: 'Request early access',
    href: `mailto:contact@bootstrapdata.in?subject=Bootstrap%20Data%20early%20access`,
  },
  secondary: { label: 'Explore how it works', href: '#how-it-works' },
  evaluatorCta: { label: 'Try the decision model', href: '#decision-model' },
} as const;

// ---------------------------------------------------------------------------
// Business narrative (problem → solution)
// ---------------------------------------------------------------------------

export const businessNarrative = {
  problem: {
    heading: 'The problem every data team knows.',
    intro:
      'Most data platforms trust first and govern later. Data spreads across warehouses, analytics tools, and ad platforms before anyone asks whether it should have.',
    items: [
      {
        id: 'schema-drift',
        text: 'Events reach downstream tools before anyone reviews a schema change.',
      },
      {
        id: 'pii-boundary',
        text: 'PII reaches warehouses and ad platforms because no single layer owns the boundary.',
      },
      {
        id: 'consent-gap',
        text: 'Consent is captured in a banner and forgotten the moment data starts flowing.',
      },
      {
        id: 'governance-lag',
        text: 'Governance is a quarterly audit, not a property of the pipeline itself.',
      },
      {
        id: 'policy-handoff',
        text: 'Policy handoffs between engineering and legal slow every launch that touches user data.',
      },
    ],
  },
  solution: {
    heading: 'One control plane changes the equation.',
    intro:
      'Bootstrap Data inverts that order by bringing contracts, sensitive-data policies, and consent mappings into the same layer where each source is configured.',
    items: [
      {
        id: 'versioned-contracts',
        text: 'Define an explicit, versioned contract for each event type.',
      },
      {
        id: 'sensitive-data-policy',
        text: 'PII and SPII fields are modeled and classified, making sensitive-data policy visible and reviewable.',
      },
      {
        id: 'consent-routing',
        text: 'Consent categories map directly to destination routing decisions in the same model.',
      },
      {
        id: 'auditable-config',
        text: 'Governance configuration is centralized, permissioned, and auditable across teams.',
      },
      {
        id: 'reusable-blueprints',
        text: 'Reusable synchronized blueprints eliminate redundant work as sources multiply.',
      },
    ],
  },
  controlPlane: {
    heading: 'Governance as an engineering workflow.',
    body: 'Engineering teams already configure data pipelines. The question is whether governance is modeled at that layer or reconstructed after data has spread. Bootstrap Data makes governance a first-class engineering concern: versioned, reviewable, and connected to each source configuration.',
    wedge:
      'Start with governance at source configuration. Extend the same model across collection, contracts, privacy policy, storage, and activation.',
    footnote:
      'Bootstrap Data is in early access. Capabilities described here are in active development and access is limited.',
  },
} as const;

// ---------------------------------------------------------------------------
// Decision model (ALLOW / BLOCK / OMIT)
// ---------------------------------------------------------------------------

export const decisionModel = {
  heading: 'Three decisions. One shared language.',
  intro:
    'The policy model makes each intended data movement explicit: allow it, block it, or omit sensitive fields.',
  items: [
    {
      verdict: 'ALLOW' as DecisionVerdict,
      headline: 'Retain and route',
      body: 'Use ALLOW when an event matches its contract, required consent is present, and its fields are approved for declared destinations.',
      detail:
        'The configuration describes the complete proposed payload and the destinations eligible to receive it.',
      snippet: 'decision: ALLOW\ndestinations: [warehouse, analytics, activation]',
    },
    {
      verdict: 'BLOCK' as DecisionVerdict,
      headline: 'Stop at the door',
      body: 'Use BLOCK to model a stop condition such as missing consent, a contract mismatch, or an explicit propagation rule.',
      detail:
        'The blocking condition stays visible in policy configuration so engineering and governance teams can review the same intent.',
      snippet: 'decision: BLOCK\nreason: consent_missing:advertising',
    },
    {
      verdict: 'OMIT' as DecisionVerdict,
      headline: 'Strip, then route',
      body: 'Use OMIT to define which PII or SPII fields should be removed before an event is forwarded.',
      detail:
        'The model identifies the proposed minimized payload and the propagation rule responsible for each omitted field.',
      snippet: 'decision: OMIT\nremoved: [email, date_of_birth]\ndestinations: [warehouse, analytics]',
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// How it works — living lineage stages (Capture → … → Audit)
// ---------------------------------------------------------------------------

export interface WorkflowStage {
  readonly id: string;
  readonly number: string;
  readonly label: string;
  readonly headline: string;
  readonly body: string;
  readonly technical: string;
  readonly snippet: string;
}

export const howItWorks = {
  heading: 'Follow one event through the policy model.',
  subhead:
    'A source configuration connects five concerns — collection, contracts, governance, routing intent, and configuration audit — in one coherent model.',
  stages: [
    {
      id: 'capture',
      number: '01',
      label: 'Capture',
      headline: 'Familiar signals, one collection surface.',
      body: 'Accept Segment-compatible events from web, mobile, server, and batch sources. Familiar event shapes — track, page, screen, identify, group — work without pipeline rewrites.',
      technical:
        'Generated type-safe clients for TypeScript, Java, Kotlin, Swift, and Python. Source types: Android, iOS, JavaScript, Unity, Direct API.',
      snippet:
        'bd.track("checkout_started", {\n  cart_value: 149.00,\n  currency: "USD",\n  user_id: "u_7732"\n});',
    },
    {
      id: 'contract',
      number: '02',
      label: 'Contract',
      headline: 'Give every event a versioned shape.',
      body: 'Define reusable event and property blueprints that become the single explicit contract across all sources. Synchronized read-only copies let teams consume without diverging.',
      technical:
        'Versioned OpenAPI contracts generate clients in five languages. Reusable event and property blueprints share definitions across sources.',
      snippet:
        'contract: checkout_started @ v3\nblueprint: ecommerce/checkout\nrequired: [cart_value, currency]',
    },
    {
      id: 'govern',
      number: '03',
      label: 'Govern',
      headline: 'PII and consent, modeled explicitly.',
      body: 'Fields are classified as PII or SPII using key, value, and regex matcher models. Consent categories are mapped to what was actually granted, with propagation policy configured per rule.',
      technical:
        'PII/SPII key/value/regex matchers. Allow/block/omit propagation policy configuration. Consent category to destination mapping.',
      snippet:
        'fields.user_email: PII  → omit_rule: strip_before_route\nfields.date_of_birth: SPII → omit_rule: strip_always\nconsent.analytics: granted',
    },
    {
      id: 'route',
      number: '04',
      label: 'Route',
      headline: 'Model ALLOW, BLOCK, or OMIT.',
      body: 'Connect governance policy to destination configuration so intended data movement is explicit and reviewable. Destination field filters and mappings share the same governance model.',
      technical:
        'Lake, warehouse, and destination models. Destination field filters and mappings. Consent-gated routing configuration.',
      snippet:
        'decision: OMIT\nremoved: [user_email, date_of_birth]\nproposed_destinations:\n  - warehouse   ✓ (analytics consent)\n  - activation  ✗ (advertising consent absent)',
    },
    {
      id: 'audit',
      number: '05',
      label: 'Audit',
      headline: 'Every configuration change, traceable.',
      body: 'Review policy and connection history so teams can understand who changed the control plane and when. Permissioned mutations mean governance changes require explicit authorization.',
      technical:
        'Permissioned configuration mutations. Entity history for governance and connection changes.',
      snippet:
        'policy.version: 14\nchange: propagation_rule.updated\nactor: data-platform-team\ntimestamp: 2025-06-12T09:14:22Z',
    },
  ] satisfies readonly WorkflowStage[],
} as const;

// ---------------------------------------------------------------------------
// Platform capabilities (technical credibility)
// ---------------------------------------------------------------------------

export const platform = {
  heading: 'Built for engineering teams that think in contracts.',
  subhead:
    'Each capability is independently deployable and modular — ingestion scales separately from the control plane.',
  capabilities: [
    {
      id: 'segment-compat',
      icon: 'Zap' as const,
      label: 'Segment-compatible collection',
      detail:
        'Drop-in ingestion for events already shaped for Segment-style pipelines. track, page, screen, identify, group, alias, and batch shapes all supported.',
    },
    {
      id: 'generated-clients',
      icon: 'Code2' as const,
      label: 'Contract-generated clients',
      detail:
        'Versioned OpenAPI contracts generate type-safe clients for TypeScript, Java, Kotlin, Swift, and Python. Clients stay in sync as contracts evolve.',
    },
    {
      id: 'blueprints',
      icon: 'Copy' as const,
      label: 'Reusable blueprints',
      detail:
        'Define event and property blueprints once. Synchronize read-only copies to sources, or snapshot an editable copy for local customization.',
    },
    {
      id: 'pii-spii',
      icon: 'ShieldCheck' as const,
      label: 'PII / SPII classification',
      detail:
        'Model sensitive fields using key, value, and regex matchers. Configure allow, block, or omit propagation policies per rule, per destination.',
    },
    {
      id: 'consent',
      icon: 'ToggleRight' as const,
      label: 'Consent-gated routing',
      detail:
        'Map consent categories directly to destination routing decisions. Configuration is versioned and reviewable alongside data contracts.',
    },
    {
      id: 'audit',
      icon: 'History' as const,
      label: 'Permissioned audit history',
      detail:
        'Every governance mutation requires explicit authorization. Policy version, actor, and timestamp are recorded against configuration changes.',
    },
  ],
  sources: {
    label: 'Source types',
    items: ['Android', 'iOS', 'JavaScript', 'Unity', 'Direct API'],
  },
  clients: {
    label: 'Generated clients',
    items: ['TypeScript', 'Java', 'Kotlin', 'Swift', 'Python'],
  },
} as const;

// ---------------------------------------------------------------------------
// Use cases / personas
// ---------------------------------------------------------------------------

export const useCases = {
  heading: 'One control plane. Every team that touches data.',
  items: [
    {
      id: 'platform-eng',
      icon: 'Code2' as const,
      role: 'Data platform engineers',
      headline: 'Replace ad-hoc pipeline policies with versioned configuration.',
      outcomes: [
        'Define data contracts once; reuse them across every source.',
        'Make schema changes explicit and reviewable at the contract layer.',
        'Review destination policy centrally instead of source by source.',
        'Reduce migration work with familiar Segment-compatible event shapes.',
      ],
    },
    {
      id: 'analytics-eng',
      icon: 'BarChart3' as const,
      role: 'Analytics engineers',
      headline: 'Make trust requirements explicit before data reaches your models.',
      outcomes: [
        'Keep declared event contracts and schema rules visible in one model.',
        'Define the minimized payload each destination should receive.',
        'Connect warehouse mapping intent to the governing source policy.',
        'Review governance configuration through a normal change workflow.',
      ],
    },
    {
      id: 'privacy-gov',
      icon: 'Lock' as const,
      role: 'Privacy and governance teams',
      headline: 'Make privacy decisions explicit, not archaeological.',
      outcomes: [
        'Model PII and SPII classifications in the same layer as source configuration.',
        'See consent-to-destination mappings in one reviewable model.',
        'Use configuration history to review who changed which policy and when.',
        'Align engineering and legal on one shared data language.',
      ],
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// CTA section
// ---------------------------------------------------------------------------

export const ctaSection = {
  heading: 'Design a decision for every event.',
  subhead:
    'Bootstrap Data is in early access. Capabilities are in active development and the initial cohort is limited.',
  primary: {
    label: 'Request early access',
    href: `mailto:contact@bootstrapdata.in?subject=Bootstrap%20Data%20early%20access`,
  },
  secondary: { label: 'Explore how it works', href: '#how-it-works' },
  footnote: 'Tell us about your data stack and the governance problem you want to solve.',
} as const;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footer = {
  tagline: 'Governance-native control plane for first-party customer data.',
  links: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Decision model', href: '#decision-model' },
    { label: 'Platform', href: '#platform' },
    { label: 'Use cases', href: '#use-cases' },
    {
      label: 'Request access',
      href: `mailto:contact@bootstrapdata.in?subject=Bootstrap%20Data%20early%20access`,
    },
  ] satisfies readonly NavLink[],
  legal: `© ${new Date().getFullYear()} Bootstrap Data. All rights reserved.`,
  disclaimer: 'Capabilities described on this page are in active development. Access is limited.',
} as const;

// ---------------------------------------------------------------------------
// Policy evaluator — illustrative frontend demo
// ---------------------------------------------------------------------------

export interface EvalEvent {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly fields: Readonly<Record<string, string>>;
  readonly piiFields: readonly string[];
  readonly spiiFields: readonly string[];
  readonly requiredConsent: readonly string[];
}

export interface ConsentProfile {
  readonly id: string;
  readonly label: string;
  readonly categories: readonly string[];
}

export interface EvalResult {
  readonly decision: DecisionVerdict;
  readonly destinations: readonly string[];
  readonly omittedFields: readonly string[];
  readonly trace: string;
}

export const evalEvents: readonly EvalEvent[] = [
  {
    id: 'page_view',
    label: 'page_view',
    description: 'Anonymous page visit — no user-linked fields',
    fields: {
      event: 'page_view',
      page: '/pricing',
      session_id: 's_8a92',
      timestamp: '2025-01-15T14:32:01Z',
    },
    piiFields: [],
    spiiFields: [],
    requiredConsent: [],
  },
  {
    id: 'checkout_started',
    label: 'checkout_started',
    description: 'Purchase intent — includes PII (user_email)',
    fields: {
      event: 'checkout_started',
      cart_value: '149.00',
      currency: 'USD',
      user_email: 'u@example.com',
    },
    piiFields: ['user_email'],
    spiiFields: [],
    requiredConsent: ['analytics'],
  },
  {
    id: 'user_identified',
    label: 'user_identified',
    description: 'Identity event — PII + SPII fields',
    fields: {
      event: 'user_identified',
      name: 'Alex Chen',
      email: 'alex@example.com',
      date_of_birth: '1990-04-22',
    },
    piiFields: ['name', 'email'],
    spiiFields: ['date_of_birth'],
    requiredConsent: ['functional'],
  },
  {
    id: 'ad_attributed',
    label: 'ad_attributed',
    description: 'Ad attribution — requires explicit advertising consent',
    fields: {
      event: 'ad_attributed',
      campaign_id: 'c_443',
      gclid: 'IA…X9',
      user_id: 'u_7732',
    },
    piiFields: [],
    spiiFields: [],
    requiredConsent: ['advertising'],
  },
] as const;

export const consentProfiles: readonly ConsentProfile[] = [
  {
    id: 'full',
    label: 'All categories',
    categories: ['analytics', 'functional', 'advertising', 'marketing'],
  },
  { id: 'analytics', label: 'Analytics only', categories: ['analytics'] },
  { id: 'none', label: 'None granted', categories: [] },
] as const;

/** Deterministic frontend evaluation — illustrative only, not live product telemetry. */
export function evaluatePolicy(eventId: string, consentId: string): EvalResult {
  const event = evalEvents.find((e) => e.id === eventId) ?? evalEvents[0];
  const consent = consentProfiles.find((c) => c.id === consentId) ?? consentProfiles[0];

  const missingConsent = event.requiredConsent.filter((r) => !consent.categories.includes(r));

  if (missingConsent.length > 0) {
    return {
      decision: 'BLOCK',
      destinations: [],
      omittedFields: [],
      trace: [
        `event:    ${event.id}`,
        `consent:  ${consent.label}`,
        `─────────────────────────────`,
        `decision: BLOCK`,
        `reason:   consent_missing:${missingConsent.join(',')}`,
        `fields:   ${Object.keys(event.fields).length} inspected, 0 forwarded`,
      ].join('\n'),
    };
  }

  const hasFullConsent =
    consent.categories.includes('marketing') || consent.categories.includes('functional');
  const sensitiveFields = [...event.piiFields, ...event.spiiFields];
  const fieldsToOmit = hasFullConsent ? [] : sensitiveFields;

  if (fieldsToOmit.length > 0) {
    return {
      decision: 'OMIT',
      destinations: ['warehouse', 'analytics'],
      omittedFields: fieldsToOmit,
      trace: [
        `event:    ${event.id}`,
        `consent:  ${consent.label}`,
        `─────────────────────────────`,
        `decision: OMIT`,
        `removed:  [${fieldsToOmit.join(', ')}]`,
        `proposed: warehouse, analytics`,
        `blocked:  activation (pii_present)`,
      ].join('\n'),
    };
  }

  return {
    decision: 'ALLOW',
    destinations: ['warehouse', 'analytics', 'activation'],
    omittedFields: [],
    trace: [
      `event:    ${event.id}`,
      `consent:  ${consent.label}`,
      `─────────────────────────────`,
      `decision: ALLOW`,
      `fields:   ${Object.keys(event.fields).length} passed, 0 removed`,
      `proposed: warehouse, analytics, activation`,
    ].join('\n'),
  };
}
