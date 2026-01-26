'use client'

import { CartItem } from '@/types/product';
import SafeImage from './SafeImage'
import Buttons from './Button/Buttons';
import { Minus, MinusSquare, MinusSquareIcon, Trash } from 'lucide-react';

interface CartCardProps {
    item: CartItem;
    onUpdateQty: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
}

function CartCard({ item, onUpdateQty, onRemove }: CartCardProps) {
    return (
        <div className='rounded-lg p-2 bg-neutral-800 flex mb-4'>
            <div className='flex flex-row w-full'>
                <SafeImage src={item.images[0]} alt={item.title} width={80} height={80} className='rounded-sm' />
                <div className='flex flex-col mx-4 justify-between p-2 w-full'>
                    <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                    <h3 className='text-2xl font-semibold'>{`$${item.price}`}</h3>
                </div>
                {/* Quantity Button */}
                <div className='flex items-center gap-4 p-2 rounded-xl '>
                    <Trash color='red' className='mr-2 hover:opacity-80' onClick={(() => { onRemove(item.id) })} />

                    <Buttons
                        onClick={() => onUpdateQty(item.id, -1)}
                        className='w-12 h-12 flex items-center justify-center'
                    >
                        -
                    </Buttons>
                    <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className='w-12 text-center bg-transparent font-bold text-xl outline-none'
                    />

                    <Buttons
                        onClick={() => onUpdateQty(item.id, 1)}
                        className='w-12 h-12 flex items-center justify-center'
                    >
                        +
                    </Buttons>
                </div>

            </div>

        </div>
    )
}

export default CartCard