import type { z } from "zod";
import type { servicesLicensingDataSchema } from "@/schemas/sections";
import ServicesLicensingIcon from "@/components/icons/ServicesLicensingIcon";
import SimpleIcon from "@/components/sections/SimpleIcon";

type ServicesLicensingContent = z.infer<typeof servicesLicensingDataSchema>;

const DEFAULT_EYEBROW = "INSTITUTIONAL DIGITAL ASSETS";

const DEFAULT_TITLE = ["Services &", "Licensing."];

const DEFAULT_DESCRIPTION =
  "Providing high-end architectural infrastructure for digital asset issuance within a regulated framework. Precise. Authorized. Institutional.";

const DEFAULT_CARDS = [
  {
    title: "NFT Creation",
    description:
      "Architecting bespoke smart contract environments for large-scale digital asset minting. Ensuring structural integrity across multiple chain protocols.",
    linkLabel: "PROTOCOL DETAILS →",
    linkHref: "/contact",
    icon: "blocks" as const,
  },
  {
    title: "NFT Issuance",
    description:
      "Managed deployment of verified digital stamps and high-volume asset issuance. Integrated provenance tracking for institutional-grade reliability.",
    linkLabel: "ISSUANCE FRAMEWORK →",
    linkHref: "/contact",
    icon: "shield-check" as const,
  },
];

const DEFAULT_LICENSES = [
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
];

const DEFAULT_COMPLIANCE =
  "CRYPTONEXIS LIMITED OPERATES UNDER STRICT COMPLIANCE MANDATES AS REQUIRED BY UAE RAK ECONOMIC ZONE REGULATIONS. ALL ASSET MINTING PROTOCOLS ARE AUDITED QUARTERLY FOR STRUCTURAL INTEGRITY.";

const DEFAULT_RELIABILITY_TITLE = "Institutional Reliability.";

const DEFAULT_RELIABILITY_DESCRIPTION =
  "Our infrastructure is built on the premise of architectural precision. We eliminate volatility through rigorous compliance and verified blockchain stamps.";

function ServiceCardIcon({ icon }: { icon?: string }) {
  return <ServicesLicensingIcon name={icon || "nodes"} className="sl-licensing__card-icon-svg" />;
}

export default function ServicesLicensingSection({
  content,
}: {
  content?: ServicesLicensingContent;
}) {
  const data = content ?? {};
  const eyebrow = data.eyebrow?.trim() || DEFAULT_EYEBROW;
  const titleLines = data.title && data.title.length > 0 ? data.title : DEFAULT_TITLE;
  const description = data.description?.trim() || DEFAULT_DESCRIPTION;
  const cards = data.cards && data.cards.length > 0 ? data.cards : DEFAULT_CARDS;
  const licenses = data.licenses && data.licenses.length > 0 ? data.licenses : DEFAULT_LICENSES;
  const complianceNotice = data.complianceNotice?.trim() || DEFAULT_COMPLIANCE;
  const reliabilityTitle = data.reliabilityTitle?.trim() || DEFAULT_RELIABILITY_TITLE;
  const reliabilityDescription =
    data.reliabilityDescription?.trim() || DEFAULT_RELIABILITY_DESCRIPTION;

  return (
    <section className="sl-licensing" aria-label="Services and licensing">
      <div className="sl-licensing__hero-band">
        <div className="section-shell">
          <header className="sl-licensing__hero">
            <p className="sl-licensing__eyebrow">{eyebrow}</p>
            <h1 className="sl-licensing__title">
              {titleLines.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h1>
            <p className="sl-licensing__lede">{description}</p>
          </header>
        </div>
      </div>

      <div className="sl-licensing__cards-band">
        <div className="section-shell">
          <div className="sl-licensing__cards">
            {cards.map((card) => (
              <article key={card.title} className="sl-licensing__card">
                <span className="sl-licensing__card-icon" aria-hidden="true">
                  <ServiceCardIcon icon={card.icon} />
                </span>
                <h3 className="sl-licensing__card-title">{card.title}</h3>
                <p className="sl-licensing__card-text">{card.description}</p>
                <a className="sl-licensing__card-link" href={card.linkHref || "/contact"}>
                  {card.linkLabel}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="sl-licensing__registry">
        <div className="section-shell">
          <header className="sl-licensing__registry-header">
            <h2 className="sl-licensing__registry-title">LICENSING AUTHORITY</h2>
          </header>

          <div className="sl-licensing__table-wrap">
            <table className="sl-licensing__table">
              <thead>
                <tr>
                  <th scope="col">License Number</th>
                  <th scope="col">Authority</th>
                  <th scope="col">Legal Type</th>
                  <th scope="col">Location</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((row) => (
                  <tr key={row.licenseNumber}>
                    <td className="sl-licensing__cell-license">{row.licenseNumber}</td>
                    <td>{row.authority}</td>
                    <td>{row.legalType}</td>
                    <td>{row.location}</td>
                    <td>
                      <span className="sl-licensing__badge">{row.status ?? "LICENSED"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="sl-licensing__compliance">
            <p className="sl-licensing__compliance-text">{complianceNotice}</p>
            <span className="sl-licensing__compliance-watermark" aria-hidden="true">
              <SimpleIcon name="shield" className="sl-licensing__compliance-icon" />
            </span>
          </aside>
        </div>
      </div>

      <div className="sl-licensing__reliability">
        <div className="section-shell sl-licensing__reliability-inner">
          <h2 className="sl-licensing__reliability-title">{reliabilityTitle}</h2>
          <div className="sl-licensing__reliability-divider" aria-hidden="true" />
          <p className="sl-licensing__reliability-text">{reliabilityDescription}</p>
        </div>
      </div>
    </section>
  );
}
