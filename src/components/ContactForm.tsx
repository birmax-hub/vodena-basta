"use client";

"use client";

import { useState } from "react";

import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Unesite puno ime i prezime.")
    .max(120, "Unos je predugačak."),
  email: z
    .string()
    .email("Unesite validnu email adresu.")
    .max(160, "Email je predugačak."),
  phone: z
    .string()
    .max(60, "Broj telefona je predugačak.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Poruka treba da ima bar 10 karaktera.")
    .max(1500, "Poruka je predugačka."),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type ContactFormProps = {
  onStatusChange?: (
    status: "idle" | "saving" | "success" | "error",
    message: string | null
  ) => void;
  className?: string;
};

export function ContactForm({ onStatusChange, className }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>(
    {}
  );
  const [status, setStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const updateStatus = (
    nextStatus: "idle" | "saving" | "success" | "error",
    message: string | null
  ) => {
    setStatus(nextStatus);
    setServerMessage(message);
    onStatusChange?.(nextStatus, message);
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateStatus("idle", null);

    // Honeypot check
    if (values.website && values.website.trim() !== "") {
      updateStatus("error", "Spam detected.");
      return;
    }

    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormValues;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      updateStatus(
        "error",
        "Proverite obeležena polja i pokušajte ponovo."
      );
      return;
    }

    updateStatus("saving", null);
    try {
      // Include website field in payload for backend honeypot validation
      const payload = { ...parsed.data, website: values.website };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || "Neuspešno slanje";
        updateStatus("error", errorMessage);
        return;
      }

      setValues({
        name: "",
        email: "",
        phone: "",
        message: "",
        website: "",
      });
      updateStatus("success", "Hvala! Javićemo vam se uskoro.");
    } catch (error) {
      console.error(error);
      updateStatus(
        "error",
        "Došlo je do greške prilikom slanja poruke. Pokušajte ponovo ili nas pozovite telefonom."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "glass-panel space-y-6 rounded-3xl border-white/[0.02] bg-white/[0.015] p-8 text-accent-100 shadow-[0_0_60px_rgba(26,217,206,0.05)] backdrop-blur-2xl",
        className
      )}
      noValidate
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-accent-200"
        >
          Ime i prezime
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          className={cn(
            "mt-2 w-full rounded-2xl border border-white/[0.03] bg-white/[0.05] px-4 py-3 text-sm text-white shadow-[0_0_35px_rgba(26,217,206,0.08)] backdrop-blur focus:border-accent-300/40 focus:outline-none focus:ring-2 focus:ring-accent-300/30",
            errors.name ? "border-red-400/70 focus:ring-red-400/40" : ""
          )}
          placeholder="Vaše puno ime"
          required
        />
        {errors.name ? (
          <p className="mt-2 text-xs text-red-200">{errors.name}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-accent-200"
        >
          Email adresa
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          className={cn(
            "mt-2 w-full rounded-2xl border border-white/[0.03] bg-white/[0.05] px-4 py-3 text-sm text-white shadow-[0_0_35px_rgba(26,217,206,0.08)] backdrop-blur focus:border-accent-300/40 focus:outline-none focus:ring-2 focus:ring-accent-300/30",
            errors.email ? "border-red-400/70 focus:ring-red-400/40" : ""
          )}
          placeholder="primer@domen.rs"
          required
        />
        {errors.email ? (
          <p className="mt-2 text-xs text-red-200">{errors.email}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-accent-200"
        >
          Broj telefona (opciono)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          className={cn(
            "mt-2 w-full rounded-2xl border border-white/[0.03] bg-white/[0.05] px-4 py-3 text-sm text-white shadow-[0_0_35px_rgba(26,217,206,0.08)] backdrop-blur focus:border-accent-300/40 focus:outline-none focus:ring-2 focus:ring-accent-300/30",
            errors.phone ? "border-red-400/70 focus:ring-red-400/40" : ""
          )}
          placeholder="+381 60 000 0000"
        />
        {errors.phone ? (
          <p className="mt-2 text-xs text-red-200">{errors.phone}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-accent-200"
        >
          Poruka
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          className={cn(
            "mt-2 w-full rounded-2xl border border-white/[0.03] bg-white/[0.05] px-4 py-3 text-sm text-white shadow-[0_0_35px_rgba(26,217,206,0.08)] backdrop-blur focus:border-accent-300/40 focus:outline-none focus:ring-2 focus:ring-accent-300/30",
            errors.message ? "border-red-400/70 focus:ring-red-400/40" : ""
          )}
          placeholder="Opišite Vaš projekat, ciljeve i vremenski okvir..."
          required
        />
        {errors.message ? (
          <p className="mt-2 text-xs text-red-200">{errors.message}</p>
        ) : null}
      </div>

      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={values.website}
        onChange={(event) => handleChange("website", event.target.value)}
      />

      {serverMessage ? (
        <div
          className={cn(
            "rounded-2xl border px-4 py-3 text-sm",
            status === "success"
              ? "border-accent-300/40 bg-accent-300/10 text-accent-100"
              : "border-red-400/60 bg-red-500/10 text-red-200"
          )}
        >
          {serverMessage}
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-accent-100/75">
          Slanjem poruke prihvatate obradu podataka u svrhu odgovora na upit.
        </p>
        <Button
          type="submit"
          disabled={status === "saving"}
          className="glass-button border-white/[0.03] bg-accent-300/20 px-7 py-2 text-sm font-semibold text-white hover:bg-accent-300/28 focus-visible:outline-white/40"
        >
          {status === "saving" ? "Slanje..." : "Pošalji poruku"}
        </Button>
      </div>
    </form>
  );
}

