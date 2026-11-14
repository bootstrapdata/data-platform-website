import { statusLabels, type FeatureStatus } from '@/content/site';

export default function StatusBadge({ status }: { status: FeatureStatus }) {
  return <span className={`status-badge status-badge--${status}`}>{statusLabels[status]}</span>;
}
