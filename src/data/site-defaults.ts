import type { FooterColumn } from "@/components/layout/SiteFooter";

/** Shared defaults for seed + UI fallback when DB is empty. */
export const defaultNavItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

export const defaultFooterColumns: FooterColumn[] = [
  {
    title: "LINK",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Service", href: "/services" },
      { label: "NFT Projects", href: "/projects" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "CONTACT INFO",
    contact: [
      { type: "location", value: "RAK Economic Zone, Building 4, Ras Al Khaimah, United Arab Emirates" },
      { type: "mail", value: "inquiry@cryptonexis.com" },
    ],
  },
];

export const defaultFooterMeta = {
  brand: "CRYPTONEXIS LIMITED",
  description:
    "The Architectural Ledger of digital asset creation. Institutional grade security and regulatory excellence in the heart of the UAE.",
  social: [],
  copyright:
    "© 2024 CRYPTONEXIS LIMITED. UAE REGULATED. RAK ECONOMIC ZONE.",
  ctaLabel: "REQUEST CREDENTIALS",
  ctaHref: "/contact",
  legal: [
    { label: "PRIVACY POLICY", href: "/privacy" },
    { label: "TERMS OF SERVICE", href: "/terms" },
    { label: "CONTACT", href: "/contact" },
  ],
};

export const defaultApplyNowModal = {
  panelTitle: "Unlock Your Potential",
  panelDescription:
    "Join a global community of innovators and business leaders in Dubai's premier business hub.",
  panelHighlights: ["Elite Faculty", "Global Network", "Startup Incubator"],
  formTitle: "Request Information",
  formDescription: "Fill in the details below to receive a personalized program consultation.",
  fullNameLabel: "FULL NAME",
  fullNamePlaceholder: "Enter your full name",
  phoneLabel: "PHONE NUMBER",
  phonePlaceholder: "+971      50 123 4567",
  emailLabel: "WORK EMAIL",
  emailPlaceholder: "email@company.com",
  cityLabel: "SELECT CITY",
  cityPlaceholder: "Choose City",
  cityOptions: ["Dubai", "Abu Dhabi", "Sharjah"],
  experienceLabel: "EXPERIENCE",
  experiencePlaceholder: "Years of Experience",
  experienceOptions: ["0-2 Years", "3-5 Years", "6-10 Years", "10+ Years"],
  messageLabel: "MESSAGE (OPTIONAL)",
  messagePlaceholder: "Tell us about your career goals...",
  customFields: [] as Array<{
    label: string;
    placeholder: string;
    inputType: "text" | "email" | "number";
  }>,
  termsText: "I agree to the Terms of Service and Privacy Policy.",
  marketingConsentText: "I consent to receive promotional offers and communication via email and SMS.",
  submitLabel: "ENROLL NOW",
};

