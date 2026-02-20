import SafeImage from "@/components/common/SafeImage";
import React from "react";

function HomeTagline() {
    return (
        <div className="w-full h-40 sm:h-60 lg:h-80 overflow-hidden relative">
            <SafeImage
                src="/images/marketing/homepage/tagline/fashion-sale-tagline.webp"
                className="opacity-25"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-xl sm:text-3xl lg:text-5xl italic text-center">
                    "Where Shopping Meets Simplicity"
                </h1>
            </div>
        </div>
    );
}

export default HomeTagline;
