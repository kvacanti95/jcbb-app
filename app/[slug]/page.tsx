import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { site } from '@/lib/site-data';

export const dynamic = 'force-dynamic';

async function getPublishedPage(slug: string) {
  const page = await prisma.page.findUnique({ where: { slug } });
  return page?.published ? page : null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPublishedPage(params.slug);
  if (!page) return {};
  return {
    title: `${page.title} | ${site.shortName}`,
  };
}

export default async function CustomPage({ params }: { params: { slug: string } }) {
  const page = await getPublishedPage(params.slug);
  if (!page) notFound();

  const paragraphs = page.body.split(/\n\s*\n/);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="section-heading text-4xl font-bold text-white sm:text-5xl">{page.title}</h1>

      {page.photoUrl && (
        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-lg sm:h-96">
          <Image src={page.photoUrl} alt={page.title} fill className="object-cover" />
        </div>
      )}

      <div className="mt-8 space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-white/80">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
