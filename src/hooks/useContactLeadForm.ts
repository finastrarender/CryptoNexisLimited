"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  contactLeadFieldSchema,
  toContactLeadPayload,
  validateContactLeadField,
  type ContactLeadFieldValues,
  type ContactLeadSource,
} from "@/lib/contact-lead-form";

type SubmitMessages = {
  successMessage?: string;
  errorMessage?: string;
};

export function useContactLeadForm(
  source: ContactLeadSource,
  messages: SubmitMessages = {},
) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [feedback, setFeedback] = useState("");

  const form = useForm<ContactLeadFieldValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function registerField(name: keyof ContactLeadFieldValues) {
    return form.register(name, {
      validate: (value) => validateContactLeadField(name, String(value ?? "")),
    });
  }

  const onSubmit = form.handleSubmit(async (values) => {
    const parsed = contactLeadFieldSchema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string") {
          form.setError(field as keyof ContactLeadFieldValues, { message: issue.message });
        }
      }
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toContactLeadPayload(parsed.data, source)),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("err");
        setFeedback(
          (json?.error?.message as string) ||
            messages.errorMessage ||
            "Something went wrong. Please try again.",
        );
        return;
      }

      setStatus("ok");
      setFeedback(
        messages.successMessage ||
          "Thank you — our institutional relations team will be in touch shortly.",
      );
      form.reset();
    } catch {
      setStatus("err");
      setFeedback(messages.errorMessage || "Network error. Please try again.");
    }
  });

  return {
    ...form,
    registerField,
    onSubmit,
    status,
    feedback,
  };
}
