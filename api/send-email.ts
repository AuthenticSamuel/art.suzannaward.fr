import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const handler = async (request: VercelRequest, response: VercelResponse) => {
  if (request.method !== "POST") {
    response.status(405).json({ success: false });
    return;
  }

  const { name, email, message, reference } = request.body;

  if (!name || !email || !message) {
    response.status(400).json({ success: false });
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from: `art.suzannaward.fr <${process.env.RESEND_EMAIL_FROM}>`,
      to: process.env.RESEND_EMAIL_TO!,
      subject: `🎨 Prise de contact de ${name}`,
      html: `
        <p><strong>De :</strong> ${name} &lt;${email}&gt;</p>
        <p>Référence : ${reference}</p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
    if (error) throw new Error(error.message);
    response.status(200).json({ success: true });
    return;
  } catch (error) {
    console.error(error);
    response.status(502).json({ success: false });
    return;
  }
};

export default handler;
