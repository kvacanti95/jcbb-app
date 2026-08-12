import { prisma } from '@/lib/db';
import { deleteMedia, uploadMedia } from './actions';

export default async function AdminMediaPage() {
  const [media, events] = await Promise.all([
    prisma.mediaItem.findMany({ orderBy: { createdAt: 'desc' }, include: { event: true } }),
    prisma.event.findMany({ orderBy: { eventDate: 'desc' } }),
  ]);

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Media</h1>

      <div className="mt-8 max-w-xl rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="section-heading text-lg font-bold text-white">Add a photo or video</h2>
        <form action={uploadMedia} className="mt-4 space-y-4">
          <div>
            <label htmlFor="file" className="mb-1.5 block text-sm font-semibold text-white">
              File
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/*,video/*"
              required
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="eventId" className="mb-1.5 block text-sm font-semibold text-white">
              Attach to a fight <span className="text-white/40">(optional)</span>
            </label>
            <select
              id="eventId"
              name="eventId"
              defaultValue=""
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
            >
              <option value="">General gallery (not tied to a fight)</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="caption" className="mb-1.5 block text-sm font-semibold text-white">
              Caption <span className="text-white/40">(optional)</span>
            </label>
            <input
              id="caption"
              name="caption"
              type="text"
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
            />
          </div>
          <button type="submit" className="btn-gold">
            Upload
          </button>
        </form>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {media.map((item) => (
          <div key={item.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
            {item.type === 'VIDEO' ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video src={item.url} className="aspect-square w-full rounded-md object-cover" controls />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.url}
                alt={item.caption ?? ''}
                className="aspect-square w-full rounded-md object-cover"
              />
            )}
            {item.caption && <p className="mt-2 text-xs text-white/70">{item.caption}</p>}
            {item.event && <p className="mt-1 text-xs text-gold">{item.event.title}</p>}
            <form action={deleteMedia.bind(null, item.id)} className="mt-2">
              <button type="submit" className="text-xs text-red-400 hover:underline">
                Delete
              </button>
            </form>
          </div>
        ))}
        {media.length === 0 && <p className="text-white/60">No media uploaded yet.</p>}
      </div>
    </div>
  );
}
