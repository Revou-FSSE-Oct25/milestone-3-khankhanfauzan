import { Product } from "@/types/product";

export type HomeBestSellingStore = {
    id: number;
    industry: string;
    storeName: string;
    tagline: string;
    vibe: string;
    products: Product[];
};

export const homeBestSellingStore: HomeBestSellingStore[] = [
    {
        id: 1,
        industry: "Fashion",
        storeName: "Loom & Lyric",
        tagline: "Wear the poetry of the present.",
        vibe: "High-end, sustainable fashion with a focus on textures, flowing fabrics, and timeless silhouettes.",
        products: [],
    },
    {
        id: 2,
        industry: "Tech",
        storeName: "Core & Current",
        tagline: "Future-proof your daily flow.",
        vibe: "Minimalist, high-performance gadgets and EDC gear designed to look as good as they function.",
        products: [],
    },
    {
        id: 3,
        industry: "Furniture",
        storeName: "Stance & Structure",
        tagline: "Design that stays grounded.",
        vibe: "Modern, architectural furniture featuring clean lines and anchor pieces.",
        products: [],
    },
    {
        id: 4,
        industry: "Tech + Furniture Hybrid",
        storeName: "Modu-Link",
        tagline: "Connected spaces, curated lives.",
        vibe: "Integrated smart furniture with built-in charging, modular shelving, and ergonomic setups.",
        products: [],
    },
];
