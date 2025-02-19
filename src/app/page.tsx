'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { CiYoutube } from 'react-icons/ci';
import { FaSpotify } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';
import { IoLocationSharp } from 'react-icons/io5';
import { SiStarbucks } from 'react-icons/si';
import { TbBrandX } from 'react-icons/tb';

import { AccordionWrapper } from '@/components/AccordionWrapper/page';
import CategoryPreview from '@/components/CategoryPreview/page';
import HeaderMenu from '@/components/HeaderMenu/page';
import CategoryTabs from '@/components/Tabs/page';
import { tabs, topFooter } from '@/constants';
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
            <div className={`appPadding flex w-full items-center justify-between bg-white`}>
                <Link
                    href={'/'}
                    target="_self">
                    <Image
                        src={'/images/logo.avif'}
                        alt="brand-logo"
                        width={1000}
                        height={1000}
                        className="h-[30px] w-full object-cover"
                    />
                </Link>
                <div className="flex items-center gap-x-6 text-black">
                    <FiShoppingCart className="h-5 w-5" />
                    <FaRegUser className="h-5 w-5" />
                </div>
            </div>

            <Image
                src={'/images/banner.avif'}
                alt="banner"
                width={1000}
                height={1000}
                className="h-[100px] w-full object-cover md:h-[150px] lg:h-[220px]"
            />

            <main className="mx-auto px-4 py-10 lg:max-w-screen-xl">
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
