import type { ComponentType, ReactNode } from "react";
import {
  Award,
  BadgeCheck,
  Bell,
  BookOpen,
  Building2,
  CircleCheck,
  DraftingCompass,
  Eye,
  FileText,
  Forward,
  Globe,
  GraduationCap,
  Handshake,
  Heart,
  Home,
  Image,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Mic,
  Paperclip,
  Phone,
  Pointer,
  Scale,
  Search,
  Send,
  Share2,
  Shield,
  ShieldCheck,
  Smile,
  SquarePlus,
  Target,
  ThumbsUp,
  User,
  UserCircle,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Curated first — matches the Projects integrity reference row icons. */
export const PROJECTS_INTEGRITY_ICON_OPTIONS = [
  { key: "badgeCheck", label: "Licensed / badge check" },
  { key: "mapPin", label: "Location / map pin" },
  { key: "compassNav", label: "Expertise / drafting compass" },
  { key: "eyeOpen", label: "Transparency / eye" },
  { key: "shieldCheck", label: "Shield check" },
  { key: "landmark", label: "Institution" },
  { key: "scale", label: "Legal / scale" },
  { key: "handshake", label: "Partnership" },
  { key: "globe", label: "Global reach" },
  { key: "lock", label: "Security lock" },
  { key: "award", label: "Award" },
  { key: "fileText", label: "Document" },
  { key: "building", label: "Building" },
  { key: "checkCircle", label: "Check circle" },
  { key: "target", label: "Strategic target" },
  { key: "zap", label: "Innovation" },
  { key: "bookOpen", label: "Knowledge" },
  { key: "graduationCap", label: "Education" },
  { key: "heart", label: "Heart" },
  { key: "share", label: "Network" },
  { key: "mail", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "search", label: "Search" },
  { key: "user", label: "Profile" },
  { key: "shield", label: "Shield" },
] as const;

export const PROJECTS_INTEGRITY_DEFAULT_ITEMS = [
  { icon: "badgeCheck", title: "Licensed and compliant", description: "" },
  { icon: "mapPin", title: "Strategic UAE location", description: "" },
  { icon: "compassNav", title: "Focused expertise", description: "" },
  { icon: "eyeOpen", title: "Transparent operations", description: "" },
] as const;

export type ProjectsIntegrityIconKey = (typeof PROJECTS_INTEGRITY_ICON_OPTIONS)[number]["key"];

const LABEL_BY_KEY = Object.fromEntries(
  PROJECTS_INTEGRITY_ICON_OPTIONS.map((option) => [option.key, option.label]),
) as Record<string, string>;

/** Legacy CMS keys and aliases → Lucide icon keys. */
const ICON_ALIASES: Record<string, string> = {
  verified: "badgeCheck",
  location: "mapPin",
  compass: "compassNav",
  eye: "eyeOpen",
  badgeCheck: "badgeCheck",
  mapPin: "mapPin",
  compassNav: "compassNav",
  eyeOpen: "eyeOpen",
};

const LUCIDE_BY_KEY: Record<string, LucideIcon> = {
  badgeCheck: BadgeCheck,
  mapPin: MapPin,
  compassNav: DraftingCompass,
  eyeOpen: Eye,
  heart: Heart,
  image: Image,
  smile: Smile,
  share: Share2,
  forward: Forward,
  bell: Bell,
  phone: Phone,
  thumbsUp: ThumbsUp,
  send: Send,
  message: MessageCircle,
  plusSquare: SquarePlus,
  home: Home,
  userCircle: UserCircle,
  megaphone: Megaphone,
  globe: Globe,
  paperclip: Paperclip,
  pointer: Pointer,
  search: Search,
  mail: Mail,
  mic: Mic,
  video: Video,
  user: User,
  shield: Shield,
  shieldCheck: ShieldCheck,
  lock: Lock,
  award: Award,
  fileText: FileText,
  building: Building2,
  handshake: Handshake,
  scale: Scale,
  landmark: Landmark,
  checkCircle: CircleCheck,
  target: Target,
  zap: Zap,
  bookOpen: BookOpen,
  graduationCap: GraduationCap,
};

export function projectsIntegrityIconLabel(key: string): string {
  const resolved = ICON_ALIASES[key] ?? key;
  return LABEL_BY_KEY[resolved] ?? LABEL_BY_KEY[key] ?? key;
}

function resolveIconKey(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "badgeCheck";
  return ICON_ALIASES[trimmed] ?? trimmed;
}

type IconSvgProps = {
  className?: string;
  size?: number;
};

function IntegrityIconSvg({ className, size = 22, children }: IconSvgProps & { children: ReactNode }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

/** Reference row icons — filled badge/pin, outline compass, eye with filled pupil. */
function BadgeCheckFilled({ className, size }: IconSvgProps) {
  return (
    <IntegrityIconSvg className={className} size={size}>
      <path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        fill="currentColor"
      />
      <path
        d="m9 12 2 2 4-4"
        fill="none"
        className="cx-projects-integrity__icon-knockout"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IntegrityIconSvg>
  );
}

function MapPinFilled({ className, size }: IconSvgProps) {
  return (
    <IntegrityIconSvg className={className} size={size}>
      <path
        d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
        fill="currentColor"
      />
      <circle cx="12" cy="10" r="2.5" className="cx-projects-integrity__icon-knockout-fill" />
    </IntegrityIconSvg>
  );
}

function DraftingCompassOutline({ className, size }: IconSvgProps) {
  return (
    <IntegrityIconSvg className={className} size={size}>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12.99 6.74 1.93 3.44" />
        <path d="M19.136 12a10 10 0 0 1-14.271 0" />
        <path d="m21 21-2.16-3.84" />
        <path d="m3 21 8.02-14.26" />
        <circle cx="12" cy="5" r="2" />
      </g>
    </IntegrityIconSvg>
  );
}

function EyeFilled({ className, size }: IconSvgProps) {
  return (
    <IntegrityIconSvg className={className} size={size}>
      <path
        d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </IntegrityIconSvg>
  );
}

const REFERENCE_FILLED_ICONS: Record<string, ComponentType<IconSvgProps>> = {
  badgeCheck: BadgeCheckFilled,
  mapPin: MapPinFilled,
  compassNav: DraftingCompassOutline,
  eyeOpen: EyeFilled,
};

type Props = {
  name: string;
  className?: string;
  size?: number;
};

export default function ProjectsIntegrityIcon({
  name,
  className,
  size = 22,
}: Props) {
  const svgClass = className ?? "cx-projects-integrity__icon-svg";
  const resolvedKey = resolveIconKey(name);
  const ReferenceIcon = REFERENCE_FILLED_ICONS[resolvedKey];

  if (ReferenceIcon) {
    return <ReferenceIcon className={svgClass} size={size} />;
  }

  const Lucide = LUCIDE_BY_KEY[resolvedKey] ?? BadgeCheck;

  return (
    <Lucide className={svgClass} size={size} strokeWidth={1.75} aria-hidden />
  );
}
