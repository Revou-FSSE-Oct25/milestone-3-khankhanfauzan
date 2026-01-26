
import clsx from 'clsx';

import { getButtonClasses } from './styles';
import { ButtonProps } from './types'



function Buttons({ variant = 'primary', className, children, ...props }: ButtonProps) {
    const buttonClasses = getButtonClasses(variant);

    return (
        <button
            className={clsx(buttonClasses, className)}
            {...props}
        >
            {children}
        </button>
    )
}

export default Buttons