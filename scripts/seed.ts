/**
 * Seed MongoDB with SiteGlobal, Pages, and an admin user.
 * Run: pnpm seed
 * Requires MONGODB_URI in .env or .env.local
 */
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

import User from "../src/models/User";
import SiteGlobal from "../src/models/SiteGlobal";
import Page from "../src/models/Page";
import {
  defaultApplyNowModal,
  defaultFooterColumns,
  defaultFooterMeta,
} from "../src/data/site-defaults";
import {
  CONTACT_REGIONAL_MAP_ALT,
  LEADERSHIP_IMAGE_ALTS,
  PROJECT_GRID_IMAGE_ALTS,
  RAK_MAP_IMAGE_ALT,
} from "../src/data/image-alt-defaults";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

function section(type: string, order: number, data: Record<string, unknown>) {
  return { id: nanoid(), type, order, data };
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact us", href: "/contact" },
];
const footerColumns = defaultFooterColumns;
const footerMeta = defaultFooterMeta;

const heroData = {
  badge: "INSTITUTIONAL DIGITAL ASSETS",
  title: ["Licensed NFT Creator and Issuer"],
  lede: "Operating in the RAK Digital Assets Oasis, Ras Al Khaimah",
  description:
    "Cryptonexis Limited is a licensed entity focused on NFT creation and NFT issuance for artists, brands, businesses, and project owners.",
  primaryAction: { label: "VIEW SERVICES →", href: "/services" },
  secondaryAction: { label: "INQUIRE NOW", href: "/contact" },
  backgroundImage: "/home/hero-building.jpg",
  overlayLabel: "NETWORK PROTOCOL",
  overlayText: "Secure, audited infrastructure for high value asset issuance.",
};

const introData = {
  title: ["The Foundation of", "Digital Trust"],
  description:
    "Cryptonexis Limited stands at the forefront of the UAE's evolving digital economy. As a pioneer in the regulated issuance of non-fungible tokens, we provide institutional clients with the legal and technical scaffolding required for sophisticated asset management.",
  more:
    "Our approach is built on three core pillars: regulatory compliance, architectural integrity, and cryptographic security. We do not participate in speculative retail markets; we build utility-driven ecosystems for the modern enterprise.",
  stats: [
    { value: "UAE", label: "JURISDICTION" },
    { value: "RAK", label: "ECONOMIC ZONE" },
  ],
  cardLabel: "LICENSING AUTHORITY",
  cardDescription:
    "Cryptonexis Limited is registered and regulated within the RAK Economic Zone, adhering to strict financial transparency and digital asset frameworks.",
  cardLinkLabel: "REVIEW CERTIFICATION",
  cardHref: "/about",
  highlights: [],
  image: "",
  href: "/about",
  expcount: 0,
};

const globalStandardsData = {
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

const servicesData = {
  eyebrow: "OUR CAPABILITIES",
  title: "CORE PILLARS",
  description:
    "Modular solutions designed to scale with the complexity of your operational demands.",
  backgroundImage: "",
  cards: [
    {
      icon: "security",
      title: "CYBER SECURITY",
      description:
        "Defensive architecture and threat intelligence systems built to withstand the most sophisticated breaches.",
    },
    {
      icon: "online",
      title: "DATA & CLOUD",
      description:
        "High-performance cloud migration and sovereign data warehousing for sensitive enterprise assets.",
    },
    {
      icon: "innovation",
      title: "SOFTWARE & DEV",
      description:
        "Custom enterprise software engineered with a security-first methodology and technical excellence.",
    },
    {
      icon: "corporate",
      title: "CONSULTING",
      description:
        "Strategic advisory and specialized workforce training to foster a culture of technological resilience.",
    },
  ],
};

const servicesHeroData = {
  title: ["SYSTEM", "ARCHITECTURE"],
  description:
    "Enterprise-grade technological dominance through modular infrastructure, elite cybersecurity protocols, and bespoke software orchestration.",
  backgroundImage: "/home/hero-bg.jpg",
};

const servicesGridData = {
  title: "",
  description: "",
  filters: ["ALL"],
  cards: [
    {
      category: "THREAT INTEL",
      title: "CYBERSECURITY",
      description:
        "Proactive threat neutralization and sovereign data protection. We deploy advanced cryptographic standards and real-time mesh monitoring to secure enterprise perimeters.",
      features: ["THREAT INTEL", "ZERO TRUST", "SOC OPS"],
      cta: "",
      icon: "security",
    },
    {
      category: "HYBRID MULTI-CLOUD",
      title: "DATA & CLOUD",
      description:
        "High-availability cloud orchestration. Scalable neural architectures designed for 99.99% uptime and hyper-efficient data throughput.",
      features: ["HYBRID MULTI-CLOUD", "EDGE COMPUTING"],
      cta: "",
      icon: "online",
    },
    {
      category: "MODULAR STACKS",
      title: "SOFTWARE & DEV",
      description:
        "Mission-critical application development. Precision-engineered codebase built for speed, modularity, and future-proof scaling.",
      features: [],
      cta: "",
      icon: "innovation",
    },
    {
      category: "EXECUTIVE ENABLEMENT",
      title: "CONSULTING & TRAINING",
      description:
        "Empowering executive leadership through deep-tech audits and specialized personnel upskilling in emerging tech paradigms.",
      features: [],
      cta: "",
      icon: "corporate",
    },
  ],
};

const servicesAccordionData = {
  cards: [
    {
      title: "Management & Strategic Consultancy",
      description:
        "Strategic advisory solutions that help businesses achieve sustainable growth, operational efficiency, and competitive market positioning..",
      iconImage: "/home/headquarters.png",
      category: "management",
      points: ["Business Growth & Expansion Strategy","Corporate Advisory Services","Operational Excellence Planning"],
    },
    {
      title: "Research & Innovation",
      description:
        "Our state-of-the-art AI labs and incubation facilities support startups and established firms in developing breakthrough technologies.",
      iconImage: "/home/hero-bg.jpg",
      category: "research",
      points: [
        "AI & Machine Learning Research",
        "Product Incubation & Prototyping",
        "Market Intelligence Reports",
      ],
    },
    {
      title: "Membership Organizations",
      description:
        "Professional membership networks designed to connect entrepreneurs, corporates, investors, and industry leaders through collaboration and business engagement.",
      iconImage: "/home/headquarters.png",
      category: "membership",
      points: ["Industry Networking Events","Executive & Professional Communities","Partnership & Collaboration Opportunities"],
    },
    {
      title: "Manpower & Placement",
      description:
        "Comprehensive recruitment and workforce solutions that connect organizations with skilled professionals across multiple industries.",
      iconImage: "/home/headquarters.png",
      category: "manpower",
      points: ["alent Acquisition & Recruitment","Executive Search & Placement","Internship & Career Support Programs"],
    },
    {
      title: "Education & Training",
      description:
        "Professional education and skill development programs focused on leadership, technology, business management, and career advancement.",
      iconImage: "/home/headquarters.png",
      category: "education",
      points: ["Executive & Leadership Training","AI & Technology Programs","Professional Certification Courses"],
    },
  ],
};

const incubationData = {
  badge: "ONE WORLD BUSINESS SCHOOL & INCUBATION CENTRE FZE",
  title: "Turn Your Vision into a Market-Leading Enterprise",
  description:
    "The ultimate ecosystem for founders. We provide the capital, mentorship, and global network required to scale your startup from concept to exit.",
  heroTitleLines: ["Turn Your Vision into a", "Market-Leading Enterprise"],
  heroDescription:
    "The ultimate ecosystem for founders. We provide the capital, mentorship, and global network required to scale your startup from concept to exit.",
  primaryAction: { label: "Start Your Journey", href: "/contact" },
  secondaryAction: { label: "View Portfolio", href: "/about" },
  roadmapTitle: "The Incubation Roadmap",
  roadmapSubtitle: "A structured transition from idea to global scale.",
  steps: [
    {
      number: 1,
      title: "Ideation & Validation",
      description: "Testing your core assumptions in the real market.",
    },
    {
      number: 2,
      title: "Product Development",
      description: "Building MVPs with expert technical mentorship.",
    },
    {
      number: 3,
      title: "Market Scaling",
      description: "Venture capital access and global expansion strategies.",
    },
  ],
  roadmapItems: [
    {
      title: "Idea Validation",
      description:
        "When your ideas seem crazy, analyze market gaps, and write your unique value proposition with clarity.",
      points: ["Market Research Support", "SWOT Feasibility Audit"],
      image: "/home/headquarters.png",
    },
    {
      title: "MVP Development",
      description:
        "Build the first viable product in under 90 days with low-cost development and user-centric features.",
      points: ["UI/UX Prototyping", "Packaging Resources"],
      image: "/home/hero-bg.jpg",
    },
    {
      title: "Market Growth",
      description:
        "Go-to-market strategies that actually work. We connect you with first customers and help refine product-market fit.",
      points: ["Sales Mentorship Programs", "Capital & Partner Network"],
      image: "/home/headquarters.png",
    },
  ],
  portfolioTitle: "Portfolio Highlights",
  portfolioDescription:
    "See how we've helped disruptive startups navigate the complexities of international business growth.",
  portfolioAction: { label: "View all stories ->", href: "/about" },
  portfolioCards: [
    {
      category: "FINTECH",
      title: "NexGen Payments",
      description:
        "Scaled from a local gateway to a cross-border payment powerhouse within 18 months.",
      metrics: [
        { value: "300%", label: "Growth" },
        { value: "$12M", label: "Series A" },
      ],
      image: "/home/hero-bg.jpg",
    },
    {
      category: "SUSTAINABILITY",
      title: "GreenTrace AI",
      description:
        "Using AI to optimize supply chains and reduce carbon footprints in agriculture.",
      metrics: [
        { value: "50+", label: "Partners" },
        { value: "2.4k", label: "Tons CO2 Saved" },
      ],
      image: "/home/headquarters.png",
    },
  ],
  image: "/home/incubation.jpg",
  stat: {
    value: "50+",
    label: "Startups Accelerated",
  },
};

const homeIncubationHighlightData = {
  title: "From Idea to Global Scale",
  description:
    "Our Incubation Centre provides more than just desk space. We offer a structured ecosystem designed to accelerate high-growth potential startups.",
  steps: [
    {
      number: 1,
      title: "Ideation & Validation",
      description: "Testing your core assumptions in the real market.",
    },
    {
      number: 2,
      title: "Product Development",
      description: "Building MVPs with expert technical mentorship.",
    },
    {
      number: 3,
      title: "Market Scaling",
      description: "Venture capital access and global expansion strategies.",
    },
  ],
  image: "/home/incubation.jpg",
  stat: {
    value: "50+",
    label: "Startups Accelerated",
  },
};

const whyChooseData = {
  title: "",
  subheading: "",
  items: [
    {
      icon: "ShieldCheck",
      title: "END-TO-END SECURITY",
      description:
        "We don't just 'treat' security; we build it into the DNA of every solution. From physical server security to encrypted application layers, your data remains impenetrable.",
      tags: ["ENCRYPTION", "ZERO TRUST", "SOVEREIGN CONTROL"],
    },
    {
      icon: "Sparkles",
      title: "FUTURE-READY TECH",
      description:
        "Anticipating the next decade of digital evolution. Our stacks are built for modularity, ensuring you can integrate AI, Blockchain, and Quantum protocols seamlessly.",
      tags: ["AI-DRIVEN", "EDGE READY", "SCALABLE MESH"],
    },
  ],
};




const clientLogosData = {
  eyebrow: "TRUSTED BY INSTITUTIONAL LEADERS",
  logos: ["GLOBAL BANK", "TECH LOGISTICS", "DUBAI URBAN", "GOV SECTOR", "CORE ENERGY"],
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

const coursesCatalogData = {
  title: "Master the Future of Business",
  description:
    "Professional training programs designed to bridge the gap between academic knowledge and industry excellence.",
  categories: ["Business Management", "Entrepreneurship", "Digital Marketing", "Data Analytics"],
  levels: ["All Levels", "Beginner", "Intermediate", "Advanced"],
  durations: ["Any Duration", "4-8 Weeks", "8-12 Weeks", "12+ Weeks"],
  courses: [
    {
      badge: "Advanced",
      title: "Executive Leadership & Strategic Management",
      description:
        "Master the complete life of modern corporate leadership and learn to drive organizational growth through strategy.",
      skills: ["Leadership", "Policy", "Conflict Resolution", "MBA"],
      weeks: "12 Weeks",
      image: "/home/headquarters.png",
    },
    {
      badge: "Intermediate",
      title: "The Startup Catalyst: From Idea to Exit",
      description:
        "A comprehensive guide for entrepreneurs to validate business models, secure funding, and scale operations.",
      skills: ["Pitching", "Venture Capital", "MVP Dev"],
      weeks: "8 Weeks",
      image: "/home/hero-bg.jpg",
    },
    {
      badge: "Professional",
      title: "Certified Business Data Analyst",
      description:
        "Bridge the gap between raw data and business insights. Learn tools like SQL, Python, and Tableau for decision-making.",
      skills: ["Data Viz", "Predictive Modeling", "BI Tools"],
      weeks: "16 Weeks",
      image: "/home/headquarters.svg",
    },
    {
      badge: "Beginner",
      title: "Global Marketing & Brand Identity",
      description:
        "Learn how to create compelling brand stories and execute multi-channel marketing campaigns across diverse markets.",
      skills: ["Branding", "Social Media", "Analytics"],
      weeks: "6 Weeks",
      image: "/home/headquarters.png",
    },
  ],
};

const researchHubData = {
  heroBadge: "ADVANCED RESEARCH DIVISION",
  heroTitleLines: ["Architecting the", "Future", "of Global Industry."],
  heroDescription:
    "One World Business School and Incubation Centre FZE operates at the intersection of academic rigor and industrial application, driving breakthroughs in autonomous systems and sustainable frameworks.",
  heroPrimaryAction: { label: "Explore Lab Journals", href: "/contact" },
  heroSecondaryAction: { label: "Submit Proposal", href: "/contact" },
  heroImage: "/home/hero-bg.jpg",
  overviewTitle: "Pushing Boundaries Through Interdisciplinary Inquiry",
  overviewDescription:
    "Our research philosophy centers on the integration of theoretical frameworks with real-world technical implementation. We provide the infrastructure for scholars and entrepreneurs to test hypotheses in simulated and physical environments.",
  overviewPoints: [
    "Global Intellectual Property Development",
    "Incubation-Integrated Research Cycles",
    "Cross-Border Academic Partnerships",
  ],
  overviewImage: "/home/headquarters.png",
  pillarsTitle: "Core Research Pillars",
  pillars: [
    {
      icon: "innovation",
      title: "AI & Robotics",
      description:
        "Developing autonomous algorithms and kinetic hardware interfaces for industrial optimization and logistics.",
      project: "ONGOING PROJECT: PROJECT SENTINEL",
    },
    {
      icon: "vision",
      title: "AR/VR Simulation",
      description:
        "Immersive environments for complex business strategy visualization and high-risk technical training.",
      project: "ONGOING PROJECT: META-CAMPUS 2.0",
    },
    {
      icon: "compliance",
      title: "Environmental Studies",
      description:
        "Carbon sequestration models and sustainable supply chain ethics in the evolving global landscape.",
      project: "ONGOING PROJECT: ECO-SUPPLY GRAPH",
    },
  ],
  metrics: [
    { value: "124+", label: "WHITE PAPERS" },
    { value: "42", label: "PATENTS FILED" },
    { value: "15", label: "GLOBAL LABS" },
    { value: "$12M", label: "GRANT FUNDING" },
  ],
  simulationTitle: "Real-Time Impact Simulation",
  simulationDescription:
    "We leverage proprietary data models to predict the economic impact of emerging technologies. Our current research focus is on the acceleration of robotic automation in mid-market manufacturing sectors.",
  accuracyLabel: "MODEL ACCURACY",
  accuracyValue: "98.2%",
  velocityLabel: "DEPLOYMENT VELOCITY",
  velocityValue: "74.5%",
  simulationImage: "/home/hero-bg.jpg",
};

const ctaData = {
  title: "SYSTEM DEPLOYMENT STARTS HERE",
  description:
    "Secure your digital future with the UAE's premier technical architectural firm.",
  action: { label: "BOOK CONSULTATION", href: "/contact" },
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

const homeSections = [
  section("hero", 0, heroData),
  section("intro", 1, introData),
  section("globalStandards", 2, globalStandardsData),
];

const aboutSections = [
  section("aboutHero", 0, aboutHeroData),
  section("aboutMission", 1, aboutMissionData),
  section("aboutLeadership", 2, aboutLeadershipData),
  section("aboutRegulatory", 3, aboutRegulatoryData),
  section("aboutCTA", 4, aboutCtaData),
];

const servicesPageSections = [section("servicesLicensing", 0, servicesLicensingData)];

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
    name: "Full Name",
    email: "Institutional Email",
    subject: "Subject of Inquiry",
    message: "Brief Summary of Project/Inquiry",
  },
  successMessage:
    "Thank you — our institutional relations team will be in touch shortly.",
  errorMessage: "Something went wrong. Please try again.",
};

const projectsPageSections = [
  section("projectsHero", 0, projectsHeroData),
  section("projectsGrid", 1, projectsGridData),
  section("projectsIntegrity", 2, projectsIntegrityData),
  section("projectsPartners", 3, projectsPartnersData),
];

const coursesPageSections = [section("coursesCatalog", 0, coursesCatalogData)];
const incubationPageSections = [section("incubation", 0, incubationData)];
const researchPageSections = [section("researchHub", 0, researchHubData)];

const contactPageSections = [
  section("contactInquiry", 0, contactInquiryData),
];

async function main() {
  if (!uri) {
    throw new Error("Missing MONGODB_URI");
  }
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "AdminChangeMe!", 12);
  await User.findOneAndUpdate(
    { email: "admin@owtc-fze.com" },
    { $set: { email: "admin@owtc-fze.com", passwordHash } },
    { upsert: true },
  );
  console.log("Admin user: admin@owtc-fze.com /", process.env.ADMIN_PASSWORD ?? "AdminChangeMe!");

  await SiteGlobal.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        key: "default",
        headerBrand: "CRYPTONEXIS LIMITED",
        navItems,
        footerColumns,
        footerMeta: {
          ...footerMeta,
          ctaLabel: "REQUEST CREDENTIALS",
          ctaHref: "/contact",
        },
        logoSrc: "/home/logo.png",
        featureFlags: { clientLogos: true },
        applyNowModal: defaultApplyNowModal,
        seoDefaults: {
          defaultTitle: "CRYPTONEXIS LIMITED",
          defaultDescription:
            "Cryptonexis Limited — RAK Economic Zone licensed NFT creator and issuer for institutional digital asset creation, issuance, and compliance-first advisory.",
        },
      },
    },
    { upsert: true },
  );
  console.log("SiteGlobal seeded");

const pages = [
    {
      slug: "home",
      title: "Home",
      sections: homeSections,
      seoTitle: "CRYPTONEXIS LIMITED | Licensed NFT Creator and Issuer",
      seoDescription:
        "Cryptonexis Limited — RAK Economic Zone licensed NFT creation and issuance for institutional digital assets in the UAE.",
    },
    {
      slug: "about",
      title: "About Us",
      sections: aboutSections,
      seoTitle: "About Us",
      seoDescription:
        "Learn about Cryptonexis Limited — institutional integrity, executive leadership, and regulated digital asset issuance in the UAE.",
    },
    {
      slug: "services",
      title: "Services",
      sections: servicesPageSections,
      seoTitle: "Services",
      seoDescription:
        "Institutional NFT creation and issuance services, licensing authority, and regulated digital asset infrastructure from Cryptonexis Limited.",
    },
    {
      slug: "projects",
      title: "Projects",
      sections: projectsPageSections,
      seoTitle: "Projects",
      seoDescription:
        "Institutional digital asset and NFT infrastructure portfolio — tokenization and distributed ledger deployments across the MENA region.",
    },
    {
      slug: "contact",
      title: "Contact",
      sections: contactPageSections,
      seoTitle: "Contact",
      seoDescription:
        "Contact Cryptonexis Limited for institutional digital asset inquiries, RAK Economic Zone headquarters, and partnership channels.",
    },
  ];

  await Page.deleteMany({
    slug: { $nin: ["home", "about", "services", "projects", "contact"] },
  });
  console.log("Removed non-core pages from DB");

  for (const p of pages) {
    const published = structuredClone(p.sections);
    await Page.findOneAndUpdate(
      { slug: p.slug },
      {
        $set: {
          slug: p.slug,
          title: p.title,
          status: "published",
          sections: p.sections,
          publishedSections: published,
          publishedAt: new Date(),
          seoTitle: p.seoTitle,
          seoDescription: p.seoDescription,
        },
      },
      { upsert: true },
    );
    console.log("Page seeded:", p.slug);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



