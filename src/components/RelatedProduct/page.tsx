import Image from 'next/image';
import Link from 'next/link';

import { Product as ProductProps } from '@/type';

function RelatedProduct({ product }: { product: ProductProps }) {
    return (
        <Link
            className="w-[calc((100%-4px)/2)] rounded-b-sm bg-white"
            target="_self"
            href={`/product/${product.id}`}>
            <Image
                width={1000}
                height={1000}
                alt="product-img"
                src={product.imageSrc}
                className="w-full rounded-t-sm"
            />
            <div className="p-2">
                <div className="mt-2 line-clamp-2 text-xs text-[#666666]">{product.subject}</div>
                <div className="mt-0.5 text-sm font-bold">{product.price}</div>
                <div className="text-xs">Min order: {product.minPerOrder}</div>
            </div>
        </Link>
    );
}

export default RelatedProduct;
