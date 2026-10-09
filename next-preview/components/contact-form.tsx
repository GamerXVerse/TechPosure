'use client';

import { useEffect, useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('[data-contact-person]');
    const select = document.querySelector<HTMLSelectElement>('select[name="contact"]');
    const choose = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      if (select) select.value = link.dataset.contactPerson || 'team';
    };
    links.forEach(link => link.addEventListener('click', choose));
    return () => links.forEach(link => link.removeEventListener('click', choose));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState('sending');
    setMessage('Sending your inquiry…');
    try {
      const params = new URLSearchParams();
      new FormData(form).forEach((value, key) => {
        if (typeof value === 'string') params.append(key, value);
      });
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: params.toString(),
      });
      const result: { ok?: boolean; message?: string } = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || 'Your inquiry was not sent.');
      setState('sent');
      setMessage(result.message || 'Your inquiry has been sent.');
      form.reset();
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Your inquiry was not sent. Please try again or email us directly.');
    }
  }

  return <form className="contact-form" name="project-inquiry" method="post" action="/api/contact" onSubmit={submit}>
    <div className="honeypot" aria-hidden="true"><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-grid">
      <label>Your name<input name="name" autoComplete="name" required maxLength={100} /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      <label>Organization<input name="organization" autoComplete="organization" required maxLength={160} /></label>
      <label>Who would you like to reach?<select name="contact" defaultValue="team"><option value="team">The TechPosure team</option><option value="aarush">Aarush Divakarla</option><option value="prasen">Prasenjit Panigrahi</option><option value="toby">Frederick Noel Toby</option></select></label>
    </div>
    <label>What would you like to build or improve?<textarea name="message" rows={5} required minLength={20} maxLength={5000} placeholder="Tell us about your mission, the challenge, and what a useful solution would look like." /></label>
    <p className="form-note">We’ll use these details to respond to your inquiry. Please don’t include passwords or sensitive information.</p>
    <button className="button button-primary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send project inquiry'} <span aria-hidden="true">↗</span></button>
    <p className={`form-status ${state}`} role="status" aria-live="polite">{message}</p>
    {state === 'error' ? <p className="form-fallback">Or email <a href="mailto:aarush.divakarla@gmail.com">aarush.divakarla@gmail.com</a> directly.</p> : null}
  </form>;
}
