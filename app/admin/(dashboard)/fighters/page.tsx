import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deleteFighter, toggleFighterHidden } from './actions';

export default async function AdminFightersPage() {
  const fighters = await prisma.fighter.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="section-heading text-3xl font-bold text-white">Fighters</h1>
        <Link href="/admin/fighters/new" className="btn-gold">
          Add Fighter
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {fighters.length === 0 && (
          <p className="text-white/60">No fighters yet. Add your first roster entry.</p>
        )}
        {fighters.map((fighter) => (
          <div
            key={fighter.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div>
              <p className="flex items-center gap-2 font-semibold text-white">
                {fighter.name}
                {fighter.hidden && (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-normal text-white/50">
                    Hidden
                  </span>
                )}
              </p>
              <p className="text-sm text-white/60">
                {fighter.weightClass} &middot; {fighter.wins}-{fighter.losses}-{fighter.draws}
                {fighter.kos > 0 && ` (${fighter.kos} KOs)`}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/fighters/${fighter.id}/edit`}
                className="text-sm text-gold hover:underline"
              >
                Edit
              </Link>
              <form action={toggleFighterHidden.bind(null, fighter.id, !fighter.hidden)}>
                <button type="submit" className="text-sm text-white/70 hover:underline">
                  {fighter.hidden ? 'Show' : 'Hide'}
                </button>
              </form>
              <form action={deleteFighter.bind(null, fighter.id)}>
                <button type="submit" className="text-sm text-red-400 hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
