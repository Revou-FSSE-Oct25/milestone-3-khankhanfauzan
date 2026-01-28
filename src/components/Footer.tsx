import Link from "next/link";

function Footer() {
    return (
        <footer className="border-t border-neutral-800 bg-neutral-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <p className="text-sm text-neutral-400">
                    © {new Date().getFullYear()} RevoShop
                </p>
            </div>
        </footer>
    );
}

export default Footer;
