import type { Metadata } from 'next';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: `Fighters | ${site.shortName}`,
  description: `Meet the fighters of ${site.name}.`,
};

export const dynamic = 'force-dynamic';

export default async function FightersPage() {
  const fighters = await prisma.fighter.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="section-heading text-4xl font-bold text-white sm:text-5xl">Fighters</h1>
        <p className="mx-auto mt-3 max-w-2xl text-white/60">
          Meet the {site.shortName} team stepping into the ring.
        </p>
      </header>

      {fighters.length === 0 ? (
        <p className="mt-14 text-center text-white/60">
          Our fighter roster is coming soon — check back shortly.
        </p>
      ) : (
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {fighters.map((fighter) => (
            <div key={fighter.id} className="rounded-lg border border-white/10 bg-white/5 p-8">
              {fighter.photoUrl ? (
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={fighter.photoUrl}
                    alt={fighter.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-purple-gradient">
                  <span className="section-heading text-xl font-bold text-white">
                    {fighter.name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')}
                  </span>
                </div>
              )}
              <h3 className="section-heading mt-4 text-xl font-bold text-white">
                {fighter.name}
              </h3>
              <p className="text-sm font-semibold text-gold">{fighter.weightClass}</p>
              <p className="mt-1 text-sm text-white/50">
                {fighter.wins}-{fighter.losses}-{fighter.draws}
                {fighter.kos > 0 && ` (${fighter.kos} KOs)`}
              </p>
              <p className="mt-3 text-white/70">{fighter.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
