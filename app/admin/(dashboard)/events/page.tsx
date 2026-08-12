import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deleteEvent } from './actions';

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { eventDate: 'desc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="section-heading text-3xl font-bold text-white">Events</h1>
        <Link href="/admin/events/new" className="btn-gold">
          Add Event
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {events.length === 0 && (
          <p className="text-white/60">No events yet. Add your first upcoming fight.</p>
        )}
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div>
              <p className="font-semibold text-white">{event.title}</p>
              <p className="text-sm text-white/60">
                {event.eventDate.toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}{' '}
                &middot; {event.location}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/events/${event.id}/edit`}
                className="text-sm text-gold hover:underline"
              >
                Edit
              </Link>
              <form action={deleteEvent.bind(null, event.id)}>
                <button type="submit" className="text-sm text-red-400 hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
