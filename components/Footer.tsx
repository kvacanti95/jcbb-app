import Link from 'next/link';
import { navLinks, site } from '@/lib/site-data';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-jetblack">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="section-heading text-lg font-bold text-gold">{site.shortName}</p>
          <p className="mt-2 text-sm text-white/70">{site.name}</p>
          <p className="mt-1 text-sm italic text-white/50">&ldquo;{site.tagline}&rdquo;</p>
        </div>

        <div>
          <p className="section-heading text-sm text-white">Quick Links</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-heading text-sm text-white">Visit Us</p>
          <address className="mt-3 space-y-1 text-sm text-white/70 not-italic">
            <p>{site.address}</p>
            <p>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="hover:text-gold">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </p>
          </address>
          <div className="mt-4 flex gap-4">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-gold"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-gold"
            >
              Facebook
            </a>
            <a
              href={site.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-gold"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {site.name}. Founded {site.founded}. All rights reserved.
      </div>
    </footer>
  );
}
