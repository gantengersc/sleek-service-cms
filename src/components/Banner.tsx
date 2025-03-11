
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BannerImage {
  id: string;
  imageUrl: string;
  title: string;
}

// Mock data - in a real app, this would come from the admin dashboard
const bannerImages: BannerImage[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    title: 'Professional Services'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    title: 'Mobile Development'
  }
];

const Banner = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full mb-8"
    >
      <CarouselContent>
        {bannerImages.map((image) => (
          <CarouselItem key={image.id}>
            <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default Banner;
