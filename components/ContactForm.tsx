'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong. Please try again.');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-gold/40 bg-gold/10 p-6 text-center">
        <p className="section-heading text-lg font-bold text-gold">Message Sent</p>
        <p className="mt-2 text-white/70">
          Thanks for reaching out — a member of the JCBB team will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-white">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-gold"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-white">
            Phone <span className="text-white/40">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-gold"
            placeholder="(785) 555-0142"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-gold"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-white">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-gold"
          placeholder="Tell us what brings you to JCBB..."
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-gold disabled:opacity-60">
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
