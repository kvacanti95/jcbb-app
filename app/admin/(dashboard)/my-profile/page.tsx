import { getServerSession } from 'next-auth';
import FighterForm from '@/components/admin/FighterForm';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { updateFighter } from '../fighters/actions';

export default async function MyProfilePage() {
  const session = await getServerSession(authOptions);
  const fighter = session?.user?.id
    ? await prisma.fighter.findUnique({ where: { userId: session.user.id } })
    : null;

  if (!fighter) {
    return (
      <div>
        <h1 className="section-heading text-3xl font-bold text-white">My Profile</h1>
        <p className="mt-4 text-white/60">
          No fighter profile is linked to your account yet. Ask an admin to link one from{' '}
          <span className="text-gold">Users</span>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">My Profile</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <FighterForm
          action={updateFighter.bind(null, fighter.id)}
          submitLabel="Save Changes"
          existingPhotoUrl={fighter.photoUrl}
          initialValues={{
            name: fighter.name,
            weightClass: fighter.weightClass,
            wins: fighter.wins,
            losses: fighter.losses,
            draws: fighter.draws,
            kos: fighter.kos,
            bio: fighter.bio,
          }}
        />
      </div>
    </div>
  );
}
