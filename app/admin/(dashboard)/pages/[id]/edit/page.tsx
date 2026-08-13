import { notFound } from 'next/navigation';
import PageForm from '@/components/admin/PageForm';
import { prisma } from '@/lib/db';
import { updatePage } from '../../actions';

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({ where: { id: params.id } });
  if (!page) notFound();

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Edit Page</h1>
      <div className="mt-8 max-w-2xl rounded-lg border border-white/10 bg-white/5 p-6">
        <PageForm
          action={updatePage.bind(null, page.id)}
          submitLabel="Save Changes"
          existingPhotoUrl={page.photoUrl}
          initialValues={{ title: page.title, slug: page.slug, body: page.body }}
        />
      </div>
    </div>
  );
}
