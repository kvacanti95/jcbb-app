type EventFormValues = {
  title: string;
  opponent: string;
  eventDate: string;
  location: string;
  description: string;
  ticketLink: string;
};

export default function EventForm({
  action,
  initialValues,
  existingPosterUrl,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: Partial<EventFormValues>;
  existingPosterUrl?: string | null;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-white">
            Fight / Event Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={initialValues?.title}
            placeholder="JCBB Fight Night: Fall Showcase"
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="opponent" className="mb-1.5 block text-sm font-semibold text-white">
            Opponent <span className="text-white/40">(optional)</span>
          </label>
          <input
            id="opponent"
            name="opponent"
            type="text"
            defaultValue={initialValues?.opponent}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="eventDate" className="mb-1.5 block text-sm font-semibold text-white">
            Date &amp; Time
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="datetime-local"
            required
            defaultValue={initialValues?.eventDate}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-semibold text-white">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            defaultValue={initialValues?.location}
            placeholder="JCBB Gym, Junction City, KS"
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-white">
          Description <span className="text-white/40">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={initialValues?.description}
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="ticketLink" className="mb-1.5 block text-sm font-semibold text-white">
          Ticket Link <span className="text-white/40">(optional)</span>
        </label>
        <input
          id="ticketLink"
          name="ticketLink"
          type="url"
          defaultValue={initialValues?.ticketLink}
          placeholder="https://..."
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="poster" className="mb-1.5 block text-sm font-semibold text-white">
          Poster Image <span className="text-white/40">(optional)</span>
        </label>
        {existingPosterUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={existingPosterUrl}
            alt="Current poster"
            className="mb-2 h-32 w-32 rounded-md object-cover"
          />
        )}
        <input
          id="poster"
          name="poster"
          type="file"
          accept="image/*"
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      </div>

      <button type="submit" className="btn-gold">
        {submitLabel}
      </button>
    </form>
  );
}
