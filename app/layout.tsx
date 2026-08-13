import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import { site } from '@/lib/site-data';
import { getSiteSettings } from '@/lib/settings';
import { prisma } from '@/lib/db';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: `${site.shortName} | ${site.name}`,
  description: `${site.name} — ${site.tagline}. Boxing classes for all levels in Junction City, KS.`,
};

// The root layout reads live, database-backed settings (banner, tagline)
// on every request, so nothing under it can be statically prerendered —
// this makes that explicit instead of relying on each page to opt out
// individually.
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, pages] = await Promise.all([
    getSiteSettings(),
    prisma.page.findMany({
      where: { published: true },
      orderBy: { title: 'asc' },
      select: { slug: true, title: true },
    }),
  ]);
  const extraLinks = pages.map((page) => ({ href: `/${page.slug}`, label: page.title }));

  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable} font-body flex min-h-screen flex-col`}>
        {settings.bannerEnabled && <Banner message={settings.bannerMessage} />}
        <Navbar extraLinks={extraLinks} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
