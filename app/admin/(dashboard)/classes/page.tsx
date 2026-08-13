import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deleteClass } from './actions';

export default async function AdminClassesPage() {
  const classes = await prisma.class.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="section-heading text-3xl font-bold text-white">Classes</h1>
        <Link href="/admin/classes/new" className="btn-gold">
          Add Class
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {classes.length === 0 && (
          <p className="text-white/60">No classes yet. Add your first one.</p>
        )}
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div>
              <p className="font-semibold text-white">{cls.name}</p>
              <p className="text-sm text-white/60">
                {cls.level} &middot; {cls.duration}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/classes/${cls.id}/edit`}
                className="text-sm text-gold hover:underline"
              >
                Edit
              </Link>
              <form action={deleteClass.bind(null, cls.id)}>
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
