"use client";

import type { z } from "zod";
import type { contactInquiryDataSchema } from "@/schemas/sections";
import ContactLeadFieldError from "@/components/forms/ContactLeadFieldError";
import { useContactLeadForm } from "@/hooks/useContactLeadForm";
import SimpleIcon from "../SimpleIcon";
import { regionalHubMapAlt } from "@/lib/image-alt";

type ContactInquiryContent = z.infer<typeof contactInquiryDataSchema>;

const DEFAULT_EYEBROW = "CONTACT CHANNELS";
const DEFAULT_TITLE = "Connect with our Partners";
const DEFAULT_SIDE =
  "Facilitating digital asset mobility for institutional ecosystems with architectural precision and regulatory rigor.";

const DEFAULT_HQ = {
  heading: "Global Headquarters",
  contacts: [
    {
      icon: "location" as const,
      value: "RAK Economic Zone, Building 4, Ras Al Khaimah, United Arab Emirates",
    },
    { icon: "mail" as const, value: "partners@cryptonexis.com" },
    { icon: "phone" as const, value: "+971 (0) 7 204 1111" },
  ],
};

const DEFAULT_HOURS = {
  heading: "Institutional Hours",
  rows: [
    { days: "MONDAY — FRIDAY", hours: "09:00 — 18:00 GST" },
    { days: "SATURDAY — SUNDAY", hours: "CLOSED" },
  ],
};

const DEFAULT_MATRIX = {
  label: "LOCATION MATRIX",
  title: "Ras Al Khaimah",
  subtitle: "RAKEZ ECONOMIC ZONE HUB",
  mapImage: "/contact/uae-map.jpg",
  mapImageAlt:
    "Regional map of Ras Al Khaimah RAK Economic Zone hub — Cryptonexis Limited institutional location",
  linkLabel: "OPEN REGIONAL GRID →",
  linkHref: "https://maps.google.com/?q=RAK+Economical+Zone",
};

function resolveHeroTitle(content: ContactInquiryContent) {
  if (content.heroTitle?.trim()) return content.heroTitle.trim();
  if (content.heroTitleLines && content.heroTitleLines.length > 0) {
    return content.heroTitleLines.join(" ");
  }
  return DEFAULT_TITLE;
}

function resolveHqContacts(content: ContactInquiryContent) {
  if (content.hqContacts && content.hqContacts.length > 0) {
    return content.hqContacts;
  }
  if (content.officeItems && content.officeItems.length > 0) {
    return content.officeItems.flatMap((item) =>
      item.lines.map((line) => ({
        icon:
          item.icon === "mail" || item.icon === "phone" ? item.icon : (item.icon || "location"),
        value: line,
      })),
    );
  }
  return DEFAULT_HQ.contacts;
}

export default function ContactInquirySection({ content }: { content: ContactInquiryContent }) {
  const formFields = content.formFields ?? {};
  const heroEyebrow = content.heroEyebrow?.trim() || DEFAULT_EYEBROW;
  const heroTitle = resolveHeroTitle(content);
  const heroSideCopy = content.heroSideCopy?.trim() || DEFAULT_SIDE;
  const submitLabel = content.submitLabel?.trim() || "SUBMIT INQUIRY";

  const nameLabel = formFields.fullNameLabel?.trim() || "NAME";
  const emailLabel = formFields.workEmailLabel?.trim() || "INSTITUTIONAL EMAIL";
  const subjectLabel = formFields.interestLabel?.trim() || "SUBJECT";
  const messageLabel = formFields.messageLabel?.trim() || "PROJECT SUMMARY";

  const namePlaceholder = formFields.fullNamePlaceholder?.trim() || "Johnathan Doe";
  const emailPlaceholder =
    formFields.workEmailPlaceholder?.trim() || "j.doe@institution.com";
  const subjectPlaceholder =
    formFields.interestPlaceholder?.trim() || "Inquiry: Asset Management Protocol";
  const messagePlaceholder =
    formFields.messagePlaceholder?.trim() ||
    "Briefly describe your institutional requirements...";

  const hqHeading = content.hqHeading?.trim() || content.officeHeading?.trim() || DEFAULT_HQ.heading;
  const hqContacts = resolveHqContacts(content);

  const hoursHeading = content.hoursHeading?.trim() || DEFAULT_HOURS.heading;
  const hoursRows =
    content.hoursRows && content.hoursRows.length > 0
      ? content.hoursRows
      : DEFAULT_HOURS.rows;

  const matrix = {
    ...DEFAULT_MATRIX,
    ...content.locationMatrix,
    mapImage:
      content.locationMatrix?.mapImage?.trim() ||
      content.mapImage?.trim() ||
      DEFAULT_MATRIX.mapImage,
  };

  const { registerField, onSubmit, status, feedback, formState: { errors } } =
    useContactLeadForm("contact", {
      successMessage: formFields.successMessage,
      errorMessage: formFields.errorMessage,
    });

  return (
    <div className="cx-contact">
      <section className="cx-contact__main" aria-labelledby="cx-contact-title">
        <div className="section-shell cx-contact__shell">
          <header className="cx-contact__hero">
            <div className="cx-contact__hero-left">
              <p className="cx-contact__eyebrow">{heroEyebrow}</p>
              <h1 id="cx-contact-title" className="cx-contact__title">
                {heroTitle}
              </h1>
            </div>
            <div className="cx-contact__hero-right">
              <span className="cx-contact__hero-divider" aria-hidden="true" />
              <p className="cx-contact__hero-side">{heroSideCopy}</p>
            </div>
          </header>

          <div className="cx-contact__body">
            <div className="cx-contact__form-panel">
              <form
                className="cx-contact__form"
                onSubmit={onSubmit}
                noValidate
                suppressHydrationWarning
              >
                <div className="cx-contact__form-row">
                  <label
                    className={`cx-contact__field${errors.name ? " cx-contact__field--invalid" : ""}`}
                  >
                    <span className="cx-contact__label">{nameLabel}</span>
                    <input
                      suppressHydrationWarning
                      type="text"
                      autoComplete="name"
                      className="cx-contact__input"
                      placeholder={namePlaceholder}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      {...registerField("name")}
                    />
                    <ContactLeadFieldError
                      id="contact-name-error"
                      message={errors.name?.message}
                      className="cx-contact__field-error"
                    />
                  </label>

                  <label
                    className={`cx-contact__field${errors.email ? " cx-contact__field--invalid" : ""}`}
                  >
                    <span className="cx-contact__label">{emailLabel}</span>
                    <input
                      suppressHydrationWarning
                      type="email"
                      autoComplete="email"
                      className="cx-contact__input"
                      placeholder={emailPlaceholder}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      {...registerField("email")}
                    />
                    <ContactLeadFieldError
                      id="contact-email-error"
                      message={errors.email?.message}
                      className="cx-contact__field-error"
                    />
                  </label>
                </div>

                <label
                  className={`cx-contact__field${errors.subject ? " cx-contact__field--invalid" : ""}`}
                >
                  <span className="cx-contact__label">{subjectLabel}</span>
                  <input
                    suppressHydrationWarning
                    type="text"
                    className="cx-contact__input"
                    placeholder={subjectPlaceholder}
                    aria-invalid={errors.subject ? true : undefined}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    {...registerField("subject")}
                  />
                  <ContactLeadFieldError
                    id="contact-subject-error"
                    message={errors.subject?.message}
                    className="cx-contact__field-error"
                  />
                </label>

                <label
                  className={`cx-contact__field cx-contact__field--area${errors.message ? " cx-contact__field--invalid" : ""}`}
                >
                  <span className="cx-contact__label">{messageLabel}</span>
                  <textarea
                    suppressHydrationWarning
                    rows={5}
                    className="cx-contact__input cx-contact__textarea"
                    placeholder={messagePlaceholder}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    {...registerField("message")}
                  />
                  <ContactLeadFieldError
                    id="contact-message-error"
                    message={errors.message?.message}
                    className="cx-contact__field-error"
                  />
                </label>

                <button
                  suppressHydrationWarning
                  type="submit"
                  className="cx-contact__submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "SUBMITTING..." : submitLabel}
                </button>

                {feedback ? (
                  <p
                    className={
                      status === "ok"
                        ? "cx-contact__feedback cx-contact__feedback--ok"
                        : "cx-contact__feedback cx-contact__feedback--err"
                    }
                    role="status"
                  >
                    {feedback}
                  </p>
                ) : null}
              </form>
            </div>

            <aside className="cx-contact__aside" aria-label="Headquarters and hours">
              <div className="cx-contact__hq">
                <h2 className="cx-contact__aside-title">{hqHeading}</h2>
                <ul className="cx-contact__hq-list">
                  {hqContacts.map((item, index) => (
                    <li key={`${item.icon}-${index}`} className="cx-contact__hq-item">
                      <span className="cx-contact__hq-icon" aria-hidden="true">
                        <SimpleIcon
                          name={item.icon}
                          className="cx-contact__hq-icon-svg"
                        />
                      </span>
                      {item.icon === "mail" ? (
                        <a className="cx-contact__hq-value" href={`mailto:${item.value}`}>
                          {item.value}
                        </a>
                      ) : item.icon === "phone" ? (
                        <a className="cx-contact__hq-value" href={`tel:${item.value.replace(/\s/g, "")}`}>
                          {item.value}
                        </a>
                      ) : (
                        <span className="cx-contact__hq-value">{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cx-contact__hours">
                <h2 className="cx-contact__aside-title">{hoursHeading}</h2>
                <dl className="cx-contact__hours-list">
                  {hoursRows.map((row) => (
                    <div key={row.days} className="cx-contact__hours-row">
                      <dt>{row.days}</dt>
                      <dd>{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="cx-contact__matrix-band" aria-labelledby="cx-contact-matrix-title">
        <div className="section-shell cx-contact__matrix-shell">
          <article className="cx-contact__matrix-card">
            <p className="cx-contact__matrix-label">{matrix.label}</p>
            <h2 id="cx-contact-matrix-title" className="cx-contact__matrix-title">
              {matrix.title}
            </h2>
            <p className="cx-contact__matrix-subtitle">{matrix.subtitle}</p>
            <div className="cx-contact__matrix-media">
              <img
                src={matrix.mapImage}
                alt={regionalHubMapAlt({
                  imageAlt: matrix.mapImageAlt,
                  title: matrix.title,
                  subtitle: matrix.subtitle,
                })}
                width={400}
                height={400}
                decoding="async"
                loading="lazy"
              />
            </div>
            <a className="cx-contact__matrix-link" href={matrix.linkHref}>
              {matrix.linkLabel}
            </a>
          </article>
        </div>
      </section>
    </div>
  );
}
