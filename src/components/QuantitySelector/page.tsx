import React from 'react';

import { Minus, Plus } from 'lucide-react';

import { Button } from '../ui/button';

function QuantitySelector() {
    return (
        <div className="flex h-6 w-[88px] items-center rounded-full border border-l-0 border-r-0 border-[#d8d8d8] md:w-[98px] lg:h-8 lg:w-[126px]">
            <Button
                variant={'outline'}
                size={'icon'}
                className="quantityBtn">
                <Minus size={18} />
            </Button>

            <input
                type="number"
                value={2}
                readOnly
                className="w-10 text-center md:ml-3.5 lg:w-12"
            />
            <Button
                variant={'outline'}
                size={'icon'}
                className="quantityBtn">
                <Plus size={18} />
            </Button>
        </div>
    );
}

export default QuantitySelector;
