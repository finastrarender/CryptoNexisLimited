import type { z } from "zod";
import type { aboutLeadershipDataSchema } from "@/schemas/sections";
import { executivePortraitAlt } from "@/lib/image-alt";

type AboutLeadershipContent = z.infer<typeof aboutLeadershipDataSchema>;

export default function AboutLeadershipSection({ content }: { content: AboutLeadershipContent }) {
  const members = content.members.slice(0, 3);

  return (
    <section className="cx-about-leadership" aria-label="Executive leadership">
      <div className="section-shell">
        <div className="cx-about-leadership__header">
          <h2 className="cx-about-leadership__title">{content.title}</h2>
          <p className="cx-about-leadership__aside">{content.asideLabel}</p>
        </div>

        <div className="cx-about-leadership__divider" aria-hidden="true" />

        <div className="cx-about-leadership__panel">
          <div className="cx-about-leadership__grid">
            {members.map((member) => (
              <article key={member.name} className="cx-about-leader">
                <div className="cx-about-leader__media">
                  <img
                    className="cx-about-leader__image"
                    src={member.image}
                    alt={executivePortraitAlt(member)}
                    width={400}
                    height={400}
                    decoding="async"
                  />
                </div>
                <h3 className="cx-about-leader__name">{member.name}</h3>
                <p className="cx-about-leader__role">{member.role}</p>
                <p className="cx-about-leader__bio">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
