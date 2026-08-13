import UserForm from '@/components/admin/UserForm';
import { prisma } from '@/lib/db';
import { createUser } from '../actions';

export default async function NewUserPage() {
  const fighters = await prisma.fighter.findMany({
    where: { userId: null },
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Add User</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <UserForm
          action={createUser}
          fighterOptions={fighters}
          requirePassword
          submitLabel="Create User"
        />
      </div>
    </div>
  );
}
