type FighterFormValues = {
  name: string;
  weightClass: string;
  wins: number;
  losses: number;
  draws: number;
  bio: string;
};

export default function FighterForm({
  action,
  initialValues,
  existingPhotoUrl,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: Partial<FighterFormValues>;
  existingPhotoUrl?: string | null;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-white">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={initialValues?.name}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="weightClass" className="mb-1.5 block text-sm font-semibold text-white">
            Weight Class
          </label>
          <input
            id="weightClass"
            name="weightClass"
            type="text"
            required
            placeholder="Welterweight"
            defaultValue={initialValues?.weightClass}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-3">
        <div>
          <label htmlFor="wins" className="mb-1.5 block text-sm font-semibold text-white">
            Wins
          </label>
          <input
            id="wins"
            name="wins"
            type="number"
            min={0}
            defaultValue={initialValues?.wins ?? 0}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="losses" className="mb-1.5 block text-sm font-semibold text-white">
            Losses
          </label>
          <input
            id="losses"
            name="losses"
            type="number"
            min={0}
            defaultValue={initialValues?.losses ?? 0}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="draws" className="mb-1.5 block text-sm font-semibold text-white">
            Draws
          </label>
          <input
            id="draws"
            name="draws"
            type="number"
            min={0}
            defaultValue={initialValues?.draws ?? 0}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="mb-1.5 block text-sm font-semibold text-white">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={5}
          required
          defaultValue={initialValues?.bio}
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
