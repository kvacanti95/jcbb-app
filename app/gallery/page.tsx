import type { Metadata } from 'next';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: `Gallery | ${site.shortName}`,
  description: `Photos from inside ${site.name}.`,
};

const gallery = [
  'Heavy Bag Work',
  'Coach Pad Drills',
  'Sparring Night',
  'Youth Class',
  'Fight Night 2025',
  'Conditioning Circuit',
  'New Member Day',
  'Team Photo',
  'Ring Time',
];

export default function GalleryPage() {
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

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {gallery.map((caption, i) => (
          <div
            key={caption}
            className="group relative aspect-square overflow-hidden rounded-lg border border-white/10"
            style={{
              background:
                i % 2 === 0
                  ? 'linear-gradient(135deg, #6b3fa0 0%, #1a1a1a 100%)'
                  : 'linear-gradient(135deg, #c9a84c 0%, #1a1a1a 100%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="section-heading px-3 text-center text-sm font-semibold text-white">
                {caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-white/40">
        Photos coming soon — check back or follow us on social media for the latest from the
        gym.
      </p>
    </div>
  );
}
