import { NextResponse } from "next/server";
import { z } from "zod";

import { getSupabaseClient } from "@/lib/supabase";

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

    const supabase = getSupabaseClient();

    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      message: parsed.data.message,
    });

    if (error) {
      console.error("[Supabase] contact_messages insert error", error);
      return NextResponse.json(
        {
          ok: false,
          message: "Trenutno ne možemo da obradimo zahtev. Pokušajte kasnije.",
        },
        { status: 502 }
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

