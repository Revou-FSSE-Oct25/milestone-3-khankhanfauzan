import { verifySession, getUser, requireRole } from "@/lib/dal"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

jest.mock("@/lib/session", () => ({
    getSession: jest.fn(),
}))

jest.mock("next/navigation", () => ({
    redirect: jest.fn(),
}))

const mockedGetSession = getSession as jest.MockedFunction<typeof getSession>
const mockedRedirect = redirect as jest.MockedFunction<typeof redirect>

describe("verifySession", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("redirects when session is missing", async () => {
        mockedGetSession.mockResolvedValueOnce({} as any)

        try {
            await verifySession()
        } catch { }

        expect(mockedRedirect).toHaveBeenCalledWith("/login")
    })

    it("returns session info when session exists", async () => {
        mockedGetSession.mockResolvedValueOnce({
            userId: 1,
            email: "user@example.com",
            role: "admin",
        } as any)

        const result = await verifySession()

        expect(result).toEqual({
            isAuth: true,
            userId: 1,
            email: "user@example.com",
            role: "admin",
        })
    })
})

describe("getUser", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("returns null when no session", async () => {
        mockedGetSession.mockResolvedValueOnce(undefined as any)

        const user = await getUser()

        expect(user).toBeNull()
    })

    it("returns user when fetch succeeds", async () => {
        mockedGetSession.mockResolvedValueOnce({
            userId: 1,
        } as any)

        const mockUser = {
            id: 1,
            email: "user@example.com",
            password: "pass",
            name: "User",
            role: "customer",
            avatar: "url",
        }

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockUser),
        }) as any

        const user = await getUser()

        expect(global.fetch).toHaveBeenCalled()
        expect(user).toEqual(mockUser)
    })

    it("returns null when fetch response not ok", async () => {
        mockedGetSession.mockResolvedValueOnce({
            userId: 1,
        } as any)

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
        }) as any

        const user = await getUser()

        expect(user).toBeNull()
    })
})

describe("requireRole", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("redirects when role not allowed", async () => {
        mockedGetSession.mockResolvedValueOnce({
            userId: 1,
            email: "user@example.com",
            role: "customer",
        } as any)

        await requireRole(["admin"])

        expect(mockedRedirect).toHaveBeenCalledWith("/admin")
    })

    it("returns session when role allowed", async () => {
        mockedGetSession.mockResolvedValueOnce({
            userId: 1,
            email: "user@example.com",
            role: "admin",
        } as any)

        const session = await requireRole(["admin"])

        expect(session.role).toBe("admin")
        expect(session.userId).toBe(1)
    })
})
