import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromEmail = process.env.RESEND_FROM_EMAIL || 'Bhasko <noreply@bhasko.in>';

export type EmailTemplate =
  | 'lead-confirmation'
  | 'solar-report'
  | 'contact-notification'
  | 'survey-confirmation'
  | 'appointment-confirmation'
  | 'project-status-update'
  | 'service-request'
  | 'partner-application'
  | 'password-reset'
  | 'customer-welcome'
  | 'admin-lead-notification';

const templates: Record<EmailTemplate, (data: any) => { subject: string; html: string }> = {
  'lead-confirmation': (d) => ({
    subject: `Thanks ${d.name}! Your Bhasko solar estimate is on its way ☀️`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:auto"><h1 style="color:#183A2A">Hi ${d.name},</h1><p>We've received your details and your solar recommendation is ready. A Bhasko solar expert will be in touch shortly on ${d.phone}.</p><p>Your quick estimate:</p><ul><li>Recommended system: <strong>${d.capacity} kW</strong></li><li>Estimated monthly savings: <strong>₹${Math.round(d.monthlySavings || 0).toLocaleString('en-IN')}</strong></li><li>Estimated payback: <strong>${d.payback} years</strong></li></ul><p style="color:#66736B;font-size:13px">This is an indicative estimate. Final design requires a physical site survey.</p></div>`,
  }),
  'solar-report': (d) => ({
    subject: `Your Bhasko Solar Report is Ready ☀️`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:auto"><h1 style="color:#183A2A">Your Solar Report is ready</h1><p>Hi ${d.name},</p><p>Attached is your detailed Bhasko solar report for your property in ${d.city}.</p>${d.reportUrl ? `<p><a href="${d.reportUrl}" style="background:#477A45;color:white;padding:12px 24px;border-radius:999px;text-decoration:none;display:inline-block">Download Report (PDF)</a></p>` : ''}<p>Questions? Reply to this email or WhatsApp us at [WHATSAPP].</p></div>`,
  }),
  'contact-notification': (d) => ({
    subject: `Thanks for contacting Bhasko, ${d.name}`,
    html: `<p>Hi ${d.name}, thanks for reaching out. We'll be in touch shortly.</p>`,
  }),
  'survey-confirmation': (d) => ({
    subject: `Your Bhasko Solar Survey is booked`,
    html: `<p>Hi ${d.name}, your free solar site survey has been scheduled. Our engineering team will contact you to confirm the exact time.</p>`,
  }),
  'appointment-confirmation': (d) => ({ subject: 'Bhasko appointment confirmed', html: `<p>Your appointment is confirmed for ${d.date}.</p>` }),
  'project-status-update': (d) => ({ subject: `Your Bhasko solar project: ${d.stage}`, html: `<p>Hi ${d.name}, your project has moved to <strong>${d.stage}</strong>. Track progress in your My Solar dashboard.</p>` }),
  'service-request': (d) => ({ subject: 'Bhasko service request received', html: `<p>We've received your service request (#${d.id}). Our team will respond within 24 hours.</p>` }),
  'partner-application': (d) => ({ subject: 'Bhasko partner application received', html: `<p>Thanks ${d.name}, your application to partner with Bhasko has been received. We'll review and get in touch.</p>` }),
  'password-reset': (d) => ({ subject: 'Reset your Bhasko password', html: `<p>Click the link to reset your password: ${d.link}</p>` }),
  'customer-welcome': (d) => ({ subject: 'Welcome to My Solar by Bhasko', html: `<p>Hi ${d.name}, your My Solar dashboard is live. Track generation, savings, and service here.</p>` }),
  'admin-lead-notification': (d) => ({ subject: `[Bhasko Admin] New lead: ${d.name} (${d.city})`, html: `<p>${d.name} from ${d.city} with bill ₹${d.bill}. Capacity ${d.capacity} kW. Source: ${d.source}.</p>` }),
};

export async function sendEmail(to: string, template: EmailTemplate, data: any, attachmentUrl?: string) {
  if (!resend) {
    console.log(`[DEV-EMAIL] -> ${to} [${template}]`, data);
    return { ok: true, dev: true };
  }
  const t = templates[template](data);
  return resend.emails.send({
    from: fromEmail,
    to,
    subject: t.subject,
    html: t.html,
    ...(attachmentUrl ? { attachments: [] } : {}),
  });
}
