'use client'

import { storage } from '@/services/storage';
import { CartItem, Product } from '@/types/product'
import { useState, useEffect } from 'react'

function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        setCart(storage.getCart());

        const syncCart = () => {
            console.log("Cart updated event detected!");
            setCart(storage.getCart());
        };

        window.addEventListener('cart-updated', syncCart);

        return () => window.removeEventListener('cart-updated', syncCart);
    }, []);

    return {
        cart,
        add: storage.addToCart,
        remove: storage.removeFromCart,
        updateQty: storage.updateQuantity
    };
}

export default useCart