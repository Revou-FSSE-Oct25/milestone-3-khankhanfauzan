import { renderHook, act } from "@testing-library/react";
import useCart from "@/hooks/useCart";
import { storage } from "@/services/storage";
import { Product } from "@/types/product";

jest.mock("@/services/storage", () => ({
    storage: {
        getCart: jest.fn(),
        saveCart: jest.fn(),
    },
}));

const mockedStorage = storage as jest.Mocked<typeof storage>;

const product: Product = {
    id: 1,
    title: "Product",
    price: 10,
    description: "Desc",
    images: [],
    category: { id: 1, name: "Cat", image: "img" },
};

describe("useCart", () => {
    it("supports adding, removing and updating items", () => {
        mockedStorage.getCart.mockReturnValue([]);
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.add(product);
        });

        expect(result.current.cart[0].id).toBe(product.id);
        expect(result.current.cart[0].quantity).toBe(1);

        act(() => {
            result.current.updateQty(product.id, 1);
        });

        expect(result.current.cart[0].quantity).toBe(2);

        act(() => {
            result.current.remove(product.id);
        });

        expect(result.current.cart).toEqual([]);
        expect(mockedStorage.saveCart).toHaveBeenCalled();
    });
});
