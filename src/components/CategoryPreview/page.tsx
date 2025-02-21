import Link from 'next/link';
import { GrFormNextLink } from 'react-icons/gr';

import { Category } from '@/type';

import { Tooltip } from '@mui/material';

function CategoryPreview({ id, categoryType, productList, title, productPreview }: Category) {
    return (
        <div className="h-full w-full rounded-lg bg-[#f8f8f8] p-5">
            <Link
                href={`/category/${id}`}
                target="_self">
                <div className="mb-4 flex items-center justify-between">
                    <Tooltip title={title}>
                        <div className="line-clamp-1 text-[20px] font-bold">{title}</div>
                    </Tooltip>
                    <GrFormNextLink className="h-7 w-7 hover:text-gray-400" />
                </div>
                <div className="flex gap-x-3">
                    {productPreview.map((item) => (
                        <div
                            className="w-1/3"
                            key={item.id}>
                            <img
                                src={item.imageSrc}
                                alt="preview-product"
                                className="w-full rounded-lg object-cover"
                            />
                            <div className="py-2 text-sm font-bold">{item.price}</div>
                            <div className="text-sm">
                                <span className="mr-1">Min. order:</span> {item.minUnit}
                            </div>
                        </div>
                    ))}
                </div>
            </Link>
        </div>
    );
}

export default CategoryPreview;
