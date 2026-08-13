export default function PageForm({
  action,
  initialValues,
  existingPhotoUrl,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: { title?: string; slug?: string; body?: string };
  existingPhotoUrl?: string | null;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-white">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialValues?.title}
          placeholder="Membership Pricing"
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="slug" className="mb-1.5 block text-sm font-semibold text-white">
          URL
        </label>
        <p className="mb-1.5 text-xs text-white/40">
          Letters, numbers, and dashes only — this becomes the page&rsquo;s web address.
        </p>
        <div className="flex items-center gap-1 text-white/50">
          <span className="text-sm">junctioncityboxingbrigade.com/</span>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            defaultValue={initialValues?.slug}
            placeholder="membership-pricing"
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="body" className="mb-1.5 block text-sm font-semibold text-white">
          Content
        </label>
        <p className="mb-1.5 text-xs text-white/40">Leave a blank line between paragraphs.</p>
        <textarea
          id="body"
          name="body"
          rows={10}
          required
          defaultValue={initialValues?.body}
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="photo" className="mb-1.5 block text-sm font-semibold text-white">
          Photo <span className="text-white/40">(optional)</span>
        </label>
        {existingPhotoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={existingPhotoUrl}
            alt="Current photo"
            className="mb-2 h-32 w-32 rounded-md object-cover"
          />
        )}
        <input
          id="photo"
          name="photo"
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
