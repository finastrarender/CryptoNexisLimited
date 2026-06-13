import SimpleIcon, { SIMPLE_ICON_OPTIONS } from "@/components/sections/SimpleIcon";

export const SERVICES_LICENSING_ICON_OPTIONS = [
  { key: "blocks", label: "Blocks" },
  { key: "shield-check", label: "Shield check" },
  ...SIMPLE_ICON_OPTIONS,
] as const;

export type ServicesLicensingIconName = (typeof SERVICES_LICENSING_ICON_OPTIONS)[number]["key"];

export function servicesLicensingIconLabel(key: string): string {
  return (
    SERVICES_LICENSING_ICON_OPTIONS.find((option) => option.key === key)?.label ?? key
  );
}

function BlocksIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="8" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14" y="4" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10" y="14" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10 11.5H14M17.5 11v3M13.5 17.5H14"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5 5.5 5.2v5.8c0 4.6 2.8 8.2 6.5 9.8 3.7-1.6 6.5-5.2 6.5-9.8V5.2L12 2.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12.2 10.8 14.5 15.5 9.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesLicensingIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  if (name === "shield-check") {
    return <ShieldCheckIcon className={className} />;
  }
  if (name === "blocks") {
    return <BlocksIcon className={className} />;
  }
  return <SimpleIcon name={name || "nodes"} className={className} />;
}
