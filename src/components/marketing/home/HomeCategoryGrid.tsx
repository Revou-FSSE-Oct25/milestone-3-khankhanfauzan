import SafeImage from "@/components/common/SafeImage";
import { Category } from "@/types/product";
import { LayoutGridIcon } from "lucide-react";
import Link from "next/link";

interface HomeCategoryGridProps {
    categories: Category[];
}

function HomeCategoryGrid({ categories }: HomeCategoryGridProps) {
    const visibleCategories = categories.slice(0, 5);

    return (
        <div className="bg-card p-4">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-center text-center gap-12">
                {visibleCategories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className="flex w-24 flex-col items-center gap-2"
                    >
                        <SafeImage
                            src={category.image}
                            alt={category.name}
                            width={80}
                            height={80}
                            className="aspect-square h-20 w-20 overflow-hidden rounded-full object-contain"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <p className="text-sm text-foreground">
                            {category.name}
                        </p>
                    </Link>
                ))}

                <Link
                    href="/categories"
                    className="flex w-24 flex-col items-center gap-2 text-center"
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-xs text-foreground">
                        <LayoutGridIcon />
                    </div>
                    <p className="text-sm text-foreground">See all category</p>
                </Link>
            </div>
        </div>
    );
}

export default HomeCategoryGrid;
