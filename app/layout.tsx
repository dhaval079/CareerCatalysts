import '@/styles/globals.css';
import type { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

import { siteInfo } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { Toaster } from '@/components/ui/toaster';
import DecorativeBlobs from '@/components/common/decorative-blobs';
import Providers from '@/components/common/providers';
import TailwindIndicator from '@/components/common/tailwind-indicator';

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  title: {
    default: siteInfo.name,
    template: `%s | ${siteInfo.name}`,
  },
  description: siteInfo.description,
  keywords: [
    'GyBex',
    'Jobs',
    'Management',
    'BexJobs',
    'Jobs Management',
    'Job Search',
  ],
  authors: [
    {
      name: 'GyBex',
      url: siteInfo.links.portfolio,
    },
  ],
  creator: 'GyBex',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={twMerge('font-sans antialiased', fontSans.variable)}>
        <Providers>
          <div className="relative grid min-h-screen content-between">
            {children}
          </div>
          <DecorativeBlobs />
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
