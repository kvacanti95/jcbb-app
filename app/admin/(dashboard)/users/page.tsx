import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deleteUser } from './actions';

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="section-heading text-3xl font-bold text-white">Users</h1>
        <Link href="/admin/users/new" className="btn-gold">
          Add User
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div>
              <p className="font-semibold text-white">{user.name}</p>
              <p className="text-sm text-white/60">
                {user.email} &middot; {user.role === 'ADMIN' ? 'Admin' : 'Fighter'}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/users/${user.id}/edit`}
                className="text-sm text-gold hover:underline"
              >
                Edit
              </Link>
              <form action={deleteUser.bind(null, user.id)}>
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
