import HeroSection from "@/components/sections/HeroSection";
import { homeContent } from "../content/home";
import FeaturesWithIconsSection from "@/components/sections/FeaturesWithIconsSection";
import CallToActionCard from "@/components/ui/CallToActionCard";
import Section from "@/components/layout/Section";
import Main from "@/components/layout/Main";

export default function Home() {
  return (
    <Main>
      <HeroSection {...homeContent.hero} />
      <Section>
        <h2 className="text-xl font-bold">
          {homeContent.howItWorks.sectionLabel}
        </h2>
        <p className="text-md">{homeContent.howItWorks.title}</p>
        <div className="flex flex-col gap-4 my-4 border-b pb-4">
          <h3 className="font-medium italic">
            {homeContent.howItWorks.studentFlow.label}
          </h3>
          {homeContent.howItWorks.studentFlow.items.map((item, index) => (
            <div key={`${homeContent.howItWorks.studentFlow.label}-${index}`}>
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 my-4">
          <h3 className="font-medium italic">
            {homeContent.howItWorks.teacherFlow.label}
          </h3>
          {homeContent.howItWorks.teacherFlow.items.map((item, index) => (
            <div key={`${homeContent.howItWorks.teacherFlow.label}-${index}`}>
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>
      <FeaturesWithIconsSection features={homeContent.features} />
      <Section className="flex justify-center gap-4">
        <CallToActionCard {...homeContent.forStudentsCta} headingLevel="h2" />
        <CallToActionCard {...homeContent.forTeachersCta} headingLevel="h3" />
      </Section>
      <Section>
        <h2 className="font-bold">{homeContent.testimonials.sectionLabel}</h2>
        <div className="flex gap-4">
          {homeContent.testimonials.items.map((item) => (
            <div
              key={item.name}
              className="border p-2 flex flex-col justify-center gap-2"
            >
              <div className="flex gap-2">
                <p>{item.name}</p>
                <p>
                  Rating: <span>{item.rating}</span>
                </p>
              </div>
              <p>{item.quote}</p>
            </div>
          ))}
        </div>
      </Section>
    </Main>
  );
}
