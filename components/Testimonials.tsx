import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { homeContent } from "@/content/home";
import SectionTitle from "./sections/SectionTitle";
import RatingStars from "./ui/RatingStars";

const Testimonials = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-4/5 lg:w-11/12 mx-auto"
    >
      <SectionTitle title={homeContent.testimonials.sectionLabel} />
      <CarouselContent className="mt-4">
        {homeContent.testimonials.items.map((item) => (
          <CarouselItem
            key={item.name}
            className="flex basis-full md:basis-1/2 xl:basis-1/3"
          >
            <Card className="max-w-96 mx-auto w-full h-full flex">
              <CardContent className="flex flex-col justify-between flex-1">
                <p className="text-foreground text-sm">{item.quote}</p>
                <div className="flex flex-col justify-center items-center text-muted-foreground text-sm mt-2">
                  <p>{item.name}</p>
                  <RatingStars value={item.rating} />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Testimonials;
