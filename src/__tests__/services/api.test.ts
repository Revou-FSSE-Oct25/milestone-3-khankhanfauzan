import {
    fetchProducts,
    fetchProductById,
} from "@/services/api"

const globalFetch = global.fetch as jest.Mock

describe("services/api", () => {
    beforeEach(() => {
        global.fetch = jest.fn()
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it("fetchProducts calls correct endpoint and returns data", async () => {
        const products = [{ id: 1 }]
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(products),
        }) as any

        const result = await fetchProducts()

        expect(global.fetch).toHaveBeenCalled()
        expect(result).toEqual(products)
    })

    it("fetchProductById throws when response not ok", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
        }) as any

        await expect(fetchProductById(1)).rejects.toThrow()
    })
})

