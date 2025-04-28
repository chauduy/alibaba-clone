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
    quantity?: number;
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
    className?: string;
    setSelected: (text: string) => void;
}

export interface BannerProps {
    key: string;
    title: string;
    description: string;
}

export interface RegistrationForm {
    country_id: string;
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    phone_code: string;
    phone_number: string;
    terms: boolean;
}

export interface UserInfo {
    email?: string;
    uid: string;
    country_id?: string;
    first_name?: string;
    last_name?: string;
    phone_code?: string;
    phone_number?: string;
    display_name?: string;
    token: string;
}

export interface Timestamp {
    seconds: number;
    nanoseconds: number;
}

export interface OrderProps {
    delivery_time: Timestamp;
    list: Product[];
    orderId: string;
    order_time: Timestamp;
}

export interface CustomOrderProps {
    delivery_time: string;
    list: Product[];
    orderId: string;
    no: string;
    order_time: string;
    status: string;
    amount: string;
    status_style?: string;
    amount_style?: string;
    delivery_time_style?: string;
    order_time_style?: string;
    no_style?: string;
}
