// src/utils/storage.ts
import { Product, CartItem } from "@/types/product";

const CART_KEY = "cart";
const AUTH_KEY = "auth";
const USER_KEY = "user";

export const storage = {
    // CART

    getCart: (): CartItem[] => {
        if (typeof window === "undefined") return [];
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveCart: (cart: CartItem[]) => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event("cart-updated"));
    },

    updateQuantity: (productId: number, delta: number) => {
        let cart = storage.getCart();
        const itemIndex = cart.findIndex((item) => item.id === productId);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += delta;

            // If quantity drops to 0, remove the item
            if (cart[itemIndex].quantity <= 0) {
                cart = cart.filter((item) => item.id !== productId);
            }

            storage.saveCart(cart);
        }
    },

    addToCart: (product: Product) => {
        const cart = storage.getCart();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            storage.updateQuantity(product.id, 1);
        } else {
            storage.saveCart([...cart, { ...product, quantity: 1 }]);
        }
    },

    removeFromCart: (productId: number) => {
        const cart = storage.getCart();
        const filtered = cart.filter((item) => item.id !== productId);
        storage.saveCart(filtered);
    },

    // AUTH

    setToken: (token: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_KEY, token);
        }
    },

    getToken: (): string | null => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(AUTH_KEY);
    },

    removeToken: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(AUTH_KEY);
        }
    },

    setUser: (user: {
        name: string;
        email?: string;
        avatarUrl?: string;
        role?: string;
    }) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            window.dispatchEvent(new Event("auth-updated"));
        }
    },

    getUser: (): {
        name: string;
        email?: string;
        avatarUrl?: string;
        role?: string;
    } | null => {
        if (typeof window === "undefined") return null;
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    },

    removeUser: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(USER_KEY);
            window.dispatchEvent(new Event("auth-updated"));
        }
    },

    clearAll: () => {
        if (typeof window !== "undefined") {
            localStorage.clear();
        }
    },
};
