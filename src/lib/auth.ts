'use server'

import { api } from "@/services/api";
import { storage } from "@/services/storage";
import { AUTH_COOKIE, LoginResponse, UserProfile } from "@/types/auth";
import { cookies } from "next/headers";

export const login = async (credential: any): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/login", credential);

    const cookieStore = await cookies();

    const expires = new Date(Date.now() + 1000 * 60 * 60);
    cookieStore.set(AUTH_COOKIE, data.access_token,
        {
            httpOnly: true,
            expires,
            sameSite: 'lax',
            // secure: process.env.NODE_ENV === 'production',
            path: '/'
        }
    );
    return data;
};

export const profile = async (): Promise<UserProfile> => {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(AUTH_COOKIE);

    if (!tokenCookie?.value) {
        throw new Error("Unauthorized");
    }

    const { data } = await api.get("/auth/profile", {
        headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
        },
    });

    return data;
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE);
    storage.removeUser();
}
