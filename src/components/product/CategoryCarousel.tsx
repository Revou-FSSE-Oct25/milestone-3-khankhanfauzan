"use client";

import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Category } from "@/types/product";
import CategoryCard from "@/components/product/CategoryCard";

export default function CategoryCarousel({
    categories,
}: {
    categories: Category[];
}) {
    const plugin = Autoplay({ delay: 3000 });

    return (
        <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[plugin]}
            className="w-full"
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {categories.map((category) => (
                    <CarouselItem
                        key={category.id}
                        className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                        <CategoryCard category={category} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel>
    );
}

