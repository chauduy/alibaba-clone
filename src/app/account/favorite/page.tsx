'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import CartItem from '@/components/CartItem/page';
import InspirationList from '@/components/InspirationList/page';
import PaginationCustom from '@/components/ui/pagination';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Product } from '@/type';

function Favorite() {
    const { favoriteList } = useAppSelector((state: RootState) => state.favorite);
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [source, setSource] = useState<Record<number, Product[]>>({});

    useEffect(() => {
        if (favoriteList) {
            function paginateItems(items: Product[], itemsPerPage = 3) {
                const result: Record<number, Product[]> = {};
                const totalPages = Math.ceil(items.length / itemsPerPage);

                for (let i = 0; i < totalPages; i++) {
                    const page = i + 1;
                    const start = i * itemsPerPage;
                    const end = start + itemsPerPage;
                    result[page] = items.slice(start, end);
                }

                return result;
            }
            setTotalPage(Math.ceil(favoriteList?.length / 3));
            setSource(paginateItems(favoriteList));
        }
    }, [favoriteList]);

    const handleNext = () => {
        setCurrent((prevState) => prevState + 1);
    };

    const handleBack = () => {
        setCurrent((prevState) => prevState - 1);
    };

    return (
        <div className="largeScreenConstrain p-4">
            <h1 className="my-10 text-2xl font-bold">Favorite</h1>
            {favoriteList!?.length > 0 ? (
                <div
                    className={`relative ml-[-16px] flex flex-col gap-y-4 pb-8 ${totalPage > 1 ? 'min-h-[600px] lg:min-h-[700px]' : ''}`}>
                    {source[current]?.map((item, index) => (
                        <CartItem
                            product={{
                                ...item,
                                isLast: index === source[current].length - 1
                            }}
                            key={item.id}
                            disabled
                        />
                    ))}

                    {totalPage > 1 && (
                        <div className="absolute bottom-0 left-[50%] -translate-x-1/2">
                            <PaginationCustom
                                currentPage={current}
                                totalPage={totalPage}
                                onNext={handleNext}
                                onPrevious={handleBack}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex w-fit flex-col">
                    <div className="flex w-32 items-center justify-center rounded-xl bg-gray-100 p-4">
                        <Image
                            width={1000}
                            height={1000}
                            alt="no-favorite"
                            src={'/images/no-favorite.avif'}
                            className="w-20 object-cover"
                        />
                    </div>
                    <div className="my-2 text-center text-[16px] font-bold text-[#000]">
                        No favorite yet
                    </div>
                    <Link
                        href={'/'}
                        target="_self"
                        className="text-center hover:underline">
                        Explore
                    </Link>
                </div>
            )}
            <div className="-ml-4 mt-4 lg:mt-8">
                <InspirationList />
            </div>
        </div>
    );
}

export default Favorite;
