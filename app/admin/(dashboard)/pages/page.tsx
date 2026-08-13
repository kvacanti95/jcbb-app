import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deletePage, togglePagePublished } from './actions';

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="section-heading text-3xl font-bold text-white">Pages</h1>
        <Link href="/admin/pages/new" className="btn-gold">
          Add Page
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {pages.length === 0 && (
          <p className="text-white/60">No custom pages yet. Add your first one.</p>
        )}
        {pages.map((page) => (
          <div
            key={page.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div>
              <p className="flex items-center gap-2 font-semibold text-white">
                {page.title}
                {!page.published && (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-normal text-white/50">
                    Hidden
                  </span>
                )}
              </p>
              <p className="text-sm text-white/60">/{page.slug}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/pages/${page.id}/edit`}
                className="text-sm text-gold hover:underline"
              >
                Edit
              </Link>
              <form action={togglePagePublished.bind(null, page.id, !page.published)}>
                <button type="submit" className="text-sm text-white/70 hover:underline">
                  {page.published ? 'Hide' : 'Show'}
                </button>
              </form>
              <form action={deletePage.bind(null, page.id)}>
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
