import type { Metadata } from 'next';

import {
  openGraphImages,
  openGraphLocale,
  openGraphName,
  openGraphType,
  twitterCard,
  twitterCreator,
  twitterImages,
} from '@/lib/shared-metadata';
import StatsSummary from '@/components/common/stats-summary';

const title = 'Stats';
const description = 'View your jobs statistics';
const url = '/dashboard';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    ...openGraphName,
    ...openGraphImages,
    ...openGraphLocale,
    ...openGraphType,
  },
  twitter: {
    title,
    description,
    ...twitterCard,
    ...twitterCreator,
    ...twitterImages,
  },
  alternates: {
    canonical: url,
  },
};

export default function StatsPage() {
  return (
    <>
      <StatsSummary />
    </>
  );
}
