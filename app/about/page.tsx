import type { Metadata } from 'next';
import { coaches, site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: `About | ${site.shortName}`,
  description: `The story, mission, and coaching staff behind ${site.name}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="section-heading text-4xl font-bold text-white sm:text-5xl">
          About {site.shortName}
        </h1>
        <p className="mt-3 text-white/60">{site.name}</p>
      </header>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="section-heading text-2xl font-bold text-gold">Our Story</h2>
          <p className="mt-4 text-white/80">
            Junction City Boxing Brigade opened its doors in {site.founded} with a simple idea:
            boxing builds people, not just fighters. What started as a handful of coaches
            training out of a converted warehouse space has grown into a home base for anyone
            in Junction City looking to get stronger, sharper, and more disciplined — one round
            at a time.
          </p>
          <p className="mt-4 text-white/80">
            We&rsquo;re not a fight club and we&rsquo;re not a fitness fad. We&rsquo;re a boxing
            gym, first and always, built by people who compete and coach the sport we love.
          </p>
        </div>
        <div>
          <h2 className="section-heading text-2xl font-bold text-purple">Our Mission</h2>
          <p className="mt-4 text-white/80">
            To give every member — beginner or competitor, teenager or grandparent — a place to
            put in real work and see real results. We measure success in discipline gained,
            technique sharpened, and confidence earned.
          </p>
          <ul className="mt-6 space-y-3 text-white/80">
            <li className="flex gap-3">
              <span className="text-gold">•</span> Fundamentals-first coaching for every skill level
            </li>
            <li className="flex gap-3">
              <span className="text-gold">•</span> A safe, supervised path into competitive boxing
            </li>
            <li className="flex gap-3">
              <span className="text-gold">•</span> A gym culture built on respect and accountability
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="section-heading text-center text-3xl font-bold text-white">
          Meet the Coaches
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {coaches.map((coach) => (
            <div
              key={coach.name}
              className="rounded-lg border border-white/10 bg-white/5 p-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-purple-gradient">
                <span className="section-heading text-xl font-bold text-white">
                  {coach.name
                    .split(' ')
                    .filter((w) => w !== 'Coach')
                    .map((w) => w[0])
                    .join('')}
                </span>
              </div>
              <h3 className="section-heading mt-4 text-xl font-bold text-white">
                {coach.name}
              </h3>
              <p className="text-sm font-semibold text-gold">{coach.role}</p>
              <p className="mt-3 text-white/70">{coach.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
