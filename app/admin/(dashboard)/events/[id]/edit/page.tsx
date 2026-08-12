import { notFound } from 'next/navigation';
import EventForm from '@/components/admin/EventForm';
import { prisma } from '@/lib/db';
import { updateEvent } from '../../actions';

function toDatetimeLocalValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) notFound();

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Edit Event</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <EventForm
          action={updateEvent.bind(null, event.id)}
          submitLabel="Save Changes"
          existingPosterUrl={event.posterImageUrl}
          initialValues={{
            title: event.title,
            opponent: event.opponent ?? '',
            eventDate: toDatetimeLocalValue(event.eventDate),
            location: event.location,
            description: event.description ?? '',
            ticketLink: event.ticketLink ?? '',
          }}
        />
      </div>
    </div>
  );
}
