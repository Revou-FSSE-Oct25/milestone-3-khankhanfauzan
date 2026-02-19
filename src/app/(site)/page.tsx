import HomeHero from "@/components/marketing/home/HomeHero";
import HomeCategoryGrid from "@/components/marketing/home/HomeCategoryGrid";
import { fetchCategories } from "@/services/api";

export default async function Home() {
    const categories = await fetchCategories();

    return (
        <div>
            <HomeHero />
            <HomeCategoryGrid categories={categories} />
        </div>
    );
}
