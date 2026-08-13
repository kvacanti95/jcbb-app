import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import SignOutButton from '@/components/SignOutButton';

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/classes', label: 'Classes' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/coaches', label: 'Coaches' },
  { href: '/admin/fighters', label: 'Fighters' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/schedule', label: 'Schedule' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/settings', label: 'Settings' },
];

const fighterLinks = [{ href: '/admin/my-profile', label: 'My Profile' }];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const links = session?.user?.role === 'FIGHTER' ? fighterLinks : adminLinks;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row">
      <aside className="shrink-0 md:w-56">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-white/40">Signed in as</p>
          <p className="mt-1 truncate text-sm font-semibold text-white">
            {session?.user?.name ?? session?.user?.email}
          </p>
        </div>
        <nav className="mt-4 flex flex-row gap-1 overflow-x-auto md:flex-col md:overflow-visible">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="section-heading whitespace-nowrap rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 px-3">
          <SignOutButton />
        </div>
      </aside>

      <div className="flex-1">{children}</div>
    </div>
  );
}
