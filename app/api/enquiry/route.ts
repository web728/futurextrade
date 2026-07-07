import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations/enquiry";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // TODO: connect to CRM / email / webhook here.
  // e.g. await fetch(process.env.ENQUIRY_WEBHOOK_URL, { method: "POST", body: JSON.stringify(parsed.data) })
  console.log("New Futurex enquiry:", parsed.data);

  return NextResponse.json({ success: true });
}
