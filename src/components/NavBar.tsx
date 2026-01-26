'use client'

import useCart from '@/app/hooks/useCart';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavBar() {

    const { cart } = useCart();

    const pathName = usePathname();

    const isActive = (path: string) => pathName === path ? "text-blue-600 font-bold" : "text-white hover:text-blue-500 font-bold";


    return (
        <nav className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-900 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    <Link href="/" className="text-2xl font-black tracking-tight text-white">
                        Revo<span className="text-blue-600">Shop</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={`text-sm transition-colors ${isActive('/')}`}>
                            Home
                        </Link>
                        <Link href="/products" className={`text-sm transition-colors ${isActive('/products')}`}>
                            All Products
                        </Link>
                    </div>

                    <Link href="/cart" className="group relative flex items-center p-2">
                        <span className="text-2xl">🛒</span>
                        {cart.length > 0 && (<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white group-hover:bg-blue-700">
                            {cart.length}
                        </span>)}

                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar