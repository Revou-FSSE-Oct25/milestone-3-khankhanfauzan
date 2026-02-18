"use client";

import HomeCarousel from "@/components/HomeCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import { Button } from "@/components/ui/button";
import { fetchCategories, fetchProducts } from "@/services/api";
import { Category, Product } from "@/types/product";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));

        fetchCategories()
            .then(setCategories)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
            {error && (
                <div className="w-full px-8 mb-4 text-red-500">
                    Error: {error}
                </div>
            )}
            <div className="w-full">
                <div className="flex flex-row justify-between mb-2 w-full px-8">
                    <h1 className="text-2xl font-semibold ">New Arrival</h1>
                    <Link href="/products">
                        <Button variant="ghost">See All</Button>
                    </Link>
                </div>

                <div className="w-full px-8">
                    <HomeCarousel products={products} />
                </div>
            </div>
            <div className="mt-8 w-full">
                <div className="flex flex-row justify-between mb-2 w-full px-8">
                    <h1 className="text-2xl font-semibold ">Categories</h1>
                </div>

                <div className="w-full px-8">
                    <CategoryCarousel categories={categories} />
                </div>
            </div>
        </div>
    );
}
