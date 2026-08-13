'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const rememberMe = (form.elements.namedItem('rememberMe') as HTMLInputElement).checked;

    const result = await signIn('credentials', { email, password, redirect: false });

    if (result?.error) {
      setError('Invalid email or password.');
      setSubmitting(false);
      return;
    }

    if (!rememberMe) {
      // Downgrade the session cookie NextAuth just set to a session-only
      // cookie, so it clears when the browser fully closes.
      await fetch('/api/auth/session-persistence', { method: 'POST' });
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-24 sm:px-6">
      <h1 className="section-heading text-center text-3xl font-bold text-white">Admin Login</h1>
      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-white">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            defaultChecked
            className="h-4 w-4"
          />
          <label htmlFor="rememberMe" className="text-sm text-white">
            Remember me on this device
          </label>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-60">
          {submitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
