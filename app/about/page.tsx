import Main from "@/components/layout/Main";
import HeaderSection from "@/components/sections/HeaderSection";
import { aboutContent } from "../content/about";
import Section from "@/components/layout/Section";
import CallToActionCard from "@/components/ui/CallToActionCard";

const AboutPage = () => {
  return (
    <Main>
      <HeaderSection {...aboutContent.header} />
      <Section>
        <h2 className="font-bold">{aboutContent.mission.sectionLabel}</h2>
        <h3 className="font-medium">{aboutContent.mission.title}</h3>
        <p>{aboutContent.mission.description}</p>
      </Section>
      <Section>
        <h2 className="font-bold">{aboutContent.story.sectionLabel}</h2>
        <h3 className="font-medium">{aboutContent.story.title}</h3>
        <p>{aboutContent.story.description}</p>
      </Section>
      <Section>
        <h2 className="font-bold">{aboutContent.whatWeOffer.sectionLabel}</h2>
        <ul>
          {aboutContent.whatWeOffer.items.map((item) => (
            <li key={item.title}>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <h2 className="font-bold">{aboutContent.vision.sectionLabel}</h2>
        <p className="font-medium">{aboutContent.vision.description}</p>
        <ul className="my-4">
          {aboutContent.vision.items.map((item) => (
            <li key={item.title}>
              <h3 className="font-medium flex items-center">
                <span className="text-xs mr-2">{item.icon}</span>
                {item.title}
              </h3>
              <p className="text-sm">{item.description}</p>
            </li>
          ))}
        </ul>
      </Section>
      <CallToActionCard {...aboutContent.buttonCta} />
    </Main>
  );
};

export default AboutPage;
