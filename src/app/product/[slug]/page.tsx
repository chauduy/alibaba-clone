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
    if (id >= list.length - 24) {
        results = list.slice(findIndex - 24, findIndex);
    } else {
        results = list.slice(findIndex + 1, findIndex + 25);
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
                <div className="largeScreenConstrain bg-gray-100 pb-4 lg:bg-white/80">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-7">
                            <div className="mb-6 hidden pt-6 lg:block">
                                <h1 className="mb-1 text-lg font-bold">{product.subject}</h1>

                                <div className="flex items-center">
                                    <ReviewStar star={product.star!} />
                                    <div className="mt-0.5 text-[#767676]">{product.sold} sold</div>
                                </div>
                            </div>
                            <Image
                                width={1000}
                                height={1000}
                                alt="product-img"
                                src={product.imageSrc}
                                className="object-cover md:h-[500px] lg:hidden"
                            />
                            <div className="mt-8 hidden items-center justify-center rounded-[12px] bg-black/5 lg:flex">
                                <Image
                                    width={1000}
                                    height={1000}
                                    alt="product-img"
                                    src={product.imageSrc}
                                    className="h-[500px] w-[80%] object-cover"
                                />
                            </div>
                            <div className="bg-white p-3 text-sm md:p-6 lg:hidden">
                                <div className="text-2xl font-bold">{product.price}</div>
                                <div className="mt-1">Min order: {product.minPerOrder}</div>
                                <div className="mt-6">{product.subject}</div>

                                <div className="flex items-center">
                                    <ReviewStar star={product.star!} />
                                    <div className="mt-0.5 text-[#767676]">{product.sold} sold</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-5 lg:ml-20 lg:mt-6 lg:rounded-xl lg:border-[1px] lg:border-[#fff] lg:shadow-[0_-4px_20px_#0000000f]">
                            <div className="mt-2 bg-white p-3 text-sm md:p-6 lg:mt-0 lg:py-0 lg:text-[16px]">
                                <div className="mt-6 hidden border-b-[1px] border-[#dddddd] pb-5 lg:block">
                                    <div className="mb-1 mt-1 text-[16px] text-gray-500">
                                        Minimum order quantity: {product.minPerOrder}
                                    </div>
                                    <div className="text-3xl font-bold">{product.price}</div>
                                </div>
                                <div className="mb-2 font-bold lg:mb-4 lg:mt-5 lg:text-lg">
                                    Shipping
                                </div>
                                <div className="font-bold lg:mb-1">
                                    Electronic Parcels (Standard)
                                </div>
                                <div className="lg:mb-1">
                                    Shipping total: {product.price} for {product.minPerOrder}
                                </div>
                                <div>Estimated delivery within 7 days</div>
                                <div className="mt-4 flex items-center gap-x-2 lg:mt-6 lg:border-b-[1px] lg:border-[#dddddd] lg:pb-6">
                                    <div className="flex w-[calc(100%-48px)] items-center gap-x-2 md:w-fit lg:w-full">
                                        <button className="h-10 w-1/2 rounded-full bg-primary text-sm font-bold text-white md:w-40 lg:h-12 lg:w-1/2">
                                            Start order
                                        </button>
                                        <button className="h-10 w-1/2 rounded-full border-[1px] border-black bg-gray-100 text-sm font-bold md:w-40 lg:h-12 lg:w-1/2">
                                            Add to cart
                                        </button>
                                    </div>
                                    <button className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-black lg:hidden">
                                        <IoMailOutline className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2 bg-white p-3 text-sm md:p-6 lg:mt-0">
                                <AssuranceDrawer />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 px-3 md:mt-6 md:px-6 lg:px-0">
                        <div className="mb-2.5 text-sm font-bold md:mb-4 md:text-[16px] lg:text-lg">
                            Recommended From Other Suppliers
                        </div>
                        <div className="flex flex-wrap gap-x-1 gap-y-2 md:gap-x-2">
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
