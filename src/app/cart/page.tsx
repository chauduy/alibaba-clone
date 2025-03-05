'use client';

import React from 'react';

import CartItem from '@/components/CartItem/page';
import OrderSummay from '@/components/OrderSummary/page';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

function Cart() {
    const { list } = useAppSelector((state: RootState) => state.cart);
    return (
        <div className="appPadding mx-auto xl:max-w-screen-2xl 2xl:max-w-screen-xl">
            <h1 className="text-2xl font-bold">Shopping cart</h1>
            <div className="mt-8 flex flex-col gap-y-4 lg:ml-4 xl:flex-row xl:gap-x-24">
                <div className="flex flex-col gap-y-4">
                    {list.map((item, index) => (
                        <CartItem
                            product={{
                                ...item,
                                isLast: index === list.length - 1
                            }}
                            key={item.id}
                        />
                    ))}
                </div>
                <OrderSummay />
            </div>
        </div>
    );
}

export default Cart;
