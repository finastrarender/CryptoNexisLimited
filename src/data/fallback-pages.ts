/**
 * Static page content when Mongo has no row yet (before `pnpm seed`)
 * or when a slug is missing. Keeps the marketing site usable on first run.
 */
import type { PublicPageView } from "@/lib/content/pages";
import type { PageSection } from "@/types/section";
import {
  CONTACT_REGIONAL_MAP_ALT,
  LEADERSHIP_IMAGE_ALTS,
  PROJECT_GRID_IMAGE_ALTS,
  RAK_MAP_IMAGE_ALT,
} from "@/data/image-alt-defaults";

function sid(slug: string, type: string, order: number): string {
  return `fb-${slug}-${type}-${order}`;
}

function sections(
  slug: string,
  list: { type: PageSection["type"]; order: number; data: Record<string, unknown> }[],
): PageSection[] {
  return list.map((s) => ({
    id: sid(slug, s.type, s.order),
    type: s.type,
    order: s.order,
    data: s.data,
  }));
}

const homeHeroData = {
  badge: "INSTITUTIONAL DIGITAL ASSETS",
  title: ["Licensed NFT Creator and Issuer"],
  description:
    "Cryptonexis Limited is a licensed entity focused on NFT creation and NFT issuance for artists, brands, businesses, and project owners.",
  primaryAction: { label: "VIEW SERVICES", href: "/services" },
  secondaryAction: { label: "INQUIRE NOW", href: "/contact" },
  backgroundImage: "/home/hero-building.jpg",
};

const homeFoundationData = {
  eyebrow: "",
  title: ["The Foundation of", "Digital Trust"],
  description:
    "Cryptonexis Limited stands at the forefront of the UAE’s evolving digital economy. As a regulated issuer of non-fungible tokens, we provide institutional clients with the legal and technical scaffolding required for sophisticated asset management.",
  highlights: [],
  image: "",
  href: "",
  expcount: 0,
  more:
    "Our approach is built on three core pillars: regulatory compliance, architectural integrity, and cryptographic security. We do not participate in speculative retail markets; we build utility-driven ecosystems for the modern enterprise.",
};

const homeCapabilitiesData = {
  eyebrow: "CAPABILITIES",
  title: "Strategic Issuance",
  description:
    "Leveraging advanced smart contract engineering to deliver robust digital asset solutions for the global market.",
  pillars: [
    {
      icon: "tokenize",
      title: "Asset Tokenization",
      description:
        "Converting physical and intellectual property into compliant digital representations.",
    },
    {
      icon: "compass",
      title: "Contract Architecture",
      description:
        "Custom smart contract development with rigorous multi-stage security auditing.",
    },
    {
      icon: "gavel",
      title: "Regulatory Advisory",
      description:
        "Navigating complex international digital asset laws for seamless issuance.",
    },
  ],
};

const aboutHeroData = {
  eyebrow: "ESTABLISHED 2024",
  titleLines: ["Institutional", "Integrity", "By Design"],
  sideCopy:
    "A digital environment where quiet authority meets architectural precision. We build for the long term.",
  description:
    "Cryptonexis Limited is a Company Limited by Shares based in Ras Al Khaimah, UAE. The company is licensed by RAK Digital Assets Oasis to carry out NFT creation and NFT issuance.",
  image: "/home/hero-building.jpg",
};

const aboutMissionData = {
  label: "OUR MISSION",
  headlineLead: "Architecting the future of regulated digital assets through",
  headlineBold: "uncompromising technical rigor and institutional transparency.",
  description:
    "Cryptonexis Limited bridges the gap between traditional finance and decentralized innovation. We operate on the principle of the 'Architectural Ledger'—where every transaction and strategy is built upon a foundation of structural permanence and regulatory alignment.",
  pillars: [
    {
      title: "CORE PHILOSOPHY",
      description:
        "Precision over hype. We reject the volatility of trends in favor of the stability of mathematical proof and legal compliance.",
    },
    {
      title: "TARGET HORIZON",
      description:
        "Securing generational wealth through advanced custody protocols and algorithmic risk management for family offices.",
    },
  ],
};

const aboutLeadershipData = {
  title: "EXECUTIVE LEADERSHIP",
  asideLabel: "THE GOVERNANCE BOARD",
  members: [
    {
      name: "MARCUS THORNE",
      role: "CHIEF EXECUTIVE OFFICER",
      bio: "Former Lead Architect at Swiss Global Assets with two decades of experience in institutional fintech and regulatory frameworks.",
      image: "/about/leader-1.jpg",
      imageAlt: LEADERSHIP_IMAGE_ALTS["MARCUS THORNE"],
    },
    {
      name: "ELENA VANCE",
      role: "CHIEF COMPLIANCE OFFICER",
      bio: "Expert in Middle Eastern and European digital asset regulations, formerly heading the policy division at RAK International.",
      image: "/about/leader-2.jpg",
      imageAlt: LEADERSHIP_IMAGE_ALTS["ELENA VANCE"],
    },
    {
      name: "JULIAN BECK",
      role: "CHIEF TECHNOLOGY OFFICER",
      bio: "Pioneer in cryptographic proof-of-reserve systems and former security lead for Tier-1 investment banking infrastructure.",
      image: "/about/leader-3.jpg",
      imageAlt: LEADERSHIP_IMAGE_ALTS["JULIAN BECK"],
    },
  ],
};

const aboutRegulatoryData = {
  badge: "LICENSING & REGULATORY COMPLIANCE",
  title: "REGULATED ENTITY STATUS",
  description:
    "Cryptonexis Limited operates under strict oversight within the UAE's burgeoning digital economy. We are a fully licensed entity governed by the RAK International Corporate Centre (RAK ICC) and aligned with the UAE's broader strategy for financial excellence.",
  stats: [
    { value: "RAK ICC", label: "JURISDICTION AUTHORITY" },
    { value: "UAE AML-CFT", label: "GLOBAL STANDARDS ADHERENCE" },
  ],
  cardTitle: "INSTITUTIONAL GUARDRAILS",
  cardItems: [
    "Periodic independent security and financial audits.",
    "Full transparency with Tier-1 banking partners.",
    "Rigorous KYB (Know Your Business) protocols for all institutional clients.",
  ],
};

const aboutCtaData = {
  title: ["BUILD ON", "CERTAINTY"],
  description:
    "Connect with our institutional relations team to discuss your digital asset strategy under our regulated framework.",
  primaryAction: { label: "CONTACT RELATIONS", href: "/contact" },
  secondaryAction: { label: "VIEW LICENSING", href: "/services" },
};

const servicesLicensingData = {
  eyebrow: "INSTITUTIONAL DIGITAL ASSETS",
  title: ["Services &", "Licensing."],
  description:
    "Providing high-end architectural infrastructure for digital asset issuance within a regulated framework. Precise. Authorized. Institutional.",
  reliabilityTitle: "Institutional Reliability.",
  reliabilityDescription:
    "Our infrastructure is built on the premise of architectural precision. We eliminate volatility through rigorous compliance and verified blockchain stamps.",
  cards: [
    {
      title: "NFT Creation",
      description:
        "Architecting bespoke smart contract environments for large-scale digital asset minting. Ensuring structural integrity across multiple chain protocols.",
      linkLabel: "PROTOCOL DETAILS →",
      linkHref: "/contact",
      icon: "blocks",
    },
    {
      title: "NFT Issuance",
      description:
        "Managed deployment of verified digital stamps and high-volume asset issuance. Integrated provenance tracking for institutional-grade reliability.",
      linkLabel: "ISSUANCE FRAMEWORK →",
      linkHref: "/contact",
      icon: "shield-check",
    },
  ],
  licenses: [
    {
      licenseNumber: "RAK-CNX-2024-001",
      authority: "RAK Economic Zone",
      legalType: "Commercial Digital Assets",
      location: "UAE",
      status: "LICENSED",
    },
    {
      licenseNumber: "IF-UAE-9932-A",
      authority: "Freezone Authority",
      legalType: "Technology Infrastructure",
      location: "Dubai",
      status: "LICENSED",
    },
    {
      licenseNumber: "GB-SEC-LP-8812",
      authority: "Global Blockchain Council",
      legalType: "Security Protocol Member",
      location: "International",
      status: "LICENSED",
    },
  ],
  complianceNotice:
    "CRYPTONEXIS LIMITED OPERATES UNDER STRICT COMPLIANCE MANDATES AS REQUIRED BY UAE RAK ECONOMIC ZONE REGULATIONS. ALL ASSET MINTING PROTOCOLS ARE AUDITED QUARTERLY FOR STRUCTURAL INTEGRITY.",
};

const contactInquiryData = {
  heroEyebrow: "CONTACT CHANNELS",
  heroTitle: "Connect with our Partners",
  heroSideCopy:
    "Facilitating digital asset mobility for institutional ecosystems with architectural precision and regulatory rigor.",
  submitLabel: "SUBMIT INQUIRY",
  formFields: {
    fullNameLabel: "NAME",
    fullNamePlaceholder: "Johnathan Doe",
    workEmailLabel: "INSTITUTIONAL EMAIL",
    workEmailPlaceholder: "j.doe@institution.com",
    interestLabel: "SUBJECT",
    interestPlaceholder: "Inquiry: Asset Management Protocol",
    messageLabel: "PROJECT SUMMARY",
    messagePlaceholder: "Briefly describe your institutional requirements...",
    successMessage:
      "Thank you — our institutional relations team will be in touch shortly.",
    errorMessage: "Something went wrong. Please try again.",
  },
  hqHeading: "Global Headquarters",
  hqContacts: [
    {
      icon: "location",
      value: "RAK Economic Zone, Building 4, Ras Al Khaimah, United Arab Emirates",
    },
    { icon: "mail", value: "partners@cryptonexis.com" },
    { icon: "phone", value: "+971 (0) 7 204 1111" },
  ],
  hoursHeading: "Institutional Hours",
  hoursRows: [
    { days: "MONDAY — FRIDAY", hours: "09:00 — 18:00 GST" },
    { days: "SATURDAY — SUNDAY", hours: "CLOSED" },
  ],
  locationMatrix: {
    label: "LOCATION MATRIX",
    title: "Ras Al Khaimah",
    subtitle: "RAKEZ ECONOMIC ZONE HUB",
    mapImage: "/contact/uae-map.jpg",
    mapImageAlt: CONTACT_REGIONAL_MAP_ALT,
    linkLabel: "OPEN REGIONAL GRID →",
    linkHref: "https://maps.google.com/?q=RAK+Economical+Zone",
  },
};

const projectsHeroData = {
  eyebrow: "INSTITUTIONAL PORTFOLIO",
  titleLines: ["Strategic Digital", "Assets & NFT", "Infrastructure"],
  description:
    "Archiving the evolution of institutional-grade tokenization and distributed ledger deployments across the MENA region.",
};

const projectsGridData = {
  items: [
    {
      category: "Real Estate",
      title: "RAK Waterfront Series",
      image: "/projects/rak-waterfront.jpg",
      imageAlt: PROJECT_GRID_IMAGE_ALTS["RAK Waterfront Series"],
    },
    {
      category: "Protocol",
      title: "Ledger Identity V.2",
      image: "/projects/ledger-identity.jpg",
      imageAlt: PROJECT_GRID_IMAGE_ALTS["Ledger Identity V.2"],
    },
    {
      category: "Finance",
      title: "Sovereign Debt Tokens",
      image: "/projects/sovereign-debt.jpg",
      imageAlt: PROJECT_GRID_IMAGE_ALTS["Sovereign Debt Tokens"],
    },
    {
      category: "Logistics",
      title: "Supply Chain Registry",
      image: "/projects/supply-chain.jpg",
      imageAlt: PROJECT_GRID_IMAGE_ALTS["Supply Chain Registry"],
    },
    {
      category: "Governance",
      title: "Citizen DAO Protocol",
      image: "/projects/citizen-dao.jpg",
      imageAlt: PROJECT_GRID_IMAGE_ALTS["Citizen DAO Protocol"],
    },
    {
      category: "Luxury",
      title: "Heritage Asset Vault",
      image: "/projects/heritage-vault.jpg",
      imageAlt: PROJECT_GRID_IMAGE_ALTS["Heritage Asset Vault"],
    },
  ],
};

const projectsIntegrityData = {
  heading: "Institutional Integrity by Design",
  description:
    "Cryptonexis operates at the intersection of regulatory compliance and technological frontier, ensuring each partnership is built on a foundation of absolute transparency.",
  items: [
    {
      icon: "badgeCheck",
      title: "Licensed and compliant",
      description:
        "Operating under strict UAE regulatory frameworks and governance standards.",
    },
    {
      icon: "mapPin",
      title: "Strategic UAE location",
      description:
        "Headquartered in the RAK Economic Zone, a global hub for digital asset innovation.",
    },
    {
      icon: "compassNav",
      title: "Focused expertise",
      description:
        "Deep specialization in NFT architecture and institutional blockchain deployments.",
    },
    {
      icon: "eyeOpen",
      title: "Transparent operations",
      description:
        "Real-time reporting and absolute clarity in all asset management protocols.",
    },
  ],
};

const projectsPartnersData = {
  formTitle: "Connect with our Partners",
  submitLabel: "SEND INQUIRY",
  mapImage: "/projects/rak-map.jpg",
  mapImageAlt: RAK_MAP_IMAGE_ALT,
  hqLabel: "HQ LOCATION",
  hqTitle: "RAK Economic Zone",
  hqAddress: "Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates",
  contactLabel: "DIRECT CONTACT",
  contactEmail: "office@cryptonexis.com",
  placeholders: {
    name: "Johnathan Doe",
    email: "j.doe@institution.com",
    subject: "Inquiry: Asset Management Protocol",
    message: "Briefly describe your institutional requirements...",
  },
};

const FALLBACK_BY_SLUG: Record<string, PublicPageView> = {
  home: {
    slug: "home",
    title: "Home",
    status: "published",
    seoTitle: "Licensed NFT Creator and Issuer",
    seoDescription:
      "Cryptonexis Limited is a RAK Economic Zone licensed NFT creator and issuer, providing institutional-grade issuance infrastructure and compliance-first advisory.",
    effectiveSections: sections("home", [
      { type: "hero", order: 0, data: homeHeroData },
      { type: "intro", order: 1, data: homeFoundationData },
      { type: "globalStandards", order: 2, data: homeCapabilitiesData },
    ]),
    isPreview: false,
  },
  about: {
    slug: "about",
    title: "About Us",
    status: "published",
    seoTitle: "About Us",
    seoDescription:
      "Learn about Cryptonexis Limited and our institutional approach to compliant digital asset creation and issuance in the UAE.",
    effectiveSections: sections("about", [
      { type: "aboutHero", order: 0, data: aboutHeroData },
      { type: "aboutMission", order: 1, data: aboutMissionData },
      { type: "aboutLeadership", order: 2, data: aboutLeadershipData },
      { type: "aboutRegulatory", order: 3, data: aboutRegulatoryData },
      { type: "aboutCTA", order: 4, data: aboutCtaData },
    ]),
    isPreview: false,
  },
  services: {
    slug: "services",
    title: "Services",
    status: "published",
    seoTitle: "Services",
    seoDescription:
      "Institutional NFT creation and issuance services, licensing authority, and regulated digital asset infrastructure from Cryptonexis Limited.",
    effectiveSections: sections("services", [
      { type: "servicesLicensing", order: 0, data: servicesLicensingData },
    ]),
    isPreview: false,
  },
  projects: {
    slug: "projects",
    title: "Projects",
    status: "published",
    seoTitle: "Projects",
    seoDescription:
      "Institutional digital asset and NFT infrastructure portfolio — tokenization and distributed ledger deployments across the MENA region.",
    effectiveSections: sections("projects", [
      { type: "projectsHero", order: 0, data: projectsHeroData },
      { type: "projectsGrid", order: 1, data: projectsGridData },
      { type: "projectsIntegrity", order: 2, data: projectsIntegrityData },
      { type: "projectsPartners", order: 3, data: projectsPartnersData },
    ]),
    isPreview: false,
  },
  contact: {
    slug: "contact",
    title: "Contact Us",
    status: "published",
    seoTitle: "Contact",
    seoDescription:
      "Contact Cryptonexis Limited for institutional digital asset inquiries, RAK Economic Zone headquarters, and partnership channels.",
    effectiveSections: sections("contact", [
      { type: "contactInquiry", order: 0, data: contactInquiryData },
    ]),
    isPreview: false,
  },
};

export function getFallbackPageView(slug: string): PublicPageView | null {
  return FALLBACK_BY_SLUG[slug] ?? null;
}

