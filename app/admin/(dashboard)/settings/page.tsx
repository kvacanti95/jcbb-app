import { getSiteSettings } from '@/lib/settings';
import { saveSettings } from './actions';

function Field({
  label,
  name,
  defaultValue,
  textarea,
  hint,
}: {
  label: string;
  name: string;
  defaultValue: string;
  textarea?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-white">
        {label}
      </label>
      {hint && <p className="mb-1.5 text-xs text-white/40">{hint}</p>}
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          defaultValue={defaultValue}
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          defaultValue={defaultValue}
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
        />
      )}
    </div>
  );
}

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="section-heading text-3xl font-bold text-white">Site Settings</h1>
      <form action={saveSettings} className="mt-8 max-w-2xl space-y-10">
        <section className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2 className="section-heading text-lg font-bold text-gold">Under-Construction Banner</h2>
          <div className="mt-4 flex items-center gap-2">
            <input
              id="banner_enabled"
              name="banner_enabled"
              type="checkbox"
              value="true"
              defaultChecked={settings.bannerEnabled}
              className="h-4 w-4"
            />
            <label htmlFor="banner_enabled" className="text-sm text-white">
              Show banner across the site
            </label>
          </div>
          <div className="mt-4">
            <Field label="Banner message" name="banner_message" defaultValue={settings.bannerMessage} />
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="section-heading text-lg font-bold text-gold">Home &amp; About</h2>
          <Field label="Hero tagline" name="tagline" defaultValue={settings.tagline} />
          <Field
            label="Our Story"
            name="about_story"
            defaultValue={settings.aboutStory}
            textarea
            hint="Leave a blank line between paragraphs."
          />
          <Field
            label="Our Mission"
            name="about_mission"
            defaultValue={settings.aboutMission}
            textarea
          />
        </section>

        <section className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="section-heading text-lg font-bold text-gold">Contact Info</h2>
          <Field label="Address" name="contact_address" defaultValue={settings.contactAddress} />
          <Field label="Phone" name="contact_phone" defaultValue={settings.contactPhone} />
          <Field label="Email" name="contact_email" defaultValue={settings.contactEmail} />
          <Field
            label="Instagram URL"
            name="social_instagram"
            defaultValue={settings.socialInstagram}
          />
          <Field
            label="Facebook URL"
            name="social_facebook"
            defaultValue={settings.socialFacebook}
            hint="Leave blank to hide this link."
          />
          <Field
            label="TikTok URL"
            name="social_tiktok"
            defaultValue={settings.socialTiktok}
            hint="Leave blank to hide this link."
          />
        </section>

        <button type="submit" className="btn-gold">
          Save Settings
        </button>
      </form>
    </div>
  );
}
