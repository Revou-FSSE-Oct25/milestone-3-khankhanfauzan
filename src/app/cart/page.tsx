'use client'

import CartCard from '@/components/CartCard'
import React from 'react'
import useCart from '../hooks/useCart'
import Link from 'next/link';
import Buttons from '@/components/Button/Buttons';

function page() {
    const { cart, updateQty, remove } = useCart();

    const handleRemove = (id: number) => {
        if (window.confirm("Are you sure you want to remove this item?")) {
            remove(id);
        }
    }

    const tax = 0.11;
    const taxPercentage = tax * 100;

    const subTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const subTax = subTotal * tax;
    const total = subTotal + subTax;

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <Link href="/"><Buttons variant="secondary">Go Shopping</Buttons></Link>
            </div>
        );
    }

    return (
        <main className='max-w-7xl mx-auto px-6 py-12'>
            <h1 className='text-4xl mb-8 font-semibold'>Cart</h1>
            <div className='grid grid-cols-12 gap-8'>
                <div className='col-span-8'>
                    {cart.map((item) =>
                        <CartCard
                            key={item.id}
                            item={item}
                            onRemove={handleRemove}
                            onUpdateQty={updateQty}
                        />)}
                </div>
                <div className='col-span-4 rounded-lg flex flex-col p-4 bg-neutral-800 h-full max-h-80'>
                    <h3 className='text-2xl font-semibold' >Summary</h3>
                    <div className='flex flex-col gap-2 mt-2'>
                        <div className='flex justify-between text-neutral-400'>
                            <p className=''>Sub Total</p>
                            <p>{`$${subTotal}`}</p>
                        </div>
                        <div className='flex justify-between text-neutral-400'>
                            <p>Tax {`(${taxPercentage}%)`}</p>
                            <p>{`$${subTax}`}</p>
                        </div>
                    </div>
                    <div className='border-t border-neutral-600 flex flex-col gap-4 pt-2 mt-2'>
                        <div className='flex justify-between'>
                            <p className='text-2xl font-bold'>Total Price</p>
                            <p className='text-2xl font-bold'>{`$${total}`}</p>
                        </div>
                        <Buttons>Checkout</Buttons>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page