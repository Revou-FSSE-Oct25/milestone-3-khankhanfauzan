"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="mb-8 flex items-center text-sm font-semibold hover:text-blue-600 transition-colors"
        >
            ← Back
        </button>
    );
}
