'use client'

import { useEffect } from 'react'
import { create } from 'zustand'
import { storage } from '@/services/storage'
import { CartItem, Product } from '@/types/product'

type CartState = {
    cart: CartItem[]
    initialized: boolean
    initialize: () => void
    add: (product: Product) => void
    remove: (id: number) => void
    updateQty: (id: number, delta: number) => void
}

const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    initialized: false,
    initialize: () => {
        if (get().initialized) return
        const existing = storage.getCart()
        set({ cart: existing, initialized: true })
    },
    add: (product: Product) => {
        set((state) => {
            const existing = state.cart.find((item) => item.id === product.id)
            let next: CartItem[]

            if (existing) {
                next = state.cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                )
            } else {
                next = [...state.cart, { ...product, quantity: 1 }]
            }

            storage.saveCart(next)
            return { cart: next }
        })
    },
    remove: (id: number) => {
        set((state) => {
            const next = state.cart.filter((item) => item.id !== id)
            storage.saveCart(next)
            return { cart: next }
        })
    },
    updateQty: (id: number, delta: number) => {
        set((state) => {
            let next = state.cart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + delta }
                    : item,
            )

            next = next.filter((item) => item.quantity > 0)

            storage.saveCart(next)
            return { cart: next }
        })
    },
}))

function useCart() {
    const cart = useCartStore((state) => state.cart)
    const initialized = useCartStore((state) => state.initialized)
    const initialize = useCartStore((state) => state.initialize)
    const add = useCartStore((state) => state.add)
    const remove = useCartStore((state) => state.remove)
    const updateQty = useCartStore((state) => state.updateQty)

    useEffect(() => {
        if (!initialized) {
            initialize()
        }
    }, [initialized, initialize])

    return {
        cart,
        add,
        remove,
        updateQty,
    }
}

export default useCart
