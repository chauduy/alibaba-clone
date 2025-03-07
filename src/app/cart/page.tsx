'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CartItem from '@/components/CartItem/page';
import OrderSummay from '@/components/OrderSummary/page';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

function Cart() {
    const { list } = useAppSelector((state: RootState) => state.cart);
    const router = useRouter();
    return (
        <div className="appPadding mx-auto xl:max-w-screen-2xl 2xl:max-w-screen-xl">
            <h1 className="text-2xl font-bold">Shopping cart</h1>
            {list.length > 0 ? (
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
            ) : (
                <div className="mx-auto h-[500px] w-fit">
                    <div className="mt-8 lg:mt-28 lg:flex lg:items-start">
                        <Image
                            src={'/images/empty-card.png'}
                            alt="empty-card"
                            width={1000}
                            height={1000}
                            className="mx-auto w-[150px] lg:w-[250px]"
                        />
                        <div className="w-full">
                            <h4 className="text-[20px] font-bold lg:text-2xl">
                                Your shopping cart is empty.
                            </h4>
                            <div className="mb-2 mt-5 text-[16px] lg:mb-4 lg:text-lg">
                                You’re protected on Alibaba.com
                            </div>
                            <div className="mb-2 flex items-center gap-x-2 lg:mb-4 lg:text-[16px]">
                                <Image
                                    src={'/icons/secure.png'}
                                    alt="secure-icon"
                                    width={1000}
                                    height={1000}
                                    className="w-5"
                                />
                                <div>Secure payment</div>
                                <Image
                                    src={'/icons/visa.webp'}
                                    alt="visa-icon"
                                    width={1000}
                                    height={1000}
                                    className="w-[30px]"
                                />
                                <Image
                                    src={'/icons/master-card.webp'}
                                    alt="master-card-icon"
                                    width={1000}
                                    height={1000}
                                    className="w-[40px]"
                                />
                                <Image
                                    src={'/icons/t-t.webp'}
                                    alt="t-t-icon"
                                    width={1000}
                                    height={1000}
                                    className="w-5"
                                />
                            </div>
                            <div className="mb-2 flex items-center gap-x-2 lg:mb-4 lg:text-[16px]">
                                <Image
                                    src={'/icons/refund.png'}
                                    alt="refund-icon"
                                    width={1000}
                                    height={1000}
                                    className="w-5"
                                />
                                <div>Refund and returnst</div>
                            </div>
                            <div className="mb-2 flex items-center gap-x-2 lg:mb-4 lg:text-[16px]">
                                <Image
                                    src={'/icons/logistics.png'}
                                    alt="logistics-icon"
                                    width={1000}
                                    height={1000}
                                    className="w-5"
                                />
                                <div>Fulfillment by Alibaba.com Logistics</div>
                            </div>
                            <Button
                                variant={'ghost'}
                                className="border-[#d8d8d8 mt-6 w-full rounded-full border py-6 text-[16px] font-bold lg:hidden"
                                onClick={() => router.push('/')}>
                                Start Sourcing
                            </Button>
                        </div>
                    </div>
                    <Button
                        variant={'ghost'}
                        className="mx-auto mt-6 hidden h-16 w-[380px] rounded-full border border-[#d8d8d8] text-xl font-bold lg:block"
                        onClick={() => router.push('/')}>
                        Start Sourcing
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Cart;
