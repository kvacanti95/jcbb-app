import { notFound } from 'next/navigation';
import ClassForm from '@/components/admin/ClassForm';
import { prisma } from '@/lib/db';
import { updateClass } from '../../actions';

export default async function EditClassPage({ params }: { params: { id: string } }) {
  const cls = await prisma.class.findUnique({ where: { id: params.id } });
  if (!cls) notFound();

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Edit Class</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <ClassForm
          action={updateClass.bind(null, cls.id)}
          submitLabel="Save Changes"
          initialValues={{
            name: cls.name,
            description: cls.description,
            level: cls.level,
            duration: cls.duration,
          }}
        />
      </div>
    </div>
  );
}
