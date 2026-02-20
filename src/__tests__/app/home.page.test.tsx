import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(site)/page";

jest.mock("@/components/ui/carousel", () => ({
    __esModule: true,
    Carousel: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    CarouselContent: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    CarouselItem: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    CarouselNext: () => null,
    CarouselPrevious: () => null,
}));

jest.mock("@/services/api", () => ({
    fetchCategories: jest.fn().mockResolvedValue([
        {
            id: 1,
            name: "Category 1",
            image: "/category-1.png",
        },
    ]),
    fetchProductPagination: jest.fn().mockResolvedValue(
        Array.from({ length: 12 }).map((_, index) => ({
            id: index + 1,
            title: `Product ${index + 1}`,
            price: 100 + index,
            description: "Mock product description",
            images: ["/product.png"],
            category: {
                id: 1,
                name: "Category 1",
                image: "/category-1.png",
            },
        })),
    ),
}));

describe("HomePage", () => {
    it("renders marketing hero", async () => {
        const page = await HomePage();

        render(page);

        expect(screen.getByText(/Fresh Arrivals Are Here!/i)).toBeTruthy();
    });
});
