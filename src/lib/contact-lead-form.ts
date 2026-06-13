import { z } from "zod";

const FULL_NAME_REGEX = /^[\p{L}\s']+$/u;

const NAME_ERROR = "Please enter a valid full name.";
const EMAIL_ERROR = "Please enter a valid institutional email address.";
const SUBJECT_ERROR = "Please enter a valid subject.";
const MESSAGE_ERROR =
  "Please provide a meaningful brief summary with at least 10 letters.";

function isMeaningfulMessage(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 10 || trimmed.length > 1000) return false;

  const letterMatches = trimmed.match(/[a-zA-Z]/g);
  if (!letterMatches || letterMatches.length < 10) return false;

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 2) return false;

  const compact = trimmed.replace(/\s+/g, "");
  if (compact.length > 0 && /^(.)\1*$/u.test(compact)) return false;

  return true;
}

const nameSchema = z
  .string()
  .trim()
  .min(2, NAME_ERROR)
  .max(50, NAME_ERROR)
  .regex(FULL_NAME_REGEX, NAME_ERROR);

const emailSchema = z
  .string()
  .trim()
  .min(1, EMAIL_ERROR)
  .email(EMAIL_ERROR)
  .max(254, EMAIL_ERROR);

const subjectSchema = z
  .string()
  .trim()
  .min(5, SUBJECT_ERROR)
  .max(150, SUBJECT_ERROR);

const messageSchema = z
  .string()
  .trim()
  .min(1, MESSAGE_ERROR)
  .max(1000, MESSAGE_ERROR)
  .refine(isMeaningfulMessage, MESSAGE_ERROR);

export const contactLeadFieldSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: subjectSchema,
  message: messageSchema,
});

export type ContactLeadFieldValues = z.infer<typeof contactLeadFieldSchema>;

export type ContactLeadSource = "contact" | "projects";

export const contactLeadApiBodySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: z.string().max(120).optional().default(""),
  company: z.string().max(200).optional().default(""),
  inquiryType: subjectSchema.optional().default(""),
  message: messageSchema,
  source: z.enum(["contact", "projects"]).optional().default("contact"),
});

const fieldSchemas = contactLeadFieldSchema.shape;

export function validateContactLeadField(
  field: keyof ContactLeadFieldValues,
  value: string,
): true | string {
  const result = fieldSchemas[field].safeParse(value);
  if (result.success) return true;
  return result.error.issues[0]?.message ?? "Invalid value.";
}

export function toContactLeadPayload(
  values: ContactLeadFieldValues,
  source: ContactLeadSource,
) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: "",
    company: "",
    inquiryType: values.subject.trim(),
    message: values.message.trim(),
    source,
  };
}
