"use client";

import useCart from "@/hooks/useCart";
import { Product } from "@/types/product";
import { Button } from "./ui/button";

interface Props {
    product: Product;
}

function AddToCartAction({ product }: Props) {
    const { cart, add, updateQty } = useCart();
    const cartItem = cart.find((item) => item.id === product.id);

    if (!cartItem) {
        return <Button onClick={() => add(product)}>Add to Cart</Button>;
    }

    return (
        <div className="flex items-center gap-4 p-2 rounded-xl">
            <Button
                onClick={() => updateQty(product.id, -1)}
                className="w-12 h-12 flex items-center justify-center text-xl"
            >
                -
            </Button>

            <input
                type="number"
                value={cartItem.quantity}
                readOnly
                className="w-12 text-center bg-transparent font-bold text-xl outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <Button
                onClick={() => updateQty(product.id, 1)}
                className="w-12 h-12 flex items-center justify-center text-xl"
            >
                +
            </Button>
        </div>
    );
}

export default AddToCartAction;
