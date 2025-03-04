import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/type';

import data from '../../../data.json';

import QuantitySelector from '../QuantitySelector/page';

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
        <div className="border-b-2 border-gray-200 pb-6 pl-4">
            <h4 className="mb-4 text-xl font-bold">{getCateogory()}</h4>
            <div className="flex gap-x-4">
                <Image
                    src={product.imageSrc}
                    width={1000}
                    height={1000}
                    alt={`cart-item-${product.id}`}
                    className="w-[110px] rounded-[8px] border"
                />
                <div className="flex flex-col justify-between py-2">
                    <Link
                        href={`/product/${product.id}`}
                        target="_self"
                        className="text-sm font-bold">
                        {product.subject}
                    </Link>
                    <div className="text-lg font-extrabold">{product.price}</div>
                    <QuantitySelector />
                </div>
            </div>
        </div>
    );
}

export default CartItem;
