import type { Metadata } from 'next';
import { schedule, site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: `Schedule | ${site.shortName}`,
  description: `Weekly class timetable for ${site.name}.`,
};

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="section-heading text-4xl font-bold text-white sm:text-5xl">
          Weekly Schedule
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-white/60">
          Classes run every day but Sunday. Arrive 10 minutes early for open bag time before
          each session.
        </p>
      </header>

      {/* Desktop / tablet table */}
      <div className="mt-14 hidden overflow-x-auto rounded-lg border border-white/10 md:block">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="bg-white/5">
              {schedule.map((day) => (
                <th
                  key={day.day}
                  className="section-heading border-b border-white/10 px-4 py-4 text-sm text-gold"
                >
                  {day.day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {schedule.map((day) => (
                <td key={day.day} className="align-top border-b border-white/10 px-4 py-4">
                  <ul className="space-y-4">
                    {day.classes.map((c, i) => (
                      <li key={i}>
                        <p className="text-sm font-semibold text-white">{c.time}</p>
                        <p className="text-sm text-white/70">{c.name}</p>
                        {c.coach !== '—' && (
                          <p className="text-xs text-white/40">{c.coach}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile stacked view */}
      <div className="mt-14 space-y-6 md:hidden">
        {schedule.map((day) => (
          <div key={day.day} className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="section-heading text-lg font-bold text-gold">{day.day}</h2>
            <ul className="mt-3 space-y-3">
              {day.classes.map((c, i) => (
                <li key={i} className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{c.name}</p>
                    {c.coach !== '—' && (
                      <p className="text-xs text-white/40">{c.coach}</p>
                    )}
                  </div>
                  <p className="whitespace-nowrap text-sm text-white/70">{c.time}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
