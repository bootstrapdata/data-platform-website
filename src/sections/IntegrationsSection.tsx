import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import {
  SiAndroid,
  SiApple,
  SiArgo,
  SiDatabricks,
  SiFlux,
  SiGoogle,
  SiGooglebigquery,
  SiGooglecloud,
  SiGooglecloudstorage,
  SiHelm,
  SiJavascript,
  SiKubernetes,
  SiMeta,
  SiMixpanel,
  SiOpenid,
  SiSnowflake,
  SiUnity,
} from 'react-icons/si';
import {
  PiBellRingingFill,
  PiChartLineUpFill,
  PiEnvelopeSimpleFill,
  PiPaperPlaneTiltFill,
} from 'react-icons/pi';
import { RiAmazonFill } from 'react-icons/ri';
import { TbApi, TbBrandAzure, TbWebhook } from 'react-icons/tb';
import { integrations, type IntegrationLogo } from '@/content/site';

// Brand marks where an open icon set provides one. Vendors without an open mark
// get a neutral category glyph rather than an imitation of their logo.
const NEUTRAL = 'var(--site-text-2)';

const LOGOS: Record<IntegrationLogo, { Icon: IconType; color: string }> = {
  Android: { Icon: SiAndroid, color: '#3DDC84' },
  iOS: { Icon: SiApple, color: '#A6ADB8' },
  JavaScript: { Icon: SiJavascript, color: '#EAB308' },
  Unity: { Icon: SiUnity, color: '#9CA3AF' },
  API: { Icon: TbApi, color: 'var(--site-brand)' },
  Snowflake: { Icon: SiSnowflake, color: '#29B5E8' },
  BigQuery: { Icon: SiGooglebigquery, color: '#669DF6' },
  Databricks: { Icon: SiDatabricks, color: '#FF3621' },
  GCS: { Icon: SiGooglecloudstorage, color: '#4285F4' },
  Azure: { Icon: TbBrandAzure, color: '#0089D6' },
  Google: { Icon: SiGoogle, color: '#4285F4' },
  Meta: { Icon: SiMeta, color: '#0081FB' },
  Mixpanel: { Icon: SiMixpanel, color: '#7856FF' },
  Webhook: { Icon: TbWebhook, color: 'var(--site-cyan)' },
  AWS: { Icon: RiAmazonFill, color: '#FF9900' },
  S3: { Icon: RiAmazonFill, color: '#FF9900' },
  Oracle: { Icon: SiKubernetes, color: '#326CE5' },
  Kubernetes: { Icon: SiKubernetes, color: '#326CE5' },
  Amplitude: { Icon: PiChartLineUpFill, color: NEUTRAL },
  Braze: { Icon: PiPaperPlaneTiltFill, color: NEUTRAL },
  'Customer.io': { Icon: PiEnvelopeSimpleFill, color: NEUTRAL },
  Iterable: { Icon: PiBellRingingFill, color: NEUTRAL },
  GoogleCloud: { Icon: SiGooglecloud, color: '#4285F4' },
  Helm: { Icon: SiHelm, color: '#5B7FD6' },
  Argo: { Icon: SiArgo, color: '#EF7B4D' },
  Flux: { Icon: SiFlux, color: '#5468FF' },
  OpenID: { Icon: SiOpenid, color: '#F78C40' },
};

function Logo({ logo }: { logo: IntegrationLogo }) {
  const { Icon, color } = LOGOS[logo];
  return (
    <span className="integ-chip__logo" style={{ '--logo-color': color } as CSSProperties} aria-hidden="true">
      <Icon />
    </span>
  );
}

export default function IntegrationsSection() {
  const { eyebrow, heading, intro, groups, footnote } = integrations;

  return (
    <section className="section integ-section" id="integrations" aria-labelledby="integ-heading">
      <div className="site-container">
        <header className="section-header section-header--split reveal">
          <div className="section-header__lead">
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 id="integ-heading" className="section-heading">
              {heading}
            </h2>
          </div>
          <p className="section-intro">{intro}</p>
        </header>

        <div className="integ-groups reveal-group">
          {groups.map((group) => (
            <div key={group.id} className={`integ-group integ-group--${group.id}`}>
              <div className="integ-group__head">
                <span className="integ-group__caption">{group.caption}</span>
                <h3 className="integ-group__label" id={`integ-${group.id}`}>
                  {group.label}
                </h3>
              </div>
              <ul className="integ-group__list" role="list" aria-labelledby={`integ-${group.id}`}>
                {group.items.map((item) => (
                  <li key={item.name} className="integ-chip">
                    <Logo logo={item.logo} />
                    <span className="integ-chip__name">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="integ-footnote reveal">{footnote}</p>
      </div>
    </section>
  );
}
