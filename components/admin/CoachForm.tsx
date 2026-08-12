export default function CoachForm({
  action,
  initialValues,
  existingPhotoUrl,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: { name?: string; role?: string; bio?: string };
  existingPhotoUrl?: string | null;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5">
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
          placeholder="Coach Tim"
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="role" className="mb-1.5 block text-sm font-semibold text-white">
          Role
        </label>
        <input
          id="role"
          name="role"
          type="text"
          required
          defaultValue={initialValues?.role}
          placeholder="Boxing Coach"
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
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
            className="mb-2 h-32 w-32 rounded-full object-cover"
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
