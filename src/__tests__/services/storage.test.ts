import { storage } from "@/services/storage"
import { CartItem, Product } from "@/types/product"

const localStorageProto = Object.getPrototypeOf(window.localStorage)
const getItemSpy = jest.spyOn(localStorageProto, "getItem")
const setItemSpy = jest.spyOn(localStorageProto, "setItem")
const removeItemSpy = jest.spyOn(localStorageProto, "removeItem")
const clearSpy = jest.spyOn(localStorageProto, "clear")

beforeEach(() => {
    jest.clearAllMocks()
    window.localStorage.clear()
})

describe("storage cart helpers", () => {
    it("getCart returns empty array when no data", () => {
        const cart = storage.getCart()
        expect(cart).toEqual([])
        expect(getItemSpy).toHaveBeenCalledWith("cart")
    })

    it("saveCart stores cart in localStorage", () => {
        const cartItem: CartItem = {
            id: 1,
            title: "Product",
            price: 10,
            description: "Desc",
            images: [],
            category: { id: 1, name: "Cat", image: "img" },
            quantity: 2,
        }
        const cart = [cartItem]
        storage.saveCart(cart)
        expect(setItemSpy).toHaveBeenCalledWith("cart", JSON.stringify(cart))
    })

    it("addToCart adds new item when not existing", () => {
        const product: Product = {
            id: 1,
            title: "Product",
            price: 10,
            description: "Desc",
            images: [],
            category: { id: 1, name: "Cat", image: "img" },
        }
        storage.addToCart(product)
        expect(setItemSpy).toHaveBeenCalledWith(
            "cart",
            JSON.stringify([{ ...product, quantity: 1 }]),
        )
    })

    it("addToCart increments quantity when item exists", () => {
        const product: Product = {
            id: 1,
            title: "Product",
            price: 10,
            description: "Desc",
            images: [],
            category: { id: 1, name: "Cat", image: "img" },
        }
        window.localStorage.setItem(
            "cart",
            JSON.stringify([{ ...product, quantity: 1 }]),
        )

        storage.addToCart(product)

        const saved = JSON.parse(
            window.localStorage.getItem("cart") as string,
        ) as any[]
        expect(saved[0].quantity).toBe(2)
    })

    it("updateQuantity updates and removes when quantity goes to zero", () => {
        const product = { id: 1, title: "Product", price: 10, images: [] }
        window.localStorage.setItem(
            "cart",
            JSON.stringify([{ ...product, quantity: 1 }]),
        )

        storage.updateQuantity(1, -1)

        const saved = JSON.parse(
            window.localStorage.getItem("cart") as string,
        ) as any[]
        expect(saved).toEqual([])
    })

    it("removeFromCart removes item by id", () => {
        const product = { id: 1, title: "Product", price: 10, images: [] }
        window.localStorage.setItem(
            "cart",
            JSON.stringify([{ ...product, quantity: 1 }]),
        )

        storage.removeFromCart(1)

        const saved = JSON.parse(
            window.localStorage.getItem("cart") as string,
        ) as any[]
        expect(saved).toEqual([])
    })
})

describe("storage auth and user helpers", () => {
    it("setToken and getToken roundtrip the token value", () => {
        storage.setToken("abc")
        expect(setItemSpy).toHaveBeenCalledWith("auth", "abc")
        expect(storage.getToken()).toBe("abc")
    })

    it("removeToken removes auth key", () => {
        window.localStorage.setItem("auth", "abc")
        storage.removeToken()
        expect(removeItemSpy).toHaveBeenCalledWith("auth")
    })

    it("setUser and getUser roundtrip the user value", () => {
        const user = { name: "John", email: "john@example.com" }
        storage.setUser(user)
        const stored = storage.getUser()
        expect(stored).toEqual(user)
    })

    it("removeUser removes user key", () => {
        window.localStorage.setItem("user", JSON.stringify({ name: "John" }))
        storage.removeUser()
        expect(removeItemSpy).toHaveBeenCalledWith("user")
    })

    it("clearAll clears localStorage", () => {
        window.localStorage.setItem("auth", "abc")
        storage.clearAll()
        expect(clearSpy).toHaveBeenCalled()
    })
})
