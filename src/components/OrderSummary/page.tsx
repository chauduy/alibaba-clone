'use client';

import React from 'react';

import { GoShieldCheck } from 'react-icons/go';

import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

import { Button } from '../ui/button';

function OrderSummay() {
    const { list } = useAppSelector((state: RootState) => state.cart);
    const quantity = list.reduce((acc, cur) => acc + cur.quantity!, 0);
    const subtotal = parseFloat(
        list
            .reduce((acc, cur) => {
                if (cur.price.includes('-')) {
                    const price = cur.price.split('-')[1];
                    return acc + Number(price) * cur.quantity!;
                } else {
                    const price = cur.price.split('$')[1];
                    return acc + Number(price) * cur.quantity!;
                }
            }, 0)
            .toFixed(2)
    );

    return (
        <div className="h-fit rounded border border-gray-300 p-4 md:mx-auto md:w-1/2 lg:w-1/3 lg:rounded-md lg:border-[#fff] lg:shadow-[0_-4px_20px_#0000000f] xl:w-[40%]">
            <div className="text-[20px] font-bold">Order Summary</div>
            <div className="mt-6 flex items-center justify-between text-sm">
                <div>Item quantity</div>
                <div className="font-bold">{quantity}</div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
                <div>Item subtotal</div>
                <div className="font-bold">${subtotal}</div>
            </div>
            <div className="mt-2 flex items-center justify-between border-b border-gray-200 pb-4 text-sm">
                <div>Shipping fee</div>
                <div className="font-bold">$50</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm font-bold">
                <div>Subtotal excl, tax</div>
                <div>{`$${parseFloat((subtotal + 50).toFixed(2))}`}</div>
            </div>
            <div className="mt-1 text-xs text-gray-500">(Excluding tax fee)</div>
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
