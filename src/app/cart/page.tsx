'use client';

import React from 'react';

import CartItem from '@/components/CartItem/page';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

function Cart() {
    const { list } = useAppSelector((state: RootState) => state.cart);
    console.log(list);
    return (
        <div className="appPadding largeScreenConstrain h-[2000px]">
            <h1 className="text-2xl font-bold">Shopping cart</h1>
            <div className="ml-4 mt-8 flex flex-col gap-y-4">
                {list.map((item) => (
                    <CartItem
                        product={item}
                        key={item.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default Cart;
