import type { Metadata } from 'next';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: `Upcoming Matches | ${site.shortName}`,
  description: `Upcoming and past boxing matches for ${site.name}.`,
};

export const dynamic = 'force-dynamic';

function EventCard({
  event,
}: {
  event: {
    id: string;
    title: string;
    opponent: string | null;
    eventDate: Date;
    location: string;
    description: string | null;
    ticketLink: string | null;
    posterImageUrl: string | null;
  };
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:flex-row">
      {event.posterImageUrl && (
        <div className="relative h-48 w-full shrink-0 sm:h-56 sm:w-56">
          <Image src={event.posterImageUrl} alt={event.title} fill className="object-cover" />
        </div>
      )}
      <div className="flex-1 p-6">
        <p className="section-heading text-sm text-gold">
          {event.eventDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
        </p>
        <h2 className="section-heading mt-1 text-xl font-bold text-white">{event.title}</h2>
        {event.opponent && <p className="mt-1 text-white/70">vs. {event.opponent}</p>}
        <p className="mt-1 text-sm text-white/50">{event.location}</p>
        {event.description && <p className="mt-3 text-white/70">{event.description}</p>}
        {event.ticketLink && (
          <a
            href={event.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-4 inline-block"
          >
            Get Tickets
          </a>
        )}
      </div>
    </div>
  );
}

export default async function EventsPage() {
  const now = new Date();
  const [upcoming, past] = await Promise.all([
    prisma.event.findMany({ where: { eventDate: { gte: now } }, orderBy: { eventDate: 'asc' } }),
    prisma.event.findMany({ where: { eventDate: { lt: now } }, orderBy: { eventDate: 'desc' } }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="section-heading text-4xl font-bold text-white sm:text-5xl">
          Upcoming Matches
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-white/60">
          Fight nights, showcases, and where to catch {site.shortName} in the ring.
        </p>
      </header>

      <div className="mt-14 space-y-6">
        {upcoming.length === 0 && (
          <p className="text-center text-white/60">No upcoming matches scheduled yet — check back soon.</p>
        )}
        {upcoming.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {past.length > 0 && (
        <div className="mt-20">
          <h2 className="section-heading text-center text-2xl font-bold text-white">
            Past Events
          </h2>
          <div className="mt-8 space-y-6">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
