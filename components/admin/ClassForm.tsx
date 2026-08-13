import { classLevels } from '@/lib/site-data';

type ClassFormValues = {
  name: string;
  description: string;
  level: string;
  duration: string;
};

export default function ClassForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: Partial<ClassFormValues>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-white">
          Class Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initialValues?.name}
          placeholder="Boxing Fundamentals"
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-white">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          defaultValue={initialValues?.description}
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="level" className="mb-1.5 block text-sm font-semibold text-white">
            Level
          </label>
          <select
            id="level"
            name="level"
            required
            defaultValue={initialValues?.level ?? ''}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          >
            <option value="" disabled>
              Select a level
            </option>
            {classLevels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="duration" className="mb-1.5 block text-sm font-semibold text-white">
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            required
            placeholder="60 min"
            defaultValue={initialValues?.duration}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
      </div>

      <button type="submit" className="btn-gold">
        {submitLabel}
      </button>
    </form>
  );
}
