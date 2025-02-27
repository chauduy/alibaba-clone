'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { IoMailOutline } from 'react-icons/io5';

import AssuranceDrawer from '@/components/AssuranceDrawer/page';
import RelatedProduct from '@/components/RelatedProduct/page';
import ReviewStar from '@/components/ReviewStar/page';
import { Product as ProductProps } from '@/type';

import data from '../../../../data.json';
import list from '../../../../product.json';

const getRelatedProducts = (id: number) => {
    let results = [];
    const findIndex = list.findIndex((item) => item.id === id);
    if (id >= list.length - 20) {
        results = list.slice(findIndex - 20, findIndex);
    } else {
        results = list.slice(findIndex + 1, findIndex + 21);
    }

    return results;
};

function Product() {
    const [product, setProduct] = useState<ProductProps>();
    const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);
    const param = useParams();
    const productId = Number(param.slug);

    useEffect(() => {
        if (productId) {
            let findProduct;
            data.forEach((item) => {
                item.productList.forEach((product) => {
                    if (product.id === productId) {
                        findProduct = product;
                    }
                });
            });
            setProduct(findProduct);
            setRelatedProducts(getRelatedProducts(productId));
        }
    }, [productId]);

    useEffect(() => {
        if (product) {
            document.getElementById('main-top')?.scrollIntoView({
                behavior: 'instant'
            });
        }
    }, [product]);

    return (
        <div>
            {product ? (
                <div className="bg-gray-100 pb-4">
                    <Image
                        width={1000}
                        height={1000}
                        alt="product-img"
                        src={product.imageSrc}
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
                        <div className="mb-2 font-bold">Shipping</div>
                        <div className="font-bold">Electronic Parcels (Standard)</div>
                        <div>
                            Shipping total: {product.price} for {product.minPerOrder}
                        </div>
                        <div>Estimated delivery by </div>
                        <div className="mt-4 flex items-center gap-x-2">
                            <div className="flex w-[calc(100%-48px)] items-center gap-x-2">
                                <button className="h-10 w-1/2 rounded-full bg-primary px-2 text-sm font-bold text-white">
                                    Start order
                                </button>
                                <button className="h-10 w-1/2 rounded-full border-[1px] border-black bg-gray-100 px-2 text-sm font-bold">
                                    Add to cart
                                </button>
                            </div>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-black">
                                <IoMailOutline className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-2 bg-white p-3 text-sm">
                        <AssuranceDrawer />
                    </div>

                    <div className="mt-2 px-3">
                        <div className="mb-2.5 text-sm font-bold">
                            Recommended From Other Suppliers
                        </div>
                        <div className="flex flex-wrap gap-x-1 gap-y-2">
                            {relatedProducts.map((item) => (
                                <RelatedProduct
                                    product={item}
                                    key={item.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
}

export default Product;
