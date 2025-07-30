import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const handler = async (req: Request) => {
  if (req.method !== "POST") {
    const headers = new Headers({
      Allow: "POST",
    });
    return Response.json({ success: false }, { status: 405, headers });
  }

  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return Response.json({ success: false }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: `art.suzannaward.fr <${process.env.RESEND_EMAIL}>`,
      to: process.env.RESEND_EMAIL!,
      subject: `🎨 Prise de contact de ${name} (${email})`,
      html: `
      <p><strong>De:</strong> ${name} &lt;${email}&gt;</p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
    });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Resend error:", error);
    return Response.json({ success: false }, { status: 502 });
  }
};

export default handler;
