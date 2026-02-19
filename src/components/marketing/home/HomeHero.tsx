"use client";

import SafeImage from "@/components/common/SafeImage";
import { homeCarousel } from "@/data/home-carousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

function HomeHero() {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const plugin = Autoplay({ delay: 5000 });

    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            const selected = api.selectedScrollSnap();
            setCurrentIndex(selected ?? 0);
        };

        onSelect();
        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    return (
        <section className="w-full bg-muted">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Carousel
                    opts={{
                        loop: true,
                    }}
                    setApi={setApi}
                    plugins={[plugin]}
                    className="w-full"
                >
                    <CarouselContent>
                        {homeCarousel.map((slide) => (
                            <CarouselItem key={slide.id}>
                                <div className="grid items-center gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-2 lg:px-12 lg:py-12">
                                    <div className="space-y-4 sm:space-y-6">
                                        <p className="text-sm text-muted-foreground">
                                            {slide.hashtag}
                                        </p>

                                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                            {slide.title}
                                            <br />
                                            <span className="text-primary">
                                                {slide.subtitle}
                                            </span>
                                        </h1>

                                        <p className="text-base text-muted-foreground sm:text-lg">
                                            {slide.description}
                                        </p>
                                    </div>

                                    <div className="relative w-full h-48 sm:h-60 lg:h-72">
                                        <SafeImage
                                            src={
                                                slide.mobileImage ?? slide.image
                                            }
                                            alt={slide.title}
                                            className="h-full w-full object-contain"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}

export default HomeHero;
