import { cache } from 'react';
import { prisma } from './db';
import { site } from './site-data';

export const SETTINGS_DEFAULTS = {
  tagline: site.tagline,
  about_story:
    "Junction City Boxing Brigade opened its doors in 2025 with a simple idea: boxing builds people, not just fighters. What started as a handful of coaches training out of a converted warehouse space has grown into a home base for anyone in Junction City looking to get stronger, sharper, and more disciplined — one round at a time.\n\nWe're not a fight club and we're not a fitness fad. We're a boxing gym, first and always, built by people who compete and coach the sport we love.",
  about_mission:
    'To give every member — beginner or competitor, teenager or grandparent — a place to put in real work and see real results. We measure success in discipline gained, technique sharpened, and confidence earned.',
  contact_address: site.address,
  contact_phone: site.phone,
  contact_email: site.email,
  social_instagram: site.social.instagram,
  social_facebook: site.social.facebook,
  social_tiktok: site.social.tiktok,
  banner_enabled: 'true',
  banner_message: "We're updating our site with new features — thanks for your patience!",
} as const;

export type SettingsKey = keyof typeof SETTINGS_DEFAULTS;

export type SiteSettings = {
  tagline: string;
  aboutStory: string;
  aboutMission: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  socialInstagram: string;
  socialFacebook: string;
  socialTiktok: string;
  bannerEnabled: boolean;
  bannerMessage: string;
};

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const rows = await prisma.siteSetting.findMany();
  const values = { ...SETTINGS_DEFAULTS } as Record<SettingsKey, string>;
  for (const row of rows) {
    if (row.key in values) {
      values[row.key as SettingsKey] = row.value;
    }
  }

  return {
    tagline: values.tagline,
    aboutStory: values.about_story,
    aboutMission: values.about_mission,
    contactAddress: values.contact_address,
    contactPhone: values.contact_phone,
    contactEmail: values.contact_email,
    socialInstagram: values.social_instagram,
    socialFacebook: values.social_facebook,
    socialTiktok: values.social_tiktok,
    bannerEnabled: values.banner_enabled === 'true',
    bannerMessage: values.banner_message,
  };
});

export async function updateSiteSettings(updates: Partial<Record<SettingsKey, string>>) {
  const entries = Object.entries(updates) as [SettingsKey, string][];
  await Promise.all(
    entries.map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      }),
    ),
  );
}
