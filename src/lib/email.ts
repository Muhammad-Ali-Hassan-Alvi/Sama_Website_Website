import nodemailer from "nodemailer";

export type ContactFormPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(data: ContactFormPayload) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL ?? user;

  if (!user || !pass) {
    throw new Error("Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
  }

  if (!to) {
    throw new Error("CONTACT_TO_EMAIL or GMAIL_USER must be set.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const companyLine = data.company ? ` — ${data.company}` : "";

  await transporter.sendMail({
    from: `"Sama Digital Website" <${user}>`,
    to,
    replyTo: data.email,
    subject: `New contact form: ${data.name}${companyLine}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || "—"}`,
      "",
      "Message:",
      data.message,
    ].join("\n"),
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
      <p><strong>Company:</strong> ${escapeHtml(data.company || "—")}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    `,
  });
}
