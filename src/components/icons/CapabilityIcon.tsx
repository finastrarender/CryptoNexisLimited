import {
  BadgeCheck,
  Blocks,
  BookOpen,
  Box,
  Briefcase,
  Building2,
  Code2,
  DraftingCompass,
  Eye,
  FileCode,
  Gavel,
  Globe,
  Handshake,
  Hexagon,
  Landmark,
  Layers,
  LineChart,
  Lock,
  Network,
  Scale,
  Shield,
  ShieldCheck,
  Target,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const CAPABILITY_ICON_OPTIONS = [
  { key: "tokenize", label: "Asset tokenization / box" },
  { key: "compass", label: "Contract architecture / drafting compass" },
  { key: "gavel", label: "Regulatory advisory / gavel" },
  { key: "scale", label: "Legal scale" },
  { key: "shieldCheck", label: "Shield check" },
  { key: "blocks", label: "Blockchain blocks" },
  { key: "network", label: "Network" },
  { key: "fileCode", label: "Smart contracts" },
  { key: "layers", label: "Asset layers" },
  { key: "landmark", label: "Institution" },
  { key: "lock", label: "Security lock" },
  { key: "globe", label: "Global markets" },
  { key: "handshake", label: "Partnership" },
  { key: "building", label: "Building / HQ" },
  { key: "badgeCheck", label: "Verified badge" },
  { key: "lineChart", label: "Markets / chart" },
  { key: "wallet", label: "Digital wallet" },
  { key: "hexagon", label: "NFT / token" },
  { key: "code2", label: "Code / engineering" },
  { key: "bookOpen", label: "Advisory / knowledge" },
  { key: "target", label: "Strategic focus" },
  { key: "zap", label: "Innovation" },
  { key: "eye", label: "Transparency" },
  { key: "shield", label: "Shield" },
  { key: "briefcase", label: "Corporate" },
] as const;

export type CapabilityIconKey = (typeof CAPABILITY_ICON_OPTIONS)[number]["key"];

const LABEL_BY_KEY = Object.fromEntries(
  CAPABILITY_ICON_OPTIONS.map((option) => [option.key, option.label]),
) as Record<string, string>;

/** Maps stored CMS keys and legacy aliases to Lucide icon keys. */
const LEGACY_ALIASES: Record<string, string> = {
  investment: "tokenize",
  terminal: "network",
  architecture: "compass",
  compliance: "gavel",
  security: "shieldCheck",
  online: "globe",
  innovation: "code2",
  corporate: "briefcase",
  spark: "target",
  nodes: "network",
  sync: "network",
};

const LUCIDE_BY_KEY: Record<string, LucideIcon> = {
  tokenize: Box,
  compass: DraftingCompass,
  gavel: Gavel,
  scale: Scale,
  shieldCheck: ShieldCheck,
  blocks: Blocks,
  network: Network,
  fileCode: FileCode,
  layers: Layers,
  landmark: Landmark,
  lock: Lock,
  globe: Globe,
  handshake: Handshake,
  building: Building2,
  badgeCheck: BadgeCheck,
  lineChart: LineChart,
  wallet: Wallet,
  hexagon: Hexagon,
  code2: Code2,
  bookOpen: BookOpen,
  target: Target,
  zap: Zap,
  eye: Eye,
  shield: Shield,
  briefcase: Briefcase,
};

export function capabilityIconLabel(key: string): string {
  const resolved = LEGACY_ALIASES[key] ?? key;
  return LABEL_BY_KEY[resolved] ?? key;
}

type Props = {
  name: string;
  className?: string;
  size?: number;
};

export default function CapabilityIcon({ name, className, size = 26 }: Props) {
  const resolved = LEGACY_ALIASES[name] ?? name;
  const Lucide = LUCIDE_BY_KEY[resolved] ?? Box;

  return (
    <Lucide className={className} size={size} strokeWidth={1.5} aria-hidden />
  );
}
