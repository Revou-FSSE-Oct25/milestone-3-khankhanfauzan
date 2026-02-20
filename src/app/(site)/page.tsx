import HomeHero from "@/components/marketing/home/HomeHero";
import HomeCategoryGrid from "@/components/marketing/home/HomeCategoryGrid";
import { fetchCategories, fetchProductPagination } from "@/services/api";
import HomeTodaysProductGrid from "@/components/marketing/home/HomeTodaysProductGrid";
import HomeBestSellingStoreGrid from "@/components/marketing/home/HomeBestSellingStoreGrid";
import SafeImage from "@/components/common/SafeImage";
import HomeTagline from "@/components/marketing/home/HomeTagline";

export default async function Home() {
    const categories = await fetchCategories();
    const todayProducts = await fetchProductPagination(0, 8);
    const bestSellingStoreProducts = await fetchProductPagination(8, 12);

    return (
        <div>
            <HomeHero />
            <HomeCategoryGrid categories={categories} />
            <HomeTodaysProductGrid products={todayProducts} />
            <HomeBestSellingStoreGrid products={bestSellingStoreProducts} />
            <HomeTagline />
        </div>
    );
}
