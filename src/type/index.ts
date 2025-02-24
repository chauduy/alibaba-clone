import { Variants } from 'motion/react';

export interface PathProps {
    d?: string;
    variants: Variants;
    transition?: { duration: number };
}

export interface AccordionProps {
    id: number;
    title: string;
    children: Array<{ title: string; link: string }>;
}

interface ProductPreview {
    id: number;
    imageSrc: string;
    minUnit: string;
    price: string;
}

export interface Product {
    id: number;
    imageSrc: string;
    minPerOrder: string;
    popularityScore?: string;
    price: string;
    subject: string;
    hotSellingScore?: string;
    bestReviewScore?: string;
    isLast?: boolean;
    star: number;
    sold: number;
}

export interface Category {
    id: number;
    categoryType: string;
    productList: Product[];
    productPreview: ProductPreview[];
    title: string;
}

export interface TabProps {
    id: string;
    text: string;
    selected: boolean;
    setSelected: (text: string) => void;
}
