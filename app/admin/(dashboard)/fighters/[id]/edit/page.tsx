import { notFound } from 'next/navigation';
import FighterForm from '@/components/admin/FighterForm';
import { prisma } from '@/lib/db';
import { updateFighter } from '../../actions';

export default async function EditFighterPage({ params }: { params: { id: string } }) {
  const fighter = await prisma.fighter.findUnique({ where: { id: params.id } });
  if (!fighter) notFound();

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Edit Fighter</h1>
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
            bio: fighter.bio,
          }}
        />
      </div>
    </div>
  );
}
