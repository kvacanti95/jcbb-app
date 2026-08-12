import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import { site } from '@/lib/site-data';
import { getSiteSettings } from '@/lib/settings';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable} font-body flex min-h-screen flex-col`}>
        {settings.bannerEnabled && <Banner message={settings.bannerMessage} />}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
