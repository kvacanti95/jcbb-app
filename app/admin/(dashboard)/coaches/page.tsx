import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deleteCoach } from './actions';

export default async function AdminCoachesPage() {
  const coaches = await prisma.coach.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="section-heading text-3xl font-bold text-white">Coaches</h1>
        <Link href="/admin/coaches/new" className="btn-gold">
          Add Coach
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div>
              <p className="font-semibold text-white">{coach.name}</p>
              <p className="text-sm text-white/60">{coach.role}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/coaches/${coach.id}/edit`}
                className="text-sm text-gold hover:underline"
              >
                Edit
              </Link>
              <form action={deleteCoach.bind(null, coach.id)}>
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
