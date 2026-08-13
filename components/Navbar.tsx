'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navLinks, site } from '@/lib/site-data';

type NavLink = { href: string; label: string };

export default function Navbar({ extraLinks = [] }: { extraLinks?: NavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [...navLinks, ...extraLinks];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-jetblack/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/jcbb-logo.jpg"
            alt={`${site.shortName} logo`}
            width={44}
            height={44}
            className="rounded-md"
          />
          <span className="section-heading text-lg font-bold text-white">
            {site.shortName}
          </span>
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-white transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {open && (
        <ul className="border-t border-white/10 bg-jetblack px-4 pb-4 sm:mx-auto sm:max-w-xs sm:px-6">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`section-heading block rounded px-2 py-3 text-sm ${
                    active ? 'text-gold' : 'text-white hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
