import CategoryCard from "@/components/product/CategoryCard";
import { fetchCategories } from "@/services/api";

async function page() {
    const categories = await fetchCategories();
    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default page;
