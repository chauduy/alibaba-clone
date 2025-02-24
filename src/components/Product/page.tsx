import { useEffect, useState } from 'react';

import Image from 'next/image';

import useViewport from '@/hook/useViewport';
import { Product } from '@/type';

import { Tooltip } from '@mui/material';

function ProductItem({
    id,
    imageSrc,
    minPerOrder,
    popularityScore,
    price,
    subject,
    hotSellingScore,
    bestReviewScore
}: Product) {
    const { width } = useViewport();
    const isDesktop = width > 1024;
    const isTablet = width > 768 && width < 1024;

    const getScore = () => {
        if (popularityScore) {
            return (
                <span>
                    Popularity score: <b>{popularityScore}</b>
                </span>
            );
        }
        if (hotSellingScore) {
            return (
                <span>
                    Hot-selling score: <b>{hotSellingScore}</b>
                </span>
            );
        }
        if (bestReviewScore) {
            return (
                <span>
                    Best-reviewed score: <b>{bestReviewScore}</b>
                </span>
            );
        }
    };

    return (
        <div
            className={`mb-4 flex h-fit cursor-pointer border-b-2 border-gray-200 pb-4 md:w-[24.25%] md:flex-col md:border-none lg:w-[19.2%] ${isTablet && id % 4 !== 0 ? 'md:mr-[1%]' : ''} ${isDesktop && id % 5 !== 0 ? 'lg:mr-[1%]' : ''}`}
            key={id}>
            <Image
                src={imageSrc}
                alt="product-image"
                width={1000}
                height={1000}
                className="h-fit w-2/5 rounded-md md:w-full md:rounded-xl"
            />
            <div className="ml-2 mt-1 text-sm xxs:ml-4 xxs:text-lg xs:text-[22px] sm:text-[26px] md:ml-0 md:mt-2 md:text-sm">
                <Tooltip title={subject}>
                    <div className="line-clamp-2 hover:text-primary">{subject}</div>
                </Tooltip>
                <div className="mt-1.5 text-[20px] font-bold xxs:text-lg xs:mt-3 xs:text-[24px] sm:text-[28px] md:mt-0.5 md:text-[20px]">
                    {price}
                </div>
                <div className="mt-1 xs:mt-3 md:mt-0.5">Min. orde: {minPerOrder}</div>
                <div className="mt-1 xs:mt-3 md:mt-0.5">{getScore()}</div>
            </div>
        </div>
    );
}

export default ProductItem;
