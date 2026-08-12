import type { Metadata } from 'next';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: `Gallery | ${site.shortName}`,
  description: `Photos from inside ${site.name}.`,
};

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const media = await prisma.mediaItem.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="section-heading text-4xl font-bold text-white sm:text-5xl">
          Gallery
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-white/60">
          A look inside the gym — training sessions, fight nights, and the {site.shortName}{' '}
          community.
        </p>
      </header>

      {media.length === 0 ? (
        <p className="mt-14 text-center text-sm text-white/40">
          Photos coming soon — check back or follow us on social media for the latest from the
          gym.
        </p>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/5"
            >
              {item.type === 'VIDEO' ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={item.url} className="h-full w-full object-cover" controls />
              ) : (
                <Image
                  src={item.url}
                  alt={item.caption ?? 'JCBB gallery photo'}
                  fill
                  className="object-cover"
                />
              )}
              {item.caption && (
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm font-semibold text-white">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
