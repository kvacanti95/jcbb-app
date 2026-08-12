import Image from 'next/image';
import Link from 'next/link';
import { classes, site } from '@/lib/site-data';

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-jetblack">
        <div className="absolute inset-0 bg-gold-purple-gradient opacity-10" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
          <Image
            src="/images/jcbb-logo.jpg"
            alt={`${site.shortName} logo`}
            width={200}
            height={200}
            priority
            className="rounded-lg shadow-lg shadow-purple/30"
          />
          <h1 className="section-heading mt-8 text-4xl font-bold text-white sm:text-6xl">
            {site.shortName}
          </h1>
          <p className="mt-2 text-base text-white/60 sm:text-lg">{site.name}</p>
          <p className="mt-6 max-w-xl text-xl font-semibold italic text-gold sm:text-2xl">
            &ldquo;{site.tagline}&rdquo;
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="btn-gold">
              Join Now
            </Link>
            <Link href="/schedule" className="btn-outline">
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-jetblack py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { label: 'Founded', value: String(site.founded) },
              { label: 'Class Types', value: `${classes.length}+` },
              { label: 'Skill Levels', value: 'All Welcome' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/5 p-8 text-center"
              >
                <p className="section-heading text-3xl font-bold text-gold">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wide text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-purple/10 py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="section-heading text-3xl font-bold text-white sm:text-4xl">
            Train With Purpose
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            From your first jab to your first sanctioned bout, JCBB coaches meet you where you
            are and push you toward where you want to be. No shortcuts — just work.
          </p>
          <Link href="/classes" className="btn-gold mt-8 inline-block">
            Explore Our Classes
          </Link>
        </div>
      </section>
    </>
  );
}
