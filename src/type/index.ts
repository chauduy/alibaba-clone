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
