import Main from "@/components/layout/Main";
import { aboutContent } from "../../content/about";
import Section from "@/components/layout/Section";
import CallToActionCard from "@/components/ui/CallToActionCard";
import { auth } from "@clerk/nextjs/server";
import HeroSection from "@/components/sections/HeroSection";
import Heading from "@/components/ui/Heading";
import SubHeading from "@/components/ui/SubHeading";
import CallToActionCardWrapper from "@/components/ui/CallToActionCardWrapper";

const AboutPage = async () => {
  const { userId } = await auth();
  return (
    <Main>
      <HeroSection {...aboutContent.header} />
      <Section>
        <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-8">
          <article className="w-full sm:w-4/5 xl:w-1/2 bg-card rounded-md p-6">
            <Heading heading={aboutContent.mission.sectionLabel} />
            <SubHeading subHeading={aboutContent.mission.title} />
            <p className="text-muted-foreground w-4/5 mx-auto mt-4">
              {aboutContent.mission.description}
            </p>
          </article>
          <article className="w-full sm:w-4/5 xl:w-1/2 bg-card rounded-md p-6">
            <Heading heading={aboutContent.story.sectionLabel} />
            <SubHeading subHeading={aboutContent.story.title} />
            <p className="text-muted-foreground w-4/5 mx-auto mt-4">
              {aboutContent.story.description}
            </p>
          </article>
        </div>
      </Section>
      <Section>
        <Heading heading={aboutContent.whatWeOffer.sectionLabel} />
        <ul className="flex flex-col gap-2 w-full sm:w-4/5 xl:w-3/5 mx-auto mt-4 bg-card p-6">
          {aboutContent.whatWeOffer.items.map((item) => (
            <li key={item.title}>
              <h3 className="font-medium text-lg text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <Heading heading={aboutContent.vision.sectionLabel} />
        <p className="w-4/5 xl:w-3/5 mx-auto mt-4">
          {aboutContent.vision.description}
        </p>
        <ul className="flex flex-wrap justify-center gap-8 w-full xl:w-3/5 mx-auto mt-4">
          {aboutContent.vision.items.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="bg-card p-4 rounded-md w-4/5 md:w-2/5"
              >
                <div className="flex gap-4 items-center">
                  <Icon size={18} />
                  <SubHeading subHeading={item.title} textCentered={false} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Section>
      {!userId && (
        <CallToActionCardWrapper>
          <CallToActionCard {...aboutContent.buttonCta} />
        </CallToActionCardWrapper>
      )}
    </Main>
  );
};

export default AboutPage;
