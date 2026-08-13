import Link from 'next/link';
import { prisma } from '@/lib/db';

export default async function AdminDashboardPage() {
  const [classCount, eventCount, mediaCount, coachCount, fighterCount, pageCount] =
    await Promise.all([
      prisma.class.count(),
      prisma.event.count(),
      prisma.mediaItem.count(),
      prisma.coach.count(),
      prisma.fighter.count(),
      prisma.page.count(),
    ]);

  const cards = [
    { label: 'Classes', count: classCount, href: '/admin/classes' },
    { label: 'Upcoming & Past Events', count: eventCount, href: '/admin/events' },
    { label: 'Photos & Videos', count: mediaCount, href: '/admin/media' },
    { label: 'Coaches', count: coachCount, href: '/admin/coaches' },
    { label: 'Fighters', count: fighterCount, href: '/admin/fighters' },
    { label: 'Custom Pages', count: pageCount, href: '/admin/pages' },
  ];

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-lg border border-white/10 bg-white/5 p-6 hover:border-gold/40"
          >
            <p className="section-heading text-3xl font-bold text-gold">{card.count}</p>
            <p className="mt-1 text-sm text-white/70">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-white/10 bg-white/5 p-6">
        <h2 className="section-heading text-lg font-bold text-white">Quick links</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link href="/admin/classes/new" className="text-gold hover:underline">
              Add a new class type
            </Link>
          </li>
          <li>
            <Link href="/admin/events/new" className="text-gold hover:underline">
              Add an upcoming fight
            </Link>
          </li>
          <li>
            <Link href="/admin/media" className="text-gold hover:underline">
              Upload fight photos
            </Link>
          </li>
          <li>
            <Link href="/admin/schedule" className="text-gold hover:underline">
              Update the weekly class schedule
            </Link>
          </li>
          <li>
            <Link href="/admin/coaches" className="text-gold hover:underline">
              Edit a coach bio
            </Link>
          </li>
          <li>
            <Link href="/admin/fighters/new" className="text-gold hover:underline">
              Add a fighter to the roster
            </Link>
          </li>
          <li>
            <Link href="/admin/pages/new" className="text-gold hover:underline">
              Create a new page
            </Link>
          </li>
          <li>
            <Link href="/admin/users/new" className="text-gold hover:underline">
              Add a staff or fighter account
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
