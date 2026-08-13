type FighterOption = { id: string; name: string };

export default function UserForm({
  action,
  initialValues,
  fighterOptions,
  requirePassword,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: { email?: string; name?: string; role?: string; fighterId?: string };
  fighterOptions: FighterOption[];
  requirePassword: boolean;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5">
      {initialValues?.email === undefined ? (
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
      ) : (
        <div>
          <p className="mb-1.5 block text-sm font-semibold text-white">Email</p>
          <p className="text-white/60">{initialValues.email}</p>
        </div>
      )}

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
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-white">
          Password {!requirePassword && <span className="text-white/40">(leave blank to keep current)</span>}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required={requirePassword}
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="role" className="mb-1.5 block text-sm font-semibold text-white">
          Role
        </label>
        <select
          id="role"
          name="role"
          defaultValue={initialValues?.role ?? 'ADMIN'}
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        >
          <option value="ADMIN">Admin — full access</option>
          <option value="FIGHTER">Fighter — can only edit their own profile</option>
        </select>
      </div>

      <div>
        <label htmlFor="fighterId" className="mb-1.5 block text-sm font-semibold text-white">
          Linked Fighter Profile <span className="text-white/40">(only used when role is Fighter)</span>
        </label>
        <select
          id="fighterId"
          name="fighterId"
          defaultValue={initialValues?.fighterId ?? ''}
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        >
          <option value="">None</option>
          {fighterOptions.map((fighter) => (
            <option key={fighter.id} value={fighter.id}>
              {fighter.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-gold">
        {submitLabel}
      </button>
    </form>
  );
}
