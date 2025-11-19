import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize rate limiter: 3 requests per IP per 10 minutes
// Only initialize if Redis environment variables are available
let ratelimit: Ratelimit | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      analytics: true,
    });
  }
} catch (error) {
  console.warn("[Rate Limit] Redis not configured, rate limiting disabled:", error);
}

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
  website: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Rate limiting: get IP address
    if (ratelimit) {
      const ip = request.headers.get("x-forwarded-for") || 
                 request.headers.get("x-real-ip") || 
                 "unknown";
      
      const { success: rateLimitSuccess } = await ratelimit.limit(ip);
      
      if (!rateLimitSuccess) {
        return NextResponse.json(
          {
            ok: false,
            message: "Too many requests. Please try again later.",
          },
          { status: 429 }
        );
      }
    }

    const payload = await request.json();
    
    // Honeypot validation: check before schema validation
    if (payload.website && payload.website.trim() !== "") {
      return NextResponse.json(
        {
          ok: false,
          message: "Spam blocked.",
        },
        { status: 400 }
      );
    }

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

    // SEND EMAIL VIA RESEND
    // Note: website field is excluded from email (honeypot field)
    try {
      const { error } = await resend.emails.send({
        from: process.env.FROM_EMAIL || "no-reply@vodenabasta.rs",
        to: process.env.EMAIL_TO || "",
        subject: `Nova poruka sa sajta — ${parsed.data.name}`,

        html: `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #f8fdfb; border: 1px solid #d8f3e9; border-radius: 14px;">
            
            <h1 style="color: #066a52; text-align:center; font-size: 22px; margin-bottom: 24px;">
              Nova poruka sa <strong>vodenabasta.rs</strong>
            </h1>

            <p style="font-size: 16px; color: #14453d; margin-bottom: 8px;">
              <strong>Ime:</strong> ${parsed.data.name}
            </p>

            <p style="font-size: 16px; color: #14453d; margin-bottom: 8px;">
              <strong>Email:</strong>
              <a href="mailto:${parsed.data.email}" style="color:#0a7c66; text-decoration:none;">
                ${parsed.data.email}
              </a>
            </p>

            <p style="font-size: 16px; color: #14453d; margin-bottom: 16px;">
              <strong>Telefon:</strong> ${parsed.data.phone || "-"}
            </p>

            <p style="font-size: 16px; color: #14453d; margin-bottom: 16px;">
              <strong>Poruka:</strong><br>
              <span style="white-space: pre-wrap; line-height: 1.6;">
                ${parsed.data.message}
              </span>
            </p>

            <hr style="border:none; border-top: 1px solid #d8f3e9; margin: 28px 0;">

            <p style="font-size: 13px; color: #5a7c74; text-align:center;">
              Ova poruka je poslata automatski preko kontakt forme na
              <strong>vodenabasta.rs</strong>.
            </p>

          </div>
        `,
      });

      if (error) {
        console.error("[Resend] Email sending failed", error);
        return NextResponse.json(
          {
            ok: false,
            message: "Greška pri slanju emaila. Pokušajte kasnije.",
          },
          { status: 502 }
        );
      }
    } catch (emailError) {
      console.error("[Resend] Unexpected error", emailError);
      return NextResponse.json(
        {
          ok: false,
          message: "Došlo je do greške prilikom slanja poruke.",
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
        message: "Neočekivana greška. Pokušajte kasnije.",
      },
      { status: 500 }
    );
  }
}
