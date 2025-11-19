import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const requestSchema = z.object({
  name: z
    .string({
      required_error: "Ime je obavezno.",
    })
    .min(2, "Ime je prekratko."),
  email: z
    .string({
      required_error: "Email adresa je obavezna.",
    })
    .email("Email adresa nije validna."),
  phone: z.string().optional(),
  message: z
    .string({
      required_error: "Poruka je obavezna.",
    })
    .min(10, "Poruka je prekratka."),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = requestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Proverite unete podatke.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.EMAIL_TO || "",
        subject: `Nova poruka sa sajta — ${parsed.data.name}`,
        html: `
          <h2>Nova poruka sa sajta</h2>
          <p><strong>Ime:</strong> ${parsed.data.name}</p>
          <p><strong>Email:</strong> ${parsed.data.email}</p>
          <p><strong>Telefon:</strong> ${parsed.data.phone || "-"}</p>
          <p><strong>Poruka:</strong><br>${parsed.data.message.replace(/\n/g, "<br>")}</p>
        `,
      });

      if (error) {
        console.error("[Resend] Email sending failed", error);
        return NextResponse.json(
          {
            ok: false,
            message: "Trenutno ne možemo da obradimo zahtev. Pokušajte kasnije.",
          },
          { status: 502 }
        );
      }
    } catch (emailError) {
      console.error("[Resend] Unexpected error", emailError);
      return NextResponse.json(
        {
          ok: false,
          message: "Došlo je do greške prilikom slanja poruke. Pokušajte ponovo kasnije.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Kontakt] neočekivana greška", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Došlo je do neočekivane greške. Pokušajte ponovo kasnije.",
      },
      { status: 500 }
    );
  }
}

