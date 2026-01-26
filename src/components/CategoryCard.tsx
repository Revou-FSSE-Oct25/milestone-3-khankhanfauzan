import { Category } from '@/types/product'

interface CategoryCardProps {
    category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
    return (
        <div className='relative'>
            <img className='rounded-lg' src={category.image} alt={category.name} />

            <div className='absolute top-0 left-0 px-4 py-2'>
                <h3 className=''>{category.name}</h3>
            </div>

        </div>
    )
}

export default CategoryCard