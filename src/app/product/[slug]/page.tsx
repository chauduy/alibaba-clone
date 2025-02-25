'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import ReviewStar from '@/components/ReviewStar/page';
import { Product as ProductProps } from '@/type';

import data from '../../../../data.json';

function Product() {
    const [product, setProduct] = useState<ProductProps>();
    const param = useParams();
    const productId = Number(param.slug);

    useEffect(() => {
        let findProduct;
        data.forEach((item) => {
            item.productList.forEach((product) => {
                if (product.id === productId) {
                    findProduct = product;
                }
            });
        });
        setProduct(findProduct);
    }, [productId]);
    console.log('product', product);

    return (
        <div>
            {product ? (
                <div className="bg-gray-100">
                    <Image
                        width={1000}
                        height={1000}
                        alt="product-img"
                        src={product?.imageSrc!}
                    />
                    <div className="bg-white p-3 text-sm">
                        <div className="text-2xl font-bold">{product.price}</div>
                        <div className="mt-1">Min order: {product.minPerOrder}</div>
                        <div className="mt-6">{product.subject}</div>

                        <div className="flex items-center">
                            <ReviewStar star={product.star!} />
                            <div className="mt-0.5 text-[#767676]">{product.sold} sold</div>
                        </div>
                    </div>

                    <div className="mt-2 bg-white p-3 text-sm">
                        <div className="font-bold">Shipping</div>
                        <div className="font-bold">Electronic Parcels (Standard)</div>
                        <div>
                            Shipping total: {product.price} for {product.minPerOrder}
                        </div>
                        <div>Estimated delivery by </div>
                    </div>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
}

export default Product;
