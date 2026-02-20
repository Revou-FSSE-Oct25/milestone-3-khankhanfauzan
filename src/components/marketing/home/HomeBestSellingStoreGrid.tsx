import SafeImage from "@/components/common/SafeImage";
import { homeBestSellingStore } from "@/data/home-best-selling-store";
import { Product } from "@/types/product";
import { CrownIcon } from "lucide-react";
import Link from "next/link";

interface HomeBestSellingStoreGridProps {
    products: Product[];
}

function HomeBestSellingStoreGrid({ products }: HomeBestSellingStoreGridProps) {
    const bestSellingStores = homeBestSellingStore.map((store, index) => ({
        ...store,
        products: products.slice(index * 3, index * 3 + 3),
    }));

    return (
        <section
            className="w-full bg-muted"
            aria-labelledby="best-selling-store-heading"
        >
            <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
                <header className="text-center">
                    <h2
                        id="best-selling-store-heading"
                        className="text-3xl font-semibold"
                    >
                        Best Selling Store
                    </h2>
                </header>
                <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                    <figure className="w-full border rounded-xl overflow-hidden relative sm:w-1/2 lg:w-1/3">
                        <SafeImage
                            src="/images/marketing/homepage/store/homepage-best-selling-store.webp"
                            alt="Customer visiting Zan Store, our top performing shop"
                            className="h-full w-full object-cover opacity-50"
                        />
                        <figcaption className="absolute bottom-0 flex flex-col gap-4 px-4 py-4 lg:px-20 lg:py-12">
                            <p className="text-xl font-bold lg:text-4xl">
                                Zan Store
                            </p>
                            <p className="text-xs font-semibold lg:text-base">
                                Shop, Explore, Delight and Experience Store
                                Magic!
                            </p>
                        </figcaption>
                    </figure>
                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {bestSellingStores.map((store) => (
                                <article
                                    key={store.id}
                                    className="flex flex-col rounded-xl border bg-muted p-4 shadow-xl"
                                    aria-label={store.storeName}
                                >
                                    <header className="flex items-center gap-4">
                                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border bg-border p-6">
                                            <p className="text-xl font-bold">
                                                {store.storeName
                                                    .split(" ")
                                                    .map((word) => word[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </p>
                                            <div className="absolute -bottom-1 -right-1 rounded-full border bg-muted p-2">
                                                <CrownIcon size={16} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <h3 className="font-semibold">
                                                {store.storeName}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {store.tagline}
                                            </p>
                                        </div>
                                    </header>
                                    <ul
                                        className="mt-4 grid grid-cols-3 gap-4"
                                        aria-label={`${store.storeName} top products`}
                                    >
                                        {store.products.map((product) => (
                                            <li
                                                key={product.id}
                                                className="aspect-square"
                                            >
                                                <Link
                                                    href={`/products/${product.id}`}
                                                    className="block h-full"
                                                >
                                                    <div className="aspect-square mb-2 overflow-hidden rounded-xl border">
                                                        <SafeImage
                                                            src={
                                                                product
                                                                    .images[0]
                                                            }
                                                            alt={product.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBestSellingStoreGrid;
