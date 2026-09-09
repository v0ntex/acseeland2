/* ============================================================================
   API-ROUTE — nimmt Formular-Submissions entgegen und schickt sie via
   Resend an info@autocenterseeland.ch.
   ========================================================================== */

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { getSite } from '../../data/content';

export const prerender = false;

type Payload = {
  variant?: 'contact' | 'sourcing' | 'enquiry';
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  // sourcing-Variante
  make?: string;
  model?: string;
  budget?: string;
  timeframe?: string;
  // Honeypot (bots füllen versteckte Felder aus)
  website?: string;
};

const escape = (s: string) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const nl2br = (s: string) => escape(s).replaceAll('\n', '<br>');

function buildEmail(p: Payload) {
  const variant = p.variant ?? 'contact';
  const rows: { label: string; value: string }[] = [
    { label: 'Name', value: p.name ?? '' },
    { label: 'E-Mail', value: p.email ?? '' },
    ...(p.phone ? [{ label: 'Telefon', value: p.phone }] : []),
  ];

  let subject: string;
  if (variant === 'sourcing') {
    subject = `Fahrzeuganfrage: ${[p.make, p.model].filter(Boolean).join(' ') || '(ohne Angabe)'}`;
    if (p.make) rows.push({ label: 'Marke', value: p.make });
    if (p.model) rows.push({ label: 'Modell', value: p.model });
    if (p.budget) rows.push({ label: 'Budget', value: `CHF ${p.budget}` });
    if (p.timeframe) rows.push({ label: 'Zeitrahmen', value: p.timeframe });
  } else if (variant === 'enquiry') {
    subject = p.subject || 'Fahrzeug-Anfrage';
  } else {
    subject = p.subject || 'Kontakt via Website';
  }

  const rowsHtml = rows
    .map(
      (r) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${escape(
          r.label,
        )}</td><td style="padding:6px 0;color:#111;font-weight:600">${escape(r.value)}</td></tr>`,
    )
    .join('');

  const html = `
<!doctype html>
<html><body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111;line-height:1.5">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:8px;overflow:hidden">
    <div style="padding:16px 24px;background:#0a0a0a;color:#fff;border-bottom:3px solid #E10600">
      <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#a3a3a3">
        Auto Center Seeland — Website
      </div>
      <div style="font-size:18px;font-weight:700;margin-top:4px">${escape(subject)}</div>
    </div>
    <div style="padding:24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">${rowsHtml}</table>
      <div style="margin-top:20px;padding-top:16px;border-top:1px solid #eee">
        <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#666;margin-bottom:8px">Nachricht</div>
        <div style="font-size:14px;color:#111;white-space:pre-wrap;word-break:break-word">${nl2br(
          p.message ?? '',
        )}</div>
      </div>
    </div>
    <div style="padding:14px 24px;background:#fafafa;border-top:1px solid #eee;font-size:12px;color:#888">
      Gesendet via Website-Formular · <a href="mailto:${escape(
        p.email ?? '',
      )}" style="color:#E10600;text-decoration:none">Antworten</a>
    </div>
  </div>
</body></html>`;

  const text = [
    subject,
    '',
    ...rows.map((r) => `${r.label}: ${r.value}`),
    '',
    '--- Nachricht ---',
    p.message ?? '',
  ].join('\n');

  return { subject, html, text };
}

export const POST: APIRoute = async ({ request }) => {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  /* Honeypot: gefüllt → wir tun so als wäre alles gut, senden aber nichts */
  if (body.website && body.website.trim().length > 0) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  /* Minimal-Validierung */
  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Pflichtfelder fehlen' }), {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Ungültige E-Mail' }), {
      status: 422,
      headers: { 'content-type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY fehlt in den Env-Variablen');
    return new Response(JSON.stringify({ error: 'Server nicht konfiguriert' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  const site = await getSite();
  const to = import.meta.env.CONTACT_EMAIL ?? site.email;
  /* Bis autocenterseeland.ch bei Resend verifiziert ist, muss der Absender
     auf onboarding@resend.dev laufen. Setze dann RESEND_FROM auf z.B.
     "Auto Center Seeland <no-reply@autocenterseeland.ch>". */
  const from = import.meta.env.RESEND_FROM ?? 'Auto Center Seeland <onboarding@resend.dev>';

  const { subject, html, text } = buildEmail(body);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error('Resend-Fehler:', error);
      return new Response(JSON.stringify({ error: 'Versand fehlgeschlagen' }), {
        status: 502,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    console.error('Unerwarteter Fehler:', err);
    return new Response(JSON.stringify({ error: 'Unerwarteter Fehler' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
