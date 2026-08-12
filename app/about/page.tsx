import type { Metadata } from 'next';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: `About | ${site.shortName}`,
  description: `The story, mission, and coaching staff behind ${site.name}.`,
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const [coaches, settings] = await Promise.all([
    prisma.coach.findMany({ orderBy: { sortOrder: 'asc' } }),
    getSiteSettings(),
  ]);

  const storyParagraphs = settings.aboutStory.split(/\n\s*\n/);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="section-heading text-4xl font-bold text-white sm:text-5xl">
          About {site.shortName}
        </h1>
        <p className="mt-3 text-white/60">{site.name}</p>
      </header>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="section-heading text-2xl font-bold text-gold">Our Story</h2>
          {storyParagraphs.map((paragraph, i) => (
            <p key={i} className="mt-4 text-white/80">
              {paragraph}
            </p>
          ))}
        </div>
        <div>
          <h2 className="section-heading text-2xl font-bold text-purple">Our Mission</h2>
          <p className="mt-4 text-white/80">{settings.aboutMission}</p>
          <ul className="mt-6 space-y-3 text-white/80">
            <li className="flex gap-3">
              <span className="text-gold">•</span> Fundamentals-first coaching for every skill level
            </li>
            <li className="flex gap-3">
              <span className="text-gold">•</span> A safe, supervised path into competitive boxing
            </li>
            <li className="flex gap-3">
              <span className="text-gold">•</span> A gym culture built on respect and accountability
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="section-heading text-center text-3xl font-bold text-white">
          Meet the Coaches
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {coaches.map((coach) => (
            <div key={coach.id} className="rounded-lg border border-white/10 bg-white/5 p-8">
              {coach.photoUrl ? (
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image src={coach.photoUrl} alt={coach.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-purple-gradient">
                  <span className="section-heading text-xl font-bold text-white">
                    {coach.name
                      .split(' ')
                      .filter((w) => w !== 'Coach')
                      .map((w) => w[0])
                      .join('')}
                  </span>
                </div>
              )}
              <h3 className="section-heading mt-4 text-xl font-bold text-white">{coach.name}</h3>
              <p className="text-sm font-semibold text-gold">{coach.role}</p>
              <p className="mt-3 text-white/70">{coach.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
