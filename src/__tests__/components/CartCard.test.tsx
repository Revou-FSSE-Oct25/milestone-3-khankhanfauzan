import { render, screen, fireEvent } from "@testing-library/react";
import CartCard from "@/components/cart/CartCard";
import { CartItem } from "@/types/product";

const item: CartItem = {
    id: 1,
    title: "Product",
    price: 10,
    description: "Desc",
    images: [],
    category: { id: 1, name: "Cat", image: "img" },
    quantity: 2,
};

describe("CartCard", () => {
    it("renders product information", () => {
        const { getByText } = render(
            <CartCard
                item={item}
                onUpdateQty={jest.fn()}
                onRemove={jest.fn()}
            />,
        );

        expect(getByText("Product")).toBeTruthy();
        expect(getByText("$10")).toBeTruthy();
    });

    it("calls onRemove when remove button is clicked", () => {
        const onRemove = jest.fn();
        const { container } = render(
            <CartCard
                item={item}
                onUpdateQty={jest.fn()}
                onRemove={onRemove}
            />,
        );

        const trashIcon = container.querySelector("svg");
        if (!trashIcon) {
            throw new Error("Trash icon not found");
        }
        fireEvent.click(trashIcon);
        expect(onRemove).toHaveBeenCalledWith(1);
    });

    it("calls onUpdateQty when quantity buttons are clicked", () => {
        const onUpdateQty = jest.fn();
        render(
            <CartCard
                item={item}
                onUpdateQty={onUpdateQty}
                onRemove={jest.fn()}
            />,
        );

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[buttons.length - 1]);

        expect(onUpdateQty).toHaveBeenCalled();
    });
});
