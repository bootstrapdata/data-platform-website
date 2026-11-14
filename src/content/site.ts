/**
 * All site copy lives here in one typed file.
 *
 * PUBLIC REPOSITORY — marketing content only. Do NOT add anything internal or
 * confidential: no architecture details, internal service names/ports, infra
 * topology, schema/JDL, credentials, customer names, or private URLs. This
 * file is the single place to review before every publish.
 *
 * Claim rules (every statement must be backed by shipped code or a published
 * spec; review the product repositories before changing a claim):
 * - Status labels are mandatory and honest:
 *     available       — in a tagged product release.
 *     early-access    — merged and shipping in the next release; not yet GA.
 *     in-development  — designed/specified, NOT available (e.g. Reverse ETL).
 *   Use "designed to" language for in-development features.
 * - Safe to assert: Segment-compatible call types, intake enforcement
 *   (Allow/Block/Omit), consent gates that fail closed, the listed sources,
 *   lakes, warehouses and destinations, at-least-once delivery with retries and
 *   a dead-letter queue, hashed identifiers, deletion/suppression requests,
 *   fine-grained roles with OIDC SSO, audit history, write-only encrypted
 *   credentials, SBOM + signed build provenance, the BYOC clouds and the
 *   usage-only metering boundary.
 * - Do NOT claim: compliance certifications or attestations, exactly-once
 *   delivery, throughput/latency numbers, SLAs, hosting regions, customer
 *   logos or outcomes, or anything about competitors by name.
 */

// ---------------------------------------------------------------------------
// Primitive types
// ---------------------------------------------------------------------------

export type DecisionVerdict = 'ALLOW' | 'BLOCK' | 'OMIT';

/** CSS modifier class for a verdict (shared by the decision cards and the evaluator). */
export function verdictClass(v: DecisionVerdict): string {
  return `verdict--${v.toLowerCase()}`;
}

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export type FeatureStatus = 'available' | 'early-access' | 'in-development';

export const statusLabels: Readonly<Record<FeatureStatus, string>> = {
  available: 'Available',
  'early-access': 'Early access',
  'in-development': 'In development',
};

// ---------------------------------------------------------------------------
// Brand & contact
// ---------------------------------------------------------------------------

export const brand = {
  name: 'Bootstrap Data',
  email: 'contact@bootstrapdata.in',
} as const;

function mailto(subject: string): string {
  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}`;
}

/** Primary conversion: talk to us / book a demo. */
export const demoHref = mailto('Bootstrap Data demo request');
/** Reverse ETL design-partner enquiries. */
export const designPartnerHref = mailto('Bootstrap Data Reverse ETL design partner');

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const nav = {
  links: [
    { label: 'Platform', href: '#platform' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Deployment', href: '#deployment' },
    { label: 'Security', href: '#security' },
    { label: 'FAQ', href: '#faq' },
  ] satisfies readonly NavLink[],
  cta: {
    label: 'Book a demo',
    href: demoHref,
  },
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: 'Customer data platform · Your cloud or ours',
  headline: 'Customer data you can trust, from the first event to every destination.',
  /** Phrase inside the headline that receives the gradient accent. */
  accent: 'you can trust',
  subhead: 'Collect, govern, unify and activate first-party data with privacy built into the pipeline.',
  body: 'Bootstrap Data checks every event against your tracking plan, sensitive-data rules and customer consent before it reaches a warehouse, data lake or marketing tool. Run it in your own cloud account, or let us run it for you.',
  primary: {
    label: 'Book a demo',
    href: demoHref,
  },
  secondary: { label: 'See how it works', href: '#how-it-works' },
} as const;

// ---------------------------------------------------------------------------
// Trust strip — factual pillars shown directly under the hero.
// ---------------------------------------------------------------------------

export interface TrustPillar {
  readonly id: string;
  readonly icon: 'ShieldCheck' | 'Waypoints' | 'Cloud' | 'History';
  readonly title: string;
  readonly text: string;
}

export const trustStrip = {
  label: 'Governance that runs in the pipeline, not in a quarterly audit',
  pillars: [
    {
      id: 'enforced-at-intake',
      icon: 'ShieldCheck',
      title: 'Enforced at intake',
      text: 'Each event is checked against its contract and privacy rules before it moves.',
    },
    {
      id: 'consent-fails-closed',
      icon: 'Waypoints',
      title: 'Consent fails closed',
      text: 'A tool only receives a record when the consent it needs has been granted.',
    },
    {
      id: 'your-cloud-or-ours',
      icon: 'Cloud',
      title: 'Your cloud or ours',
      text: 'Deploy in your AWS, Google Cloud, Azure or Oracle Cloud account, or use our managed cloud.',
    },
    {
      id: 'audited',
      icon: 'History',
      title: 'Audited by default',
      text: 'Every configuration change is recorded with who made it and when.',
    },
  ] satisfies readonly TrustPillar[],
} as const;

// ---------------------------------------------------------------------------
// Business narrative (problem → solution)
// ---------------------------------------------------------------------------

export const businessNarrative = {
  problem: {
    eyebrow: 'The problem',
    heading: 'Customer data moves faster than the rules meant to protect it.',
    intro:
      'In most stacks, data is copied into warehouses, analytics and ad platforms first. Governance happens later, by hand, if at all.',
    items: [
      {
        id: 'schema-drift',
        text: 'Broken or unplanned events reach dashboards and campaigns before anyone notices.',
      },
      {
        id: 'pii-boundary',
        text: 'Personal data ends up in tools that were never meant to hold it.',
      },
      {
        id: 'consent-gap',
        text: 'Consent is collected in a banner, then ignored once data starts flowing.',
      },
      {
        id: 'deletion-sprawl',
        text: 'A single deletion request becomes a manual hunt across every system.',
      },
      {
        id: 'data-residency',
        text: 'Security teams push back on sending raw customer data to another vendor’s cloud.',
      },
    ],
  },
  solution: {
    eyebrow: 'The Bootstrap Data way',
    heading: 'Decide what data may do before it moves.',
    intro:
      'Bootstrap Data puts your tracking plan, privacy rules and consent in the path of every event, then delivers only what passes.',
    items: [
      {
        id: 'contracts',
        text: 'Versioned data contracts define what each source is allowed to send.',
      },
      {
        id: 'sensitive-data',
        text: 'Personal and sensitive fields are classified and removed or blocked automatically.',
      },
      {
        id: 'consent',
        text: 'Consent categories decide which destinations may receive each record.',
      },
      {
        id: 'privacy-requests',
        text: 'Deletion and suppression requests reach every connected store and tool from one place.',
      },
      {
        id: 'byoc',
        text: 'Run it inside your own cloud account, so event data and personal data stay there.',
      },
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// Platform — the customer data lifecycle
// ---------------------------------------------------------------------------

export type ModuleIcon =
  | 'Radio'
  | 'ShieldCheck'
  | 'Wand2'
  | 'Database'
  | 'Fingerprint'
  | 'Send'
  | 'Activity'
  | 'UserX'
  | 'Bot'
  | 'FileCode2';

export interface PlatformModule {
  readonly id: string;
  readonly icon: ModuleIcon;
  readonly stage: string;
  readonly title: string;
  readonly summary: string;
  readonly points: readonly string[];
  readonly status: FeatureStatus;
}

export const platform = {
  eyebrow: 'Platform',
  heading: 'One platform for the whole customer data lifecycle.',
  subhead:
    'Collect events, enforce your rules, build unified profiles and deliver to the tools your teams use, with the same governance at every step.',
  modules: [
    {
      id: 'collect',
      icon: 'Radio',
      stage: 'Collect',
      title: 'Event collection',
      summary: 'One collection layer for web, mobile, game and server events.',
      points: [
        'Android, iOS, JavaScript, Unity and server-side sources',
        'Segment-compatible calls: track, page, screen, identify, group, alias, batch',
        'Per-source write keys and IP allowlists',
      ],
      status: 'available',
    },
    {
      id: 'govern',
      icon: 'ShieldCheck',
      stage: 'Govern',
      title: 'Contracts & privacy rules',
      summary: 'Your tracking plan and privacy policy, enforced on every event.',
      points: [
        'Versioned data contracts built from reusable event and property blueprints',
        'Allow, block or omit unplanned events, unplanned properties, schema violations, PII and sensitive PII',
        'Field classification by name, value or pattern',
      ],
      status: 'available',
    },
    {
      id: 'transform',
      icon: 'Wand2',
      stage: 'Shape',
      title: 'Filters & transformations',
      summary: 'Send each tool exactly the data it needs.',
      points: [
        'Drop or sample events; allow or block fields per destination',
        'Custom JavaScript transformations in a sandbox, at the source or per destination (early access)',
        'Choose what happens on error: dead-letter, drop or pass through',
      ],
      status: 'available',
    },
    {
      id: 'store',
      icon: 'Database',
      stage: 'Store',
      title: 'Warehouses & data lakes',
      summary: 'Own a clean, governed copy of every event.',
      points: [
        'Snowflake, BigQuery and Databricks, with typed tables generated from your tracking plan',
        'Amazon S3 and S3-compatible storage, Google Cloud Storage and Azure Blob Storage',
        'JSON or Parquet, your choice of compression and retention',
      ],
      status: 'available',
    },
    {
      id: 'unify',
      icon: 'Fingerprint',
      stage: 'Unify',
      title: 'Identity resolution & profiles',
      summary: 'Join a customer’s activity into one profile, without storing raw identifiers.',
      points: [
        'Deterministic matching on user ID, anonymous ID, email and phone, by rules you set',
        'Identifiers stored only as keyed hashes; limits and blocklists prevent bad merges',
        'Declared profile traits resolved by rules such as latest value or source priority',
      ],
      status: 'early-access',
    },
    {
      id: 'activate',
      icon: 'Send',
      stage: 'Activate',
      title: 'Destinations',
      summary: 'Deliver governed events to the tools your teams already use.',
      points: [
        'Amplitude, Braze, Customer.io, Google, Iterable, Meta, Mixpanel and any webhook',
        'Field mappings with triggers, so each tool gets the right shape',
        'Automatic retries that respect vendor rate limits, plus a dead-letter queue',
      ],
      status: 'available',
    },
    {
      id: 'debug',
      icon: 'Activity',
      stage: 'Observe',
      title: 'Source debugger',
      summary: 'See what each source sends and what the platform did with it.',
      points: [
        'Live stream of incoming events with personal data masked',
        'Search and filter; compare what was received with what was forwarded',
        'Unmasking is limited to privacy officers and every reveal is audited',
      ],
      status: 'early-access',
    },
    {
      id: 'privacy',
      icon: 'UserX',
      stage: 'Protect',
      title: 'Deletion & suppression requests',
      summary: 'Act on data subject requests across the whole platform.',
      points: [
        'Suppress, delete, or both, by user ID, anonymous ID, email or phone',
        'Erasure across warehouses, lakes, profiles and destinations, with status tracking and manual sign-off where a tool has no deletion API',
        'Record the legal basis: GDPR, CCPA, CPRA, LGPD or India’s DPDP Act',
      ],
      status: 'early-access',
    },
    {
      id: 'ai',
      icon: 'Bot',
      stage: 'Assist',
      title: 'AI assistant access (MCP)',
      summary: 'Let AI assistants work with your tracking plan through the Model Context Protocol.',
      points: [
        'Browse contracts, sources and governance rules',
        'Validate a sample event against its contract before you ship it',
        'Read-only by default; changes need explicit write permission',
      ],
      status: 'available',
    },
    {
      id: 'config-as-code',
      icon: 'FileCode2',
      stage: 'Automate',
      title: 'Configuration as code',
      summary: 'Manage the platform from Git and CI, not just the UI.',
      points: [
        'Command-line tool to export and apply configuration declaratively, with dry runs',
        'Validate events against contracts in CI',
        'Typed tracking clients for TypeScript, Java, Kotlin, Swift and Python',
      ],
      status: 'available',
    },
  ] satisfies readonly PlatformModule[],
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
// Decision model (ALLOW / BLOCK / OMIT)
// ---------------------------------------------------------------------------

export const decisionModel = {
  heading: 'Three decisions. Applied to every event.',
  intro:
    'For each source you choose what happens to unplanned data, schema violations and personal data: allow it, block it, or omit the sensitive fields.',
  items: [
    {
      verdict: 'ALLOW' as DecisionVerdict,
      headline: 'Pass and deliver',
      body: 'The event matches its contract and carries nothing your rules restrict, so it continues to storage and to every destination its consent allows.',
      detail: 'Consent is still checked per destination, so “allowed” never means “sent everywhere”.',
      snippet: 'decision: ALLOW\ndestinations: [warehouse, analytics, activation]',
    },
    {
      verdict: 'BLOCK' as DecisionVerdict,
      headline: 'Stop at the door',
      body: 'Unplanned events, schema violations or sensitive data your policy forbids stop at intake. Nothing reaches downstream tools.',
      detail: 'Use the source debugger to see why an event was blocked and fix it at the source.',
      snippet: 'decision: BLOCK\nreason: unplanned_event',
    },
    {
      verdict: 'OMIT' as DecisionVerdict,
      headline: 'Strip, then deliver',
      body: 'Personal or sensitive fields are removed and the rest of the event continues, so analytics keeps working without the risk.',
      detail:
        'Fields are matched by name, value or pattern, so sensitive data is caught wherever it appears.',
      snippet: 'decision: OMIT\nremoved: [email, date_of_birth]\ndestinations: [warehouse, analytics]',
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// How it works — lineage stages (Capture → … → Audit)
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
  heading: 'Follow one event from collection to delivery.',
  subhead:
    'Every event takes the same governed path: collected, checked against its contract, cleaned of what it shouldn’t carry, delivered where consent allows, and recorded.',
  stages: [
    {
      id: 'capture',
      number: '01',
      label: 'Collect',
      headline: 'Familiar calls, one collection layer.',
      body: 'Send events from web, mobile, games and servers using Segment-compatible calls, so existing instrumentation needs little rework.',
      technical:
        'Sources: Android, iOS, JavaScript, Unity, Direct API. Typed clients for TypeScript, Java, Kotlin, Swift and Python.',
      snippet:
        'bd.track("checkout_started", {\n  cart_value: 149.00,\n  currency: "USD",\n  user_id: "u_7732"\n});',
    },
    {
      id: 'contract',
      number: '02',
      label: 'Validate',
      headline: 'Every event checked against its contract.',
      body: 'Data contracts, built from reusable blueprints, describe the events and properties each source may send. Violations are handled the way your policy says.',
      technical:
        'Versioned contracts. Reusable event and property blueprints shared across sources. Contract checks in CI from the command line.',
      snippet:
        'contract: checkout_started @ v3\nblueprint: ecommerce/checkout\nrequired: [cart_value, currency]',
    },
    {
      id: 'govern',
      number: '03',
      label: 'Protect',
      headline: 'Personal data classified and handled.',
      body: 'Fields are classified as general, personal (PII) or sensitive (SPII). Your policy decides whether to allow, block or omit them, per source.',
      technical:
        'Field matchers by name, value or pattern. Allow / block / omit for unplanned data, schema violations, PII and SPII.',
      snippet:
        'fields.user_email:    PII  → omit\nfields.date_of_birth: SPII → block\nconsent.analytics:    granted',
    },
    {
      id: 'route',
      number: '04',
      label: 'Deliver',
      headline: 'Delivered only where consent allows.',
      body: 'Each destination is linked to the consent categories it needs. If consent is missing, the record is not sent. Filters, mappings and transformations shape the rest.',
      technical:
        'Consent gates fail closed. Warehouses, data lakes and destinations. Retries with backoff and a dead-letter queue.',
      snippet:
        'decision: OMIT\nremoved: [user_email, date_of_birth]\ndelivered:\n  - warehouse   ✓ (analytics consent)\n  - activation  ✗ (advertising consent absent)',
    },
    {
      id: 'audit',
      number: '05',
      label: 'Audit',
      headline: 'Every change, attributable.',
      body: 'Configuration history shows who changed which rule and when. Access is controlled by role, and sensitive actions are restricted and logged.',
      technical: 'Change history on every configuration item. Role-based permissions with single sign-on.',
      snippet:
        'policy.version: 14\nchange: propagation_rule.updated\nactor: data-platform-team\ntimestamp: 2026-06-12T09:14:22Z',
    },
  ] satisfies readonly WorkflowStage[],
} as const;

// ---------------------------------------------------------------------------
// Event journey — scroll-cinematic walkthrough (illustrative)
// ---------------------------------------------------------------------------

export interface JourneyField {
  readonly key: string;
  readonly value: string;
  readonly sensitive?: boolean;
}

export interface JourneyGate {
  readonly id: string;
  readonly label: string;
  readonly caption: string;
}

export const eventJourney = {
  eyebrow: 'Walk-through',
  heading: 'One event, through every check.',
  subhead:
    'Scroll to follow a checkout_started event as it is validated, classified, consent-checked and delivered. One personal field is removed on the way.',
  event: {
    label: 'checkout_started',
    fields: [
      { key: 'event', value: 'checkout_started' },
      { key: 'cart_value', value: '149.00' },
      { key: 'currency', value: 'USD' },
      { key: 'user_email', value: 'u@example.com', sensitive: true },
    ] satisfies readonly JourneyField[],
  },
  gates: [
    { id: 'contract', label: 'Contract', caption: 'Validated against a versioned contract' },
    { id: 'policy', label: 'PII / SPII policy', caption: 'Sensitive fields classified and removed' },
    { id: 'consent', label: 'Consent', caption: 'Checked against granted categories' },
    { id: 'destinations', label: 'Destinations', caption: 'Clean payload delivered downstream' },
  ] satisfies readonly JourneyGate[],
  verdict: 'OMIT' as DecisionVerdict,
  omitted: 'user_email',
  destinations: ['warehouse', 'analytics'] as const,
} as const;

// ---------------------------------------------------------------------------
// Integrations
// ---------------------------------------------------------------------------

export type IntegrationLogo =
  | 'Android'
  | 'iOS'
  | 'JavaScript'
  | 'Unity'
  | 'API'
  | 'Snowflake'
  | 'BigQuery'
  | 'Databricks'
  | 'S3'
  | 'GCS'
  | 'Azure'
  | 'Amplitude'
  | 'Braze'
  | 'Customer.io'
  | 'Google'
  | 'Iterable'
  | 'Meta'
  | 'Mixpanel'
  | 'Webhook'
  | 'AWS'
  | 'GoogleCloud'
  | 'Oracle'
  | 'Kubernetes'
  | 'Helm'
  | 'Argo'
  | 'Flux'
  | 'OpenID';

export interface IntegrationItem {
  readonly name: string;
  readonly logo: IntegrationLogo;
}

export interface IntegrationGroup {
  readonly id: string;
  readonly label: string;
  readonly caption: string;
  readonly items: readonly IntegrationItem[];
}

export const integrations = {
  eyebrow: 'Integrations',
  heading: 'Works with the stack you already run.',
  intro:
    'Connect your apps, your data platform and your marketing tools. Every connection goes through the same contracts, privacy rules and consent checks.',
  groups: [
    {
      id: 'sources',
      label: 'Sources',
      caption: 'Collect from',
      items: [
        { name: 'Android', logo: 'Android' },
        { name: 'iOS', logo: 'iOS' },
        { name: 'JavaScript', logo: 'JavaScript' },
        { name: 'Unity', logo: 'Unity' },
        { name: 'HTTP API', logo: 'API' },
      ],
    },
    {
      id: 'warehouses',
      label: 'Warehouses',
      caption: 'Load into',
      items: [
        { name: 'Snowflake', logo: 'Snowflake' },
        { name: 'BigQuery', logo: 'BigQuery' },
        { name: 'Databricks', logo: 'Databricks' },
      ],
    },
    {
      id: 'lakes',
      label: 'Data lakes',
      caption: 'Archive to',
      items: [
        { name: 'Amazon S3 & S3-compatible', logo: 'S3' },
        { name: 'Google Cloud Storage', logo: 'GCS' },
        { name: 'Azure Blob Storage', logo: 'Azure' },
      ],
    },
    {
      id: 'destinations',
      label: 'Destinations',
      caption: 'Activate in',
      items: [
        { name: 'Amplitude', logo: 'Amplitude' },
        { name: 'Braze', logo: 'Braze' },
        { name: 'Customer.io', logo: 'Customer.io' },
        { name: 'Google', logo: 'Google' },
        { name: 'Iterable', logo: 'Iterable' },
        { name: 'Meta', logo: 'Meta' },
        { name: 'Mixpanel', logo: 'Mixpanel' },
        { name: 'Webhook', logo: 'Webhook' },
      ],
    },
    {
      id: 'deploy',
      label: 'Deploy & operate',
      caption: 'Run on',
      items: [
        { name: 'Amazon EKS', logo: 'AWS' },
        { name: 'Google GKE', logo: 'GoogleCloud' },
        { name: 'Azure AKS', logo: 'Azure' },
        { name: 'Oracle OKE', logo: 'Oracle' },
        { name: 'Helm', logo: 'Helm' },
        { name: 'Argo CD', logo: 'Argo' },
        { name: 'Flux', logo: 'Flux' },
        { name: 'OpenID Connect SSO', logo: 'OpenID' },
      ],
    },
  ] satisfies readonly IntegrationGroup[],
  footnote: 'Need a connector that isn’t listed? Webhooks cover most HTTP APIs today. Tell us what you need.',
} as const;

// ---------------------------------------------------------------------------
// Reverse ETL — IN DEVELOPMENT. Planned design only; use "designed to" language.
// ---------------------------------------------------------------------------

export interface RetlFeature {
  readonly id: string;
  readonly title: string;
  readonly text: string;
}

export const reverseEtl = {
  eyebrow: 'Reverse ETL',
  status: 'in-development' as FeatureStatus,
  heading: 'Put warehouse insights to work, safely.',
  intro:
    'Your best audiences, scores and traits live in the warehouse. Reverse ETL is designed to sync them to the tools your teams use, with the same privacy and consent rules as your event data.',
  flow: {
    from: { label: 'Your warehouse model', items: ['Snowflake', 'BigQuery', 'Databricks', 'Postgres'] },
    via: 'Governed sync',
    to: { label: 'Your tools', items: ['Braze', 'Customer.io', 'Iterable', 'Webhook', 'and more'] },
  },
  features: [
    {
      id: 'confirmed-delivery',
      title: 'Confirmed delivery',
      text: 'Designed to count a record as synced only after the destination confirms it, so a cancelled or interrupted run resumes where it stopped.',
    },
    {
      id: 'mass-change-guard',
      title: 'Guard against mass changes',
      text: 'Designed so unusually large changes or deletes wait for approval instead of reaching a destination.',
    },
    {
      id: 'governed',
      title: 'Same privacy rules',
      text: 'The suppression and consent checks used for events also apply before any synced record is sent.',
    },
    {
      id: 'efficient',
      title: 'Only what changed',
      text: 'Changes are tracked on mapped columns only, and runs are skipped when the source data hasn’t changed.',
    },
    {
      id: 'safe-rollout',
      title: 'Preview before you sync',
      text: 'Dry runs, primary-key checks and re-baselining let you test a sync before it touches production.',
    },
    {
      id: 'scheduling',
      title: 'Runs on your schedule',
      text: 'Intervals, cron with time zones, API triggers, or after your dbt Cloud, Airflow, Dagster or GitHub Actions jobs finish.',
    },
  ] satisfies readonly RetlFeature[],
  modes: ['Add', 'Update', 'Upsert', 'Delete', 'Mirror', 'List add / remove'],
  modesLabel: 'Planned sync modes',
  note: 'Reverse ETL is in development and not yet available. Planned capabilities may change before release.',
  cta: { label: 'Become a design partner', href: designPartnerHref },
} as const;

// ---------------------------------------------------------------------------
// Deployment — BYOC vs Cloud
// ---------------------------------------------------------------------------

export type DeploymentId = 'byoc' | 'cloud';

export interface DeploymentOption {
  readonly id: DeploymentId;
  readonly icon: 'Server' | 'Cloud';
  readonly name: string;
  readonly tagline: string;
  readonly bestFor: string;
  readonly points: readonly string[];
}

export interface ChooserQuestion {
  readonly id: string;
  readonly question: string;
  /** Which option a "yes" answer points to. */
  readonly yes: DeploymentId;
  readonly reason: string;
  /** Optional: which option a "no" answer points to, and why. */
  readonly no?: DeploymentId;
  readonly noReason?: string;
}

export const deployment = {
  eyebrow: 'Deployment',
  heading: 'Your cloud or ours. Same platform.',
  intro:
    'Choose where Bootstrap Data runs based on your data residency, security and operating needs. Both run the same platform.',
  options: [
    {
      id: 'byoc',
      icon: 'Server',
      name: 'Bring your own cloud (BYOC)',
      tagline: 'Runs inside your cloud account. Customer data stays there.',
      bestFor: 'Best for regulated industries, strict data residency, and teams that run Kubernetes.',
      points: [
        'Deploy to Kubernetes on AWS, Google Cloud, Azure or Oracle Cloud with versioned Helm charts',
        'Event data, logs and personal data stay in your account; only aggregated usage counts are sent for billing',
        'Use your own managed databases and identity provider, or run them in the cluster',
        'Only the app and the event intake are exposed; internal traffic is denied by default',
        'You choose when to upgrade; roll back if needed',
      ],
    },
    {
      id: 'cloud',
      icon: 'Cloud',
      name: 'Bootstrap Data Cloud',
      tagline: 'Fully managed by us. Start collecting fast.',
      bestFor: 'Best for teams that want to go live quickly without operating infrastructure.',
      points: [
        'We run, monitor and upgrade the platform for you',
        'The same contracts, privacy rules, consent checks and connectors',
        'Single sign-on and role-based access',
        'Configuration exports as code, so you can move to BYOC later',
        'Talk to us about hosting regions and data residency',
      ],
    },
  ] satisfies readonly DeploymentOption[],
  chooser: {
    heading: 'Not sure which fits?',
    intro: 'Answer three questions for a starting recommendation.',
    questions: [
      {
        id: 'residency',
        question: 'Must customer data stay inside your own cloud account?',
        yes: 'byoc',
        reason: 'customer data has to stay in your own account',
      },
      {
        id: 'kubernetes',
        question: 'Do you have a team that operates Kubernetes in production?',
        yes: 'byoc',
        reason: 'your team already runs Kubernetes',
        no: 'cloud',
        noReason: 'you would rather not operate Kubernetes yourself',
      },
      {
        id: 'speed',
        question: 'Is going live quickly, without new infrastructure, the top priority?',
        yes: 'cloud',
        reason: 'speed without new infrastructure matters most',
      },
    ] satisfies readonly ChooserQuestion[],
    empty: 'Answer the questions to see a recommendation.',
    tie: 'Either could work. You can start in our cloud and move to BYOC later, since configuration exports as code. Let’s talk it through.',
  },
  billing: {
    status: 'early-access' as FeatureStatus,
    title: 'Clear, usage-based billing',
    text: 'Billing is based on usage you can verify. In BYOC, only aggregated usage counts leave your account; event payloads, logs and personal data never do.',
    points: [
      'Usage reports are signed and sent outbound only, over mutually authenticated TLS',
      'Every invoice line traces back to an append-only usage ledger',
      'Missed reports are detected and reconciled, not guessed',
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// Security & trust
// ---------------------------------------------------------------------------

export type SecurityIcon = 'KeyRound' | 'Users' | 'History' | 'Lock' | 'Network' | 'PackageCheck';

export interface SecurityItem {
  readonly id: string;
  readonly icon: SecurityIcon;
  readonly title: string;
  readonly text: string;
  readonly status: FeatureStatus;
}

export const security = {
  eyebrow: 'Security & trust',
  heading: 'Built for the security review.',
  intro:
    'Least privilege, full audit history and a verifiable software supply chain are part of the product, not add-ons.',
  items: [
    {
      id: 'sso-rbac',
      icon: 'Users',
      title: 'Single sign-on and fine-grained roles',
      text: 'Sign in with your OpenID Connect identity provider. Ten built-in roles, from viewer and analyst to privacy officer and auditor, assigned through groups. Access is denied unless granted.',
      status: 'early-access',
    },
    {
      id: 'break-glass',
      icon: 'KeyRound',
      title: 'Sensitive actions locked down',
      text: 'Revealing stored connection secrets needs a break-glass role. Unmasking personal data in the debugger is limited to privacy officers, and every reveal is logged.',
      status: 'early-access',
    },
    {
      id: 'audit',
      icon: 'History',
      title: 'Complete change history',
      text: 'Every change to sources, contracts, policies and connections is recorded with who made it and when.',
      status: 'available',
    },
    {
      id: 'secrets',
      icon: 'Lock',
      title: 'Credentials and identifiers protected',
      text: 'Connection credentials are encrypted at rest, write-only and never returned by the API. Profile identifiers are stored only as keyed hashes.',
      status: 'available',
    },
    {
      id: 'network',
      icon: 'Network',
      title: 'Minimal network exposure',
      text: 'In BYOC, only the app and the event intake are reachable from outside. Internal traffic is denied by default, and metering is outbound only.',
      status: 'available',
    },
    {
      id: 'supply-chain',
      icon: 'PackageCheck',
      title: 'Verifiable releases',
      text: 'Versioned releases for amd64 and arm64, each with a software bill of materials (SPDX) and signed build provenance attestations.',
      status: 'available',
    },
  ] satisfies readonly SecurityItem[],
  privacy: {
    status: 'early-access' as FeatureStatus,
    title: 'Privacy requests across the stack',
    text: 'Suppress or delete a person’s data across storage, profiles and destinations, and record the regulation behind each request.',
    regulations: ['GDPR', 'CCPA', 'CPRA', 'LGPD', 'DPDP Act'],
    note: 'Bootstrap Data provides tools to help you act on privacy requests. Compliance with each regulation remains your responsibility.',
  },
} as const;

// ---------------------------------------------------------------------------
// Use cases / personas
// ---------------------------------------------------------------------------

export const useCases = {
  eyebrow: 'Who it’s for',
  heading: 'One governed model for every team that touches customer data.',
  intro:
    'Engineering, analytics, privacy and marketing work from the same contracts, rules and consent, so no one has to reconcile them later.',
  items: [
    {
      id: 'platform-eng',
      icon: 'Code2' as const,
      role: 'Data platform engineering',
      headline: 'Replace one-off pipeline fixes with configuration you can review.',
      outcomes: [
        'Define contracts once and reuse them across every source.',
        'Manage configuration from Git and CI with the command-line tool.',
        'Debug a source live without exposing personal data.',
        'Deploy in your own cloud with versioned Helm charts.',
      ],
    },
    {
      id: 'analytics-eng',
      icon: 'BarChart3' as const,
      role: 'Analytics engineering',
      headline: 'Clean, typed data in the warehouse from day one.',
      outcomes: [
        'Get typed warehouse tables generated from the tracking plan.',
        'Stop broken events before they reach your models.',
        'Keep a raw or typed copy in your own data lake.',
        'Resolve users across devices into one profile (early access).',
      ],
    },
    {
      id: 'privacy-gov',
      icon: 'Lock' as const,
      role: 'Privacy, security & legal',
      headline: 'Enforce privacy policy in the pipeline, not in a spreadsheet.',
      outcomes: [
        'Block or remove personal data before it leaves intake.',
        'Make sure tools only receive data their consent allows.',
        'Handle deletion and suppression requests from one place.',
        'Review who changed what, and who saw sensitive data.',
      ],
    },
    {
      id: 'growth',
      icon: 'Megaphone' as const,
      role: 'Marketing & growth',
      headline: 'Activate customer data you are allowed to use.',
      outcomes: [
        'Send events to Braze, Customer.io, Iterable, Meta, Google and more.',
        'Map fields to what each tool expects, in the UI.',
        'Respect consent automatically in every campaign tool.',
        'Coming next: sync warehouse audiences with Reverse ETL.',
      ],
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// FAQ (also emitted as FAQPage structured data)
// ---------------------------------------------------------------------------

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const faq = {
  eyebrow: 'FAQ',
  heading: 'Frequently asked questions.',
  items: [
    {
      id: 'what',
      question: 'What is Bootstrap Data?',
      answer:
        'Bootstrap Data is a customer data platform for first-party data. It collects events from your apps and servers, enforces your tracking plan, privacy rules and consent, builds unified profiles, and delivers governed data to your warehouse, data lake and marketing tools.',
    },
    {
      id: 'byoc-vs-cloud',
      question: 'What is the difference between BYOC and Bootstrap Data Cloud?',
      answer:
        'With BYOC (bring your own cloud), the platform runs on Kubernetes inside your own AWS, Google Cloud, Azure or Oracle Cloud account and your customer data stays there. With Bootstrap Data Cloud, we run and upgrade the platform for you. Both include the same features.',
    },
    {
      id: 'byoc-data',
      question: 'What data leaves my account when I use BYOC?',
      answer:
        'Only aggregated usage counts used for billing. They are signed and sent outbound only, over mutually authenticated TLS. Event payloads, logs and personal data stay in your account.',
    },
    {
      id: 'segment',
      question: 'Can we keep our existing Segment-style tracking?',
      answer:
        'Yes. The collection API accepts Segment-compatible calls (track, page, screen, identify, group, alias and batch), so existing instrumentation needs little rework. Talk to us about your migration.',
    },
    {
      id: 'privacy',
      question: 'Does Bootstrap Data make us compliant with GDPR or CCPA?',
      answer:
        'No software can make you compliant on its own. Bootstrap Data gives you the controls: consent-gated delivery, blocking or removing personal data at intake, and deletion and suppression requests across connected systems with the legal basis recorded. Your compliance program decides how to use them.',
    },
    {
      id: 'reverse-etl',
      question: 'Is Reverse ETL available?',
      answer:
        'Not yet. Reverse ETL is in development. We are working with design partners on it now. Contact us if you would like to take part.',
    },
    {
      id: 'status',
      question: 'What do the “Early access” and “In development” labels mean?',
      answer:
        'Available features are part of a released version. Early access features are complete and are rolling out ahead of general availability. In development features are planned but not yet available, and their scope may change.',
    },
    {
      id: 'ai',
      question: 'Can AI assistants work with Bootstrap Data?',
      answer:
        'Yes. A built-in Model Context Protocol (MCP) server lets AI assistants browse your contracts and governance rules and validate sample events. It is read-only by default.',
    },
    {
      id: 'pricing',
      question: 'How is Bootstrap Data priced?',
      answer:
        'Pricing is usage-based for both BYOC and Cloud. Contact us for a quote that fits your volume and deployment model.',
    },
  ] satisfies readonly FaqItem[],
} as const;

// ---------------------------------------------------------------------------
// CTA section
// ---------------------------------------------------------------------------

export const ctaSection = {
  heading: 'See it with your own data.',
  subhead:
    'Tell us about your stack, where your data has to live and what you want to activate. We will walk you through the platform on your use case, in BYOC or Cloud.',
  primary: {
    label: 'Book a demo',
    href: demoHref,
  },
  secondary: { label: 'Compare BYOC and Cloud', href: '#deployment' },
  footnote: `Or email us at ${brand.email}.`,
} as const;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footer = {
  tagline: 'The governed customer data platform. In your cloud or ours.',
  groups: [
    {
      label: 'Product',
      links: [
        { label: 'Platform', href: '#platform' },
        { label: 'How it works', href: '#how-it-works' },
        { label: 'Integrations', href: '#integrations' },
        { label: 'Reverse ETL', href: '#reverse-etl' },
      ],
    },
    {
      label: 'Evaluate',
      links: [
        { label: 'Deployment', href: '#deployment' },
        { label: 'Security', href: '#security' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Book a demo', href: demoHref },
      ],
    },
  ] satisfies readonly { label: string; links: readonly NavLink[] }[],
  legal: `© ${new Date().getFullYear()} Bootstrap Data. All rights reserved.`,
  disclaimer:
    'Features marked Early access are rolling out ahead of general availability. Features marked In development are not yet available and may change. Product names and logos belong to their respective owners.',
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
