import { notFound } from 'next/navigation';
import CoachForm from '@/components/admin/CoachForm';
import { prisma } from '@/lib/db';
import { updateCoach } from '../../actions';

export default async function EditCoachPage({ params }: { params: { id: string } }) {
  const coach = await prisma.coach.findUnique({ where: { id: params.id } });
  if (!coach) notFound();

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Edit Coach</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <CoachForm
          action={updateCoach.bind(null, coach.id)}
          submitLabel="Save Changes"
          existingPhotoUrl={coach.photoUrl}
          initialValues={{ name: coach.name, role: coach.role, bio: coach.bio }}
        />
      </div>
    </div>
  );
}
