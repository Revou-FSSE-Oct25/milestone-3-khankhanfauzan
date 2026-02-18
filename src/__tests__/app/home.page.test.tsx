import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "@/app/(site)/page";
import * as api from "@/services/api";

jest.mock("@/services/api");

jest.mock("@/components/product/HomeCarousel", () => ({
    __esModule: true,
    default: ({ products }: { products: any[] }) => (
        <div>
            {products.map((p) => (
                <div key={p.id}>{p.title}</div>
            ))}
        </div>
    ),
}));

jest.mock("@/components/product/CategoryCarousel", () => ({
    __esModule: true,
    default: ({ categories }: { categories: any[] }) => (
        <div>{categories.length} categories</div>
    ),
}));

const mockedApi = api as jest.Mocked<typeof api>;

describe("HomePage", () => {
    it("renders products from api", async () => {
        mockedApi.fetchCategories.mockResolvedValueOnce([]);
        mockedApi.fetchProducts.mockResolvedValueOnce([
            {
                id: 1,
                title: "Product 1",
                price: 10,
                description: "Desc",
                images: [],
                category: { id: 1, name: "Cat", image: "img" },
            } as any,
        ]);

        render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText("Product 1")).toBeTruthy();
        });
    });
});
