import React, { useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { promotionalBanners, type PromotionalContent } from '@/data/promotions';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

export const PromotionalBanner: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api || isHovered) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isHovered]);

  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages((prev) => new Set(prev).add(src));
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="w-full mb-8">
      <div
        className="relative max-w-7xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {promotionalBanners.map((banner) => (
              <CarouselItem key={banner.id}>
                <BannerSlide
                  banner={banner}
                  isLoaded={loadedImages.has(banner.src)}
                  onLoad={() => handleImageLoad(banner.src)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
          <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
        </Carousel>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {promotionalBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-primary/50 hover:bg-primary/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface BannerSlideProps {
  banner: PromotionalContent;
  isLoaded: boolean;
  onLoad: () => void;
}

const BannerSlide: React.FC<BannerSlideProps> = ({ banner, isLoaded, onLoad }) => {
  const handleClick = () => {
    if (banner.ctaLink) {
      if (banner.ctaLink.startsWith('#')) {
        document.querySelector(banner.ctaLink)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = banner.ctaLink;
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="aspect-[4/3] sm:aspect-[16/6] md:aspect-[16/5]">
        {!isLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        {banner.type === 'image' ? (
          <img
            src={banner.src}
            alt={banner.alt}
            onLoad={onLoad}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <video
            src={banner.src}
            poster={banner.posterImage}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={onLoad}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Overlay with content */}
        {(banner.title || banner.description || banner.ctaText) && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div className="max-w-2xl">
                {banner.title && (
                  <h2 className="font-impact text-4xl md:text-6xl text-white mb-4 animate-fade-in">
                    {banner.title}
                  </h2>
                )}
                {banner.description && (
                  <p className="text-lg md:text-xl text-white/90 mb-6 animate-fade-in">
                    {banner.description}
                  </p>
                )}
                {banner.ctaText && (
                  <Button
                    onClick={handleClick}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold animate-fade-in"
                  >
                    {banner.ctaText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
