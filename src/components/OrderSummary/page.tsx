import React from 'react';

import { GoShieldCheck } from 'react-icons/go';

import { Button } from '../ui/button';

function OrderSummay() {
    return (
        <div className="h-fit rounded border border-gray-300 p-4 md:mx-auto md:w-1/2 lg:w-1/3 lg:rounded-md lg:border-[#fff] lg:shadow-[0_-4px_20px_#0000000f] xl:w-[40%]">
            <div className="text-[20px] font-bold">Order Summary</div>
            <div className="mt-6 flex items-center justify-between border-b border-gray-200 pb-4 text-sm">
                <div>Item subtotal</div>
                <div className="font-bold">$323.00</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
                <div className="font-bold">Subtotal excl, tax</div>
                <div>$323.00</div>
            </div>
            <div className="mt-1 text-xs text-gray-500">(Excluding shipping fee and tax)</div>
            <Button
                variant={'default'}
                className="mt-6 h-10 w-full rounded-full bg-primary text-sm font-bold text-white">
                <GoShieldCheck />
                <span>Check out</span>
            </Button>
        </div>
    );
}

export default OrderSummay;
