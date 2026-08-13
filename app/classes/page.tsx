import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: `Classes | ${site.shortName}`,
  description: `Boxing classes for every level at ${site.name}.`,
};

export const dynamic = 'force-dynamic';

const levelStyles: Record<string, string> = {
  Beginner: 'bg-purple/20 text-purple',
  Intermediate: 'bg-gold/20 text-gold',
  Advanced: 'bg-red-500/20 text-red-400',
  'All Levels': 'bg-white/10 text-white',
  Youth: 'bg-purple/20 text-purple',
  Competitive: 'bg-gold/20 text-gold',
};

export default async function ClassesPage() {
  const classes = await prisma.class.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="section-heading text-4xl font-bold text-white sm:text-5xl">
          Our Classes
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-white/60">
          Every class at {site.shortName} is coach-led and built around real boxing
          fundamentals — whether you&rsquo;re stepping in for the first time or prepping for a
          bout.
        </p>
      </header>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-6 transition-transform hover:-translate-y-1 hover:border-gold/40"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="section-heading text-xl font-bold text-white">{cls.name}</h2>
              <span
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                  levelStyles[cls.level] ?? 'bg-white/10 text-white'
                }`}
              >
                {cls.level}
              </span>
            </div>
            <p className="mt-3 flex-1 text-sm text-white/70">{cls.description}</p>
            <p className="mt-4 text-sm font-semibold text-gold">{cls.duration}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/schedule" className="btn-gold">
          See Class Times
        </Link>
      </div>
    </div>
  );
}
