import clsx from 'clsx'
import React from 'react'

function Chips({ name, className }: any) {
    return (
        <div className={clsx('py-1 px-2  rounded-md  bg-neutral-500', className)}>
            <p className='font-semibold'>{name}</p>
        </div>
    )
}

export default Chips