import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email().max(120),
  message: z.string().trim().min(10).max(4000),
  company: z.string().optional(),
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please enter a valid name, email, and message." }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ message: "Thanks." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { message: "The contact form is not configured yet. Please email me directly at gandhi.meet.mg@gmail.com." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { name, email, message } = parsed.data;

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ message: "Message sent." });
  } catch (error) {
    console.error("Contact form send failed", error);
    return NextResponse.json(
      { message: "The message could not be sent. Please email me directly at gandhi.meet.mg@gmail.com." },
      { status: 500 },
    );
  }
}
