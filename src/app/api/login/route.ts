import { NextRequest, NextResponse } from "next/server";
import { login, profile } from "@/lib/auth";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        await login(body);
        const user = await profile();

        await createSession(user.id, user.email, user.role);

        return NextResponse.json({ user }, { status: 200 });
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Login failed";
        return NextResponse.json({ message }, { status: 401 });
    }
}
