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
  icon: string;
  title: string;
  description: string;
};

export type CallToActionCardType = {
  headline?: string;
  buttonLabel: string;
  href: string;
  headingLevel?: "h2" | "h3" | "h4";
};
