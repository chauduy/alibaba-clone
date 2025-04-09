'use client';

import { useEffect, useState } from 'react';

import { getRelatedProducts } from '@/app/product/[slug]/page';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Product } from '@/type';

import RelatedProduct from '../RelatedProduct/page';

function InspirationList() {
    const [inspirationList, setInspirationList] = useState<Product[]>();
    const { favoriteList } = useAppSelector((state: RootState) => state.favorite);

    useEffect(() => {
        if (!favoriteList) {
            // get default list if there is no favorite product
            setInspirationList(getRelatedProducts(1));
            return;
        }

        setInspirationList(getRelatedProducts(favoriteList[0].id));
    }, [favoriteList]);

    return (
        <div className="mb-2 bg-white px-4 pb-6 pt-3">
            <h1 className="mb-4 text-2xl font-bold">Get product inspiration</h1>
            <div className="flex flex-wrap gap-x-1 gap-y-2 md:gap-x-2">
                {inspirationList?.map((item) => (
                    <div
                        className="w-[calc((100%-4px)/2)] rounded-b-sm bg-white md:w-[calc((100%-24px)/4)] lg:w-[calc((100%-40px)/6)]"
                        key={item.id}>
                        <RelatedProduct product={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InspirationList;
