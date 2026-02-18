import { LucideIcon } from "lucide-react";

export type HeroContent = {
  headline: string;
  subHeadline: string;
  buttonCta?: {
    headline?: string;
    buttonLabel: string;
    href: string;
  };
};

export type FeatureWithIconContent = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type CallToActionCardType = {
  headline?: string;
  buttonLabel: string;
  href: string;
  headingLevel?: "h2" | "h3" | "h4";
};

export type HeaderContent = {
  title: string;
  description: string;
};

export type InstrumentGroup = {
  instrumentType: string;
  instruments: string[];
};

export type InstrumentsFiltersContent = {
  sectionLabel: string;
  items: InstrumentGroup[];
};

export type BenefitsContent = {
  sectionLabel: string;
  items: {
    title: string;
    description: string;
  }[];
};

export type FeaturesPreviewContent = {
  sectionLabel: string;
  items: string[];
};

export type AccordionContent = {
  header: string;
  body: string;
  icons?: string;
};
