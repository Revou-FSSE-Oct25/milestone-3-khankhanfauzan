import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";

interface HomeTodaysProductGridProps {
    products: Product[];
}

function HomeTodaysProductGrid({ products }: HomeTodaysProductGridProps) {
    return (
        <div className="w-full bg-muted">
            <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 ">
                <h3 className="text-3xl font-semibold">Todays For You!</h3>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeTodaysProductGrid;
