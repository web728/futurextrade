import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // TODO: connect to an email marketing provider (e.g. Mailchimp, Brevo) here.
  console.log("New Futurex newsletter signup:", parsed.data.email);

  return NextResponse.json({ success: true });
}
