import React from 'react';

import { Minus, Plus } from 'lucide-react';

import { Button } from '../ui/button';

function QuantitySelector() {
    return (
        <div className="flex h-8 w-[126px] items-center rounded-full border border-l-0 border-r-0 border-[#d8d8d8]">
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
                className="ml-3.5 w-12 text-center"
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
