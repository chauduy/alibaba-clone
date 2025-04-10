import Image from 'next/image';
import Link from 'next/link';

import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

import RelatedProduct from '../RelatedProduct/page';

function FavoritePreview() {
    const { favoriteList } = useAppSelector((state: RootState) => state.favorite);

    return (
        <div className="mb-2 bg-white px-4 py-3">
            <h1 className="mb-4 text-2xl font-bold">Favorites</h1>
            {favoriteList?.length !== 0 ? (
                <div className="flex flex-wrap gap-x-1 gap-y-2">
                    {favoriteList?.slice(0, 2)?.map((item) => (
                        <div
                            className="w-[calc((100%-4px)/2)] rounded-b-sm bg-white"
                            key={item.id}>
                            <RelatedProduct
                                product={item}
                                isHideInfo
                            />
                        </div>
                    ))}
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
        </div>
    );
}

export default FavoritePreview;
