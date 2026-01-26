import { Product } from '@/types/product'
import Chips from './Chips';
import Buttons from './Button/Buttons';
import Link from 'next/link';
import SafeImage from './SafeImage';
import useCart from '@/app/hooks/useCart';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

function ProductCard({ product }: ProductCardProps) {

    return (
        <div className='rounded-lg border border-neutral-600 overflow-hidden bg-neutral-800 flex flex-col h-full'>
            <div className='relative'>
                <SafeImage src={product.images[0]} alt={product.title} />
                <Chips className='absolute top-0 left-0 m-2 ' name={product.category.name} />
            </div>
            <div className='p-4 justify-between'>
                <div>
                    <h3 className='text-xl font-semibold mb-2 truncate'>{product.title}</h3>
                    <h3 className='text-2xl font-semibold mb-2'>{`$${product.price}`}</h3>
                    <p className='truncate'>{product.description}</p>
                </div>
                <div className='flex  justify-between mt-4 '>
                    <div className='items-center justify-center w-full flex flex-col gap-4'>
                        <Link href={`/products/${product.id}`} className='w-full' >
                            <Buttons className='w-full'>Show Detail</Buttons>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard