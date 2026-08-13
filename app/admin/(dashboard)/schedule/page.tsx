import { prisma } from '@/lib/db';
import { addScheduleClass, deleteScheduleClass } from './actions';

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default async function AdminSchedulePage() {
  const [rows, classes] = await Promise.all([
    prisma.scheduleClass.findMany({
      orderBy: [{ dayOfWeek: 'asc' }, { sortOrder: 'asc' }],
    }),
    prisma.class.findMany({ orderBy: { sortOrder: 'asc' } }),
  ]);

  const byDay = DAY_NAMES.map((day, index) => ({
    day,
    dayOfWeek: index,
    rows: rows.filter((row) => row.dayOfWeek === index),
  }));

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Weekly Schedule</h1>
      <p className="mt-2 text-white/60">
        Add a class below, or remove one you no longer need. To change a time, delete the old
        row and add the corrected one.
      </p>

      <div className="mt-8 max-w-xl rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="section-heading text-lg font-bold text-white">Add a class</h2>
        <form action={addScheduleClass} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dayOfWeek" className="mb-1.5 block text-sm font-semibold text-white">
              Day
            </label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              required
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
            >
              {DAY_NAMES.map((day, index) => (
                <option key={day} value={index}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="time" className="mb-1.5 block text-sm font-semibold text-white">
              Time
            </label>
            <input
              id="time"
              name="time"
              type="text"
              required
              placeholder="6:00 AM"
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="className" className="mb-1.5 block text-sm font-semibold text-white">
              Class
            </label>
            <select
              id="className"
              name="className"
              required
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="coachName" className="mb-1.5 block text-sm font-semibold text-white">
              Coach
            </label>
            <input
              id="coachName"
              name="coachName"
              type="text"
              required
              placeholder="Coach Tim"
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-gold">
              Add Class
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 space-y-6">
        {byDay.map((day) => (
          <div key={day.day} className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="section-heading text-lg font-bold text-gold">{day.day}</h2>
            {day.rows.length === 0 ? (
              <p className="mt-3 text-sm text-white/40">No classes scheduled.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {day.rows.map((row) => (
                  <li
                    key={row.id}
                    className="flex flex-wrap items-center justify-between gap-2 text-sm"
                  >
                    <span className="text-white">
                      {row.time} &middot; {row.className}{' '}
                      <span className="text-white/40">({row.coachName})</span>
                    </span>
                    <form action={deleteScheduleClass.bind(null, row.id)}>
                      <button type="submit" className="text-xs text-red-400 hover:underline">
                        Delete
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
