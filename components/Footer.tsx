import Link from 'next/link';
import { navLinks, site } from '@/lib/site-data';
import { getSiteSettings } from '@/lib/settings';

export default async function Footer() {
  const settings = await getSiteSettings();
  const socialLinks = [
    { label: 'Instagram', href: settings.socialInstagram },
    { label: 'Facebook', href: settings.socialFacebook },
    { label: 'TikTok', href: settings.socialTiktok },
  ].filter((link) => link.href);

  return (
    <footer className="border-t border-white/10 bg-jetblack">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="section-heading text-lg font-bold text-gold">{site.shortName}</p>
          <p className="mt-2 text-sm text-white/70">{site.name}</p>
          <p className="mt-1 text-sm italic text-white/50">&ldquo;{settings.tagline}&rdquo;</p>
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
            <p>{settings.contactAddress}</p>
            <p>
              <a
                href={`tel:${settings.contactPhone.replace(/[^\d+]/g, '')}`}
                className="hover:text-gold"
              >
                {settings.contactPhone}
              </a>
            </p>
            <p>
              <a href={`mailto:${settings.contactEmail}`} className="hover:text-gold">
                {settings.contactEmail}
              </a>
            </p>
          </address>
          {socialLinks.length > 0 && (
            <div className="mt-4 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {site.name}. Founded {site.founded}. All rights reserved.
      </div>
    </footer>
  );
}
