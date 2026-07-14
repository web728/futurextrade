import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import { transporter } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. MongoDB Database Connect Karein
    await connectDB();

    // 2. Naye Premium Form ke fields ke mutabik data DB me save karein
    const lead = await Lead.create({
      fullName: body.fullName,
      company: body.companyName || "—", // Form ki 'companyName' field handle ki
      email: body.email,
      phone: body.phone,
      designation: body.designation || "—",
      interestType: body.interestType,
      message: body.message || "—",     // Naya optional message field handle kiya
    });

    // 3. Ultra Premium Email HTML Template
    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #233067 0%, #151e43 100%); padding: 30px 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; tracking-tight: -0.5px;">Premium Lead Allocation</h2>
          <p style="color: #e32526; margin: 6px 0 0; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">New Exhibition Enquiry Received</p>
        </div>

        <div style="padding: 30px; bg: #ffffff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 14px; width: 150px; border-b: 1px solid #f1f5f9;"><strong>Full Name</strong></td>
              <td style="padding: 12px 0; font-size: 14px; color: #0f172a; border-b: 1px solid #f1f5f9;">${lead.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-b: 1px solid #f1f5f9;"><strong>Company Name</strong></td>
              <td style="padding: 12px 0; font-size: 14px; color: #0f172a; border-b: 1px solid #f1f5f9;">${lead.company}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-b: 1px solid #f1f5f9;"><strong>Email Address</strong></td>
              <td style="padding: 12px 0; font-size: 14px; color: #0f172a; border-b: 1px solid #f1f5f9;"><a href="mailto:${lead.email}" style="color: #233067; text-decoration: none; font-weight: 600;">${lead.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-b: 1px solid #f1f5f9;"><strong>Phone Number</strong></td>
              <td style="padding: 12px 0; font-size: 14px; color: #0f172a; border-b: 1px solid #f1f5f9;">${lead.phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-b: 1px solid #f1f5f9;"><strong>Designation</strong></td>
              <td style="padding: 12px 0; font-size: 14px; color: #0f172a; border-b: 1px solid #f1f5f9;">${lead.designation}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-b: 1px solid #f1f5f9;"><strong>Pathway Interest</strong></td>
              <td style="padding: 12px 0; font-size: 14px; color: #e32526; font-weight: 700; border-b: 1px solid #f1f5f9;">${lead.interestType}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-size: 14px; vertical-align: top; padding-top: 12px;"><strong>Message Box</strong></td>
              <td style="padding: 12px 0; font-size: 14px; color: #334155; line-height: 1.5; padding-top: 12px;">${lead.message}</td>
            </tr>
          </table>
        </div>

        <div style="padding: 16px 30px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
          System Secure Allocation &bull; Submitted: ${new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </div>
      </div>
    `;

    // 4. Nodemailer Mail Trigger (Aapke dono specified secure emails par)
    await transporter.sendMail({
      from: `"Futurex Lead System" <${process.env.EMAIL_USER}>`,
      to: ["info@futurextrade.com", "admin@futurextrade.com"],
      subject: `New Premium Lead: ${lead.fullName} – ${lead.interestType}`,
      html,
    });

    // 5. Optional Google Sheet Backup Webhook Integration (Agar env me config hai)
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: lead.fullName,
            company: lead.company,
            email: lead.email,
            phone: lead.phone,
            designation: lead.designation,
            interestType: lead.interestType,
            message: lead.message,
          }),
        });
      } catch (sheetError) {
        console.error("Google Sheet webhook update failed:", sheetError);
      }
    }

    return Response.json({
      success: true,
      message: "Lead stored securely and dispatch logs dispatched successfully.",
    });
  } catch (error) {
    console.error("Lead endpoint submission crash execution error:", error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}