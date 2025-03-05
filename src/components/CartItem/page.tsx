import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/type';

import data from '../../../data.json';

import QuantitySelector from '../QuantitySelector/page';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

function CartItem({ product }: { product: Product }) {
    const getCateogory = () => {
        let findCategory;
        data.forEach((item) => {
            if (item.productList.some((prod) => prod.id === product.id)) {
                findCategory = item.title;
            }
        });

        return findCategory;
    };

    return (
        <div className={`pb-6 pl-4 ${product.isLast ? '' : 'border-b border-gray-300'}`}>
            <h4 className="mb-4 text-xl font-bold">{getCateogory()}</h4>
            <div className="flex gap-x-4">
                <Image
                    src={product.imageSrc}
                    width={1000}
                    height={1000}
                    alt={`cart-item-${product.id}`}
                    className="h-[110px] w-[110px] rounded-[8px] border lg:h-auto lg:w-[150px]"
                />
                <div className="flex flex-col justify-between py-1 lg:py-2">
                    <Link
                        href={`/product/${product.id}`}
                        target="_self">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="line-clamp-2 text-left text-sm font-bold lg:text-lg">
                                        {product.subject}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>{product.subject}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                    <div className="mb-1 text-sm font-extrabold lg:text-[20px]">
                        {product.price}
                    </div>
                    <QuantitySelector />
                </div>
            </div>
        </div>
    );
}

export default CartItem;
