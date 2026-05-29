import type { PageSection } from "@/types/section";
import HeroSection from "./home/HeroSection";
import IntroSection from "./home/IntroSection";
import ServicesSection from "./services/ServicesSection";
import ServicesGridSection from "./services/ServicesGridSection";
import ServicesAccordionSection from "./services/ServicesAccordionSection";
import WhyChooseSection from "./home/WhyChooseSection";
import ClientLogosSection from "./home/ClientLogosSection";
import CtaSection from "./home/CtaSection";
import GlobalStandardsSection from "./home/Globalstandardsection";
import ContactBlockSection from "./contact/ContactBlockSection";
import AboutHeroSection from "./about/AboutHeroSection";
import AboutMissionSection from "./about/AboutMissionSection";
import AboutLeadershipSection from "./about/AboutLeadershipSection";
import AboutRegulatorySection from "./about/AboutRegulatorySection";
import AboutVisionMissionSection from "./about/AboutVisionMissionSection";
import AboutAdvantageSection from "./about/AboutAdvantageSection";
import AboutValuesSection from "./about/AboutValuesSection";
import ContactInquirySection from "./contact/ContactInquirySection";
import AboutOverviewSection from "./about/AboutOverviewSection";
import AboutFrameworkSection from "./about/AboutFrameworkSection";
import AboutCta from "./about/AboutCta";
import ServicesSectionCta from "./services/ServicesSectionCta";
import ServicesHeroSection from "./services/ServicesHeroSection";
import ServicesLicensingSection from "./services/ServicesLicensingSection";
import ProjectsHeroSection from "./projects/ProjectsHeroSection";
import ProjectsGridSection from "./projects/ProjectsGridSection";
import ProjectsIntegritySection from "./projects/ProjectsIntegritySection";
import ProjectsPartnersSection from "./projects/ProjectsPartnersSection";

export default function SectionRenderer({
  pageSlug,
  section,
  featureFlags,
}: {
  pageSlug: string;
  section: PageSection;
  featureFlags?: Record<string, boolean>;
}) {
  const normalizedType =
    (section.type as string) === "industrieshero"
      ? "industriesHero"
      : (section.type as string) === "industriesgrid"
        ? "industriesGrid"
        : (section.type as string) === "industriescta"
          ? "industriesCta"
            : (section.type as string) === "servicesgrid"
              ? "servicesGrid"
              : (section.type as string) === "servicesaccordion"
                ? "servicesAccordion"
              : (section.type as string) === "servicescta"
                ? "servicesCTA"
                : (section.type as string) === "serviceslicensing"
                  ? "servicesLicensing"
                  : (section.type as string) === "projectshero"
                    ? "projectsHero"
                    : (section.type as string) === "projectsgrid"
                      ? "projectsGrid"
                      : (section.type as string) === "projectsintegrity"
                        ? "projectsIntegrity"
                        : (section.type as string) === "projectspartners"
                          ? "projectsPartners"
                          : (section.type as string) === "aboutoverview"
                  ? "aboutOverview"
            : section.type;

  if (normalizedType === "clientLogos" && featureFlags?.clientLogos === false) {
    return null;
  }

  switch (normalizedType) {
    case "hero":
      return (
        <HeroSection
          content={section.data as never}
          pageSlug={pageSlug}
          anchorId={pageSlug === "home" ? "home" : undefined}
        />
      );
    case "intro":
      return (
        <IntroSection
          content={section.data as never}
          anchorId={pageSlug === "home" ? "services" : undefined}
        />
      );
    case "services":
      return <ServicesSection content={section.data as never} />;

    case "globalStandards":
      return <GlobalStandardsSection content={section.data as never} />;

    case "whyChoose":
      return <WhyChooseSection content={section.data as never} />;
    case "clientLogos":
      return <ClientLogosSection content={section.data as never} />;
    case "cta":
      if (pageSlug === "about") {
        return <AboutCta content={section.data as never} />;
      }
      return (
        <CtaSection
          content={section.data as never}
          anchorId={pageSlug === "contact" ? undefined : "contact"}
        />
      );
    case "contact":
      return <ContactBlockSection content={section.data as never} />;
    case "contactHero":
      return null;
    case "contactInquiry":
      return <ContactInquirySection content={section.data as never} />;
    case "servicesHero":
      return <ServicesHeroSection content={section.data as never} />;
    case "servicesAccordion":
      return <ServicesAccordionSection content={section.data as never} />;
    case "servicesGrid":
      return <ServicesGridSection content={section.data as never} />;
    case "servicesCTA":
      return <ServicesSectionCta content={section.data as never}/>;
    case "servicesLicensing":
      return <ServicesLicensingSection content={section.data as never} />;
    case "aboutHero":
      return <AboutHeroSection content={section.data as never} />;
    case "aboutMission":
      return <AboutMissionSection content={section.data as never} />;
    case "aboutLeadership":
      return <AboutLeadershipSection content={section.data as never} />;
    case "aboutRegulatory":
      return <AboutRegulatorySection content={section.data as never} />;
    case "aboutOverview":
      return <AboutOverviewSection content={section.data as never} />;
    case "aboutIntro":
      return <AboutOverviewSection content={section.data as never} />;
    case "aboutVisionMission":
      return <AboutMissionSection content={section.data as never} />;
    case "aboutFramework":
      return <AboutFrameworkSection content={section.data as never} />;
    case "aboutAdvantage":
      return <AboutAdvantageSection content={section.data as never} />;
    case "aboutValues":
      return <AboutRegulatorySection content={section.data as never} />;
    case "aboutCTA":
      return <AboutCta content={section.data as never} />;
    case "projectsHero":
      return <ProjectsHeroSection content={section.data as never} />;
    case "projectsGrid":
      return <ProjectsGridSection content={section.data as never} />;
    case "projectsIntegrity":
      return <ProjectsIntegritySection content={section.data as never} />;
    case "projectsPartners":
      return <ProjectsPartnersSection content={section.data as never} />;
    default:
      return null;
  }
}
