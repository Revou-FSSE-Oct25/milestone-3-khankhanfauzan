"use client";

import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

export default function HomeCarousel({ products }: { products: Product[] }) {
    const plugin = Autoplay({ delay: 3000 });

    return (
        <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[plugin]}
            className="w-full"
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {products.map((product) => (
                    <CarouselItem
                        key={product.id}
                        className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                        <ProductCard product={product} />
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

