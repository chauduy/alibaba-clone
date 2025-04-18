import React from 'react';

import { FaMinus } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';

import { minusQuantity, plusQuantity } from '@/redux/feature/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';

import { Button } from '../ui/button';

function QuantitySelector({
    quantity,
    productId,
    disabled
}: {
    quantity: number | undefined;
    productId: number;
    disabled?: boolean;
}) {
    const dispatch = useAppDispatch();

    return (
        <div className="flex h-6 w-[88px] items-center rounded-full border border-l-0 border-r-0 border-[#d8d8d8] md:w-[98px] lg:h-8 lg:w-[126px]">
            <Button
                variant={'outline'}
                size={'icon'}
                className="quantityBtn"
                disabled={quantity === 1 || disabled}
                onClick={() => dispatch(minusQuantity(productId))}>
                <FaMinus />
            </Button>

            <input
                type="number"
                value={quantity}
                readOnly
                className="w-10 text-center focus:outline-none md:ml-3.5 lg:w-12"
            />
            <Button
                variant={'outline'}
                size={'icon'}
                disabled={disabled}
                className="quantityBtn"
                onClick={() => dispatch(plusQuantity(productId))}>
                <FaPlus />
            </Button>
        </div>
    );
}

export default QuantitySelector;
