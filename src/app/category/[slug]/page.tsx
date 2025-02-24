'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import ProductItem from '@/components/ProductItem/page';
import { productBanner } from '@/constants';
import { Category as CategoryProps } from '@/type';

import data from '../../../../data.json';

function Category() {
    const [currentCategoy, setCurrentCategory] = useState<CategoryProps | null>(null);
    const [bannerContent, setBannerContent] = useState<any>();
    const param = useParams();
    const categoryId = Number(param.slug);

    useEffect(() => {
        if (categoryId) {
            setCurrentCategory(data.find((item) => item.id === categoryId)!);
        }
    }, [categoryId]);

    useEffect(() => {
        if (currentCategoy) {
            setBannerContent(
                productBanner.find((item) => item.key === currentCategoy.categoryType)!
            );
        }
    }, [currentCategoy]);

    return (
        <div className="border-t-[1px] border-[#dddddd]">
            <div className="appPadding largeScreenConstrain">
                <h4 className="mb-5 mt-4 text-2xl font-bold md:text-3xl lg:mb-10">
                    {currentCategoy?.title}
                </h4>
                <div className="flex h-[250px] w-full items-center justify-between rounded-xl bg-[#ffc7a1] pl-4 md:pl-8 lg:h-[300px] lg:px-14">
                    <div>
                        <div className="text-[13px]">{bannerContent?.title}</div>
                        <h4 className="mt-2 text-xl font-bold lg:mt-5 lg:text-3xl">
                            Garment Patches
                        </h4>
                        <p className="mt-2 text-sm leading-5 md:max-w-[500px] lg:mt-5 lg:max-w-[600px] lg:text-[16px]">
                            {bannerContent?.description}
                        </p>
                        <button className="font-semibol mt-2 rounded-3xl border-[1px] border-black px-4 py-1.5 text-[16px] lg:mt-5 lg:px-6 lg:py-3">
                            More Ranking
                        </button>
                    </div>
                    <Image
                        src={'/images/product-banner.avif'}
                        alt="product-banner"
                        width={1000}
                        height={1000}
                        className="w-[150px] object-cover md:w-[250px] lg:w-[388px]"
                    />
                </div>
                <div className="mt-5 md:flex md:flex-wrap">
                    {currentCategoy?.productList.map((item, index) => (
                        <ProductItem
                            {...item}
                            key={item.id}
                            isLast={index === currentCategoy.productList.length - 1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;
