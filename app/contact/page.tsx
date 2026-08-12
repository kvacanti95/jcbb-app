import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: `Contact | ${site.shortName}`,
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="section-heading text-4xl font-bold text-white sm:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-white/60">
          Questions about classes, membership, or a free trial? Reach out and we&rsquo;ll get
          back to you fast.
        </p>
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="section-heading text-xl font-bold text-gold">Address</h2>
            <p className="mt-2 text-white/80">{site.address}</p>
          </div>

          <div>
            <h2 className="section-heading text-xl font-bold text-gold">Phone</h2>
            <a
              href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}
              className="mt-2 block text-white/80 hover:text-gold"
            >
              {site.phone}
            </a>
          </div>

          <div>
            <h2 className="section-heading text-xl font-bold text-gold">Email</h2>
            <a href={`mailto:${site.email}`} className="mt-2 block text-white/80 hover:text-gold">
              {site.email}
            </a>
          </div>

          <div>
            <h2 className="section-heading text-xl font-bold text-gold">Follow Along</h2>
            <div className="mt-3 flex gap-4">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/20 px-4 py-2 text-sm text-white hover:border-gold hover:text-gold"
              >
                Instagram
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/20 px-4 py-2 text-sm text-white hover:border-gold hover:text-gold"
              >
                Facebook
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/20 px-4 py-2 text-sm text-white hover:border-gold hover:text-gold"
              >
                TikTok
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10">
            <iframe
              title="JCBB location map"
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
