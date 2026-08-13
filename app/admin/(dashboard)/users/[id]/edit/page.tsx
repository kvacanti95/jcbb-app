import { notFound } from 'next/navigation';
import UserForm from '@/components/admin/UserForm';
import { prisma } from '@/lib/db';
import { updateUser } from '../../actions';

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const [user, linkedFighter, unlinkedFighters] = await Promise.all([
    prisma.user.findUnique({ where: { id: params.id } }),
    prisma.fighter.findUnique({ where: { userId: params.id }, select: { id: true, name: true } }),
    prisma.fighter.findMany({
      where: { userId: null },
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    }),
  ]);
  if (!user) notFound();

  const fighterOptions = linkedFighter ? [linkedFighter, ...unlinkedFighters] : unlinkedFighters;

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Edit User</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <UserForm
          action={updateUser.bind(null, user.id)}
          fighterOptions={fighterOptions}
          requirePassword={false}
          initialValues={{
            email: user.email,
            name: user.name,
            role: user.role,
            fighterId: linkedFighter?.id,
          }}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
