'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import CategoryPreview from '@/components/CategoryPreview/page';
import CategoryTabs from '@/components/Tabs/page';
import { tabs } from '@/constants';
import { Category } from '@/type';

import data from '../../data.json';

function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>(tabs[0].key);
    const [selectedData, setSelectedData] = useState<Category[]>([]);

    useEffect(() => {
        if (selectedCategory) {
            const findData = data.filter((item) => item.categoryType === selectedCategory);
            setSelectedData(findData);
        }
    }, [selectedCategory]);

    return (
        <div className="h-full w-full">
            <Image
                src={'/images/banner.avif'}
                alt="banner"
                width={1000}
                height={1000}
                className="h-[100px] w-full object-cover md:h-[150px] lg:h-[220px]"
            />

            <main className="appPadding largeScreenConstrain">
                <div className="mx-1.5">
                    <CategoryTabs
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                <div className="grid grid-cols-12">
                    {selectedData.map((item) => (
                        <div
                            className="col-span-12 mx-1.5 mb-3 md:col-span-6 lg:col-span-4"
                            key={item.id}>
                            <CategoryPreview
                                id={item.id}
                                categoryType={item.categoryType}
                                productList={item.productList}
                                title={item.title}
                                productPreview={item.productPreview}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;
