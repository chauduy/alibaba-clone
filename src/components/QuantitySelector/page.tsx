import React from 'react';

import { Minus, Plus } from 'lucide-react';

import { minusQuantity, plusQuantity } from '@/redux/feature/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';

import { Button } from '../ui/button';

function QuantitySelector({
    quantity,
    productId
}: {
    quantity: number | undefined;
    productId: number;
}) {
    const dispatch = useAppDispatch();

    return (
        <div className="flex h-6 w-[88px] items-center rounded-full border border-l-0 border-r-0 border-[#d8d8d8] md:w-[98px] lg:h-8 lg:w-[126px]">
            <Button
                variant={'outline'}
                size={'icon'}
                className="quantityBtn"
                disabled={quantity === 1}
                onClick={() => dispatch(minusQuantity(productId))}>
                <Minus size={18} />
            </Button>

            <input
                type="number"
                value={quantity}
                readOnly
                className="w-10 text-center md:ml-3.5 lg:w-12"
            />
            <Button
                variant={'outline'}
                size={'icon'}
                className="quantityBtn"
                onClick={() => dispatch(plusQuantity(productId))}>
                <Plus size={18} />
            </Button>
        </div>
    );
}

export default QuantitySelector;
