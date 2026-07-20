/**
 * All site copy lives here in one typed file.
 *
 * PUBLIC REPOSITORY — marketing content only. Do NOT add anything internal or
 * confidential: no architecture details, service names/ports, infra, JDL,
 * credentials, customer names, or private URLs. This file is the single place
 * to review before every publish.
 */

export const site = {
  brand: {
    name: 'Bootstrap Data',
    domain: 'bootstrapdata.in',
    tagline: 'Own your first-party data. Govern it by default. Activate it everywhere.',
  },

  nav: {
    links: [
      { label: 'Platform', href: '#platform' },
      { label: 'Governance', href: '#governance' },
      { label: 'Vision', href: '#vision' },
      { label: 'Docs', href: '#' },
    ],
    cta: { label: 'Request access', href: '#request-access' },
  },

  hero: {
    eyebrow: 'Privacy-first customer data platform',
    headline: ['Own your first-party data.', 'Govern it by default.', 'Activate it everywhere.'],
    subhead:
      'The control plane for first-party data. Capture every signal, block what shouldn’t flow, and activate the rest — everywhere.',
    primary: { label: 'Get started free', href: '#request-access' },
    secondary: { label: 'See how it works', href: '#platform' },
    trust: ['Governed', 'Audited', 'Consent-aware', 'Private by design'],
  },

  stats: [
    { value: '5', unit: 'SDKs', note: 'Android · iOS · JS · Unity · API' },
    { value: '3', unit: 'Actions', note: 'Allow · Block · Omit' },
    { value: '2', unit: 'Tiers', note: 'PII & SPII auto-classified' },
    { value: '∞', unit: 'Targets', note: 'Consent-gated destinations' },
  ],
} as const;

export type Site = typeof site;
