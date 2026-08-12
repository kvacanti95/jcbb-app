import EventForm from '@/components/admin/EventForm';
import { createEvent } from '../actions';

export default function NewEventPage() {
  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Add Event</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <EventForm action={createEvent} submitLabel="Create Event" />
      </div>
    </div>
  );
}
