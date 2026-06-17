"use client";

import type { z } from "zod";
import type { projectsPartnersDataSchema } from "@/schemas/sections";
import ContactLeadFieldError from "@/components/forms/ContactLeadFieldError";
import { useContactLeadForm } from "@/hooks/useContactLeadForm";
import { rakZoneMapAlt } from "@/lib/image-alt";

type ProjectsPartnersContent = z.infer<typeof projectsPartnersDataSchema>;

const DEFAULT_TITLE = "Connect with our Partners";

const DEFAULT_MAP = "/projects/rak-map.jpg";

const DEFAULT_HQ = {
  label: "HQ LOCATION",
  title: "RAK Economic Zone",
  address: "Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates",
};

const DEFAULT_CONTACT = {
  label: "DIRECT CONTACT",
  email: "office@cryptonexis.com",
};

export default function ProjectsPartnersSection({
  content,
}: {
  content?: ProjectsPartnersContent;
}) {
  const formTitle = content?.formTitle?.trim() || DEFAULT_TITLE;
  const submitLabel = content?.submitLabel?.trim() || "SEND INQUIRY";
  const mapImage = content?.mapImage?.trim() || DEFAULT_MAP;
  const hqLabel = content?.hqLabel?.trim() || DEFAULT_HQ.label;
  const hqTitle = content?.hqTitle?.trim() || DEFAULT_HQ.title;
  const hqAddress = content?.hqAddress?.trim() || DEFAULT_HQ.address;
  const contactLabel = content?.contactLabel?.trim() || DEFAULT_CONTACT.label;
  const contactEmail = content?.contactEmail?.trim() || DEFAULT_CONTACT.email;

  const placeholders = {
    name: content?.placeholders?.name?.trim() || "Johnathan Doe",
    email: content?.placeholders?.email?.trim() || "j.doe@institution.com",
    subject: content?.placeholders?.subject?.trim() || "Inquiry: Asset Management Protocol",
    message:
      content?.placeholders?.message?.trim() ||
      "Briefly describe your institutional requirements...",
  };

  const labels = {
    name: "NAME",
    email: "INSTITUTIONAL EMAIL",
    subject: "SUBJECT",
    message: "PROJECT SUMMARY",
  };

  const { registerField, onSubmit, status, feedback, formState: { errors } } =
    useContactLeadForm("projects", {
      successMessage: content?.successMessage,
      errorMessage: content?.errorMessage,
    });

  return (
    <section className="cx-projects-partners" aria-labelledby="projects-partners-title">
      <div className="cx-projects-partners__grid">
        <div className="cx-projects-partners__form-col">
          <h2 id="projects-partners-title" className="cx-projects-partners__title">
            {formTitle}
          </h2>

          <form
            className="cx-projects-partners__form"
            onSubmit={onSubmit}
            noValidate
            suppressHydrationWarning
          >
            <label
              className={`cx-projects-partners__field${errors.name ? " cx-projects-partners__field--invalid" : ""}`}
            >
              <span className="cx-projects-partners__label">{labels.name}</span>
              <input
                suppressHydrationWarning
                type="text"
                autoComplete="name"
                className="cx-projects-partners__input"
                placeholder={placeholders.name}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "projects-partners-name-error" : undefined}
                {...registerField("name")}
              />
              <ContactLeadFieldError
                id="projects-partners-name-error"
                message={errors.name?.message}
                className="cx-projects-partners__field-error"
              />
            </label>

            <label
              className={`cx-projects-partners__field${errors.email ? " cx-projects-partners__field--invalid" : ""}`}
            >
              <span className="cx-projects-partners__label">{labels.email}</span>
              <input
                suppressHydrationWarning
                type="email"
                autoComplete="email"
                className="cx-projects-partners__input"
                placeholder={placeholders.email}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "projects-partners-email-error" : undefined}
                {...registerField("email")}
              />
              <ContactLeadFieldError
                id="projects-partners-email-error"
                message={errors.email?.message}
                className="cx-projects-partners__field-error"
              />
            </label>

            <label
              className={`cx-projects-partners__field${errors.subject ? " cx-projects-partners__field--invalid" : ""}`}
            >
              <span className="cx-projects-partners__label">{labels.subject}</span>
              <input
                suppressHydrationWarning
                type="text"
                className="cx-projects-partners__input"
                placeholder={placeholders.subject}
                aria-invalid={errors.subject ? true : undefined}
                aria-describedby={errors.subject ? "projects-partners-subject-error" : undefined}
                {...registerField("subject")}
              />
              <ContactLeadFieldError
                id="projects-partners-subject-error"
                message={errors.subject?.message}
                className="cx-projects-partners__field-error"
              />
            </label>

            <label
              className={`cx-projects-partners__field cx-projects-partners__field--area${errors.message ? " cx-projects-partners__field--invalid" : ""}`}
            >
              <span className="cx-projects-partners__label">{labels.message}</span>
              <textarea
                suppressHydrationWarning
                rows={4}
                className="cx-projects-partners__input cx-projects-partners__textarea"
                placeholder={placeholders.message}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "projects-partners-message-error" : undefined}
                {...registerField("message")}
              />
              <ContactLeadFieldError
                id="projects-partners-message-error"
                message={errors.message?.message}
                className="cx-projects-partners__field-error"
              />
            </label>

            <button
              suppressHydrationWarning
              type="submit"
              className="cx-projects-partners__submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "SENDING..." : submitLabel}
            </button>

            {feedback ? (
              <p
                className={
                  status === "ok"
                    ? "cx-projects-partners__feedback cx-projects-partners__feedback--ok"
                    : "cx-projects-partners__feedback cx-projects-partners__feedback--err"
                }
                role="status"
              >
                {feedback}
              </p>
            ) : null}
          </form>
        </div>

        <aside className="cx-projects-partners__aside" aria-label="Location and contact">
          <div className="cx-projects-partners__map">
            <img
              src={mapImage}
              alt={rakZoneMapAlt({
                imageAlt: content?.mapImageAlt,
                location: hqAddress,
              })}
              width={960}
              height={480}
              decoding="async"
            />
          </div>
          <div className="cx-projects-partners__info">
            <div className="cx-projects-partners__info-block">
              <p className="cx-projects-partners__info-label">{hqLabel}</p>
              <p className="cx-projects-partners__info-title">{hqTitle}</p>
              <p className="cx-projects-partners__info-text">{hqAddress}</p>
            </div>
            <div className="cx-projects-partners__info-block">
              <p className="cx-projects-partners__info-label">{contactLabel}</p>
              <a className="cx-projects-partners__info-email" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
