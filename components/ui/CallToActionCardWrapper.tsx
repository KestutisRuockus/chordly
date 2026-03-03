import { ReactNode } from "react";
import Section from "../layout/Section";

type Props = {
  children: ReactNode;
};

const CallToActionCardWrapper = ({ children }: Props) => {
  return (
    <Section className="w-full justify-center items-center flex flex-col sm:flex-row gap-4 sm:gap-8">
      {children}
    </Section>
  );
};

export default CallToActionCardWrapper;
