'use server';

import { revalidatePath } from 'next/cache';
import { updateSiteSettings, type SettingsKey } from '@/lib/settings';

const TEXT_KEYS: SettingsKey[] = [
  'banner_message',
  'banner_bg_color',
  'banner_text_color',
  'tagline',
  'about_story',
  'about_mission',
  'contact_address',
  'contact_phone',
  'contact_email',
  'social_instagram',
  'social_facebook',
  'social_tiktok',
];

export async function saveSettings(formData: FormData) {
  const updates: Partial<Record<SettingsKey, string>> = {
    banner_enabled: formData.get('banner_enabled') === 'true' ? 'true' : 'false',
  };

  for (const key of TEXT_KEYS) {
    updates[key] = String(formData.get(key) ?? '').trim();
  }

  await updateSiteSettings(updates);

  revalidatePath('/', 'layout');
}
