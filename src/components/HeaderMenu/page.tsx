'use client';

import { Dispatch, useRef } from 'react';
import { SetStateAction } from 'react';

import * as motion from 'motion/react-client';
import type { Variants } from 'motion/react';
import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/io5';

import useDimensions from '@/hook/useDimensions';

interface PathProps {
    d?: string;
    variants: Variants;
    transition?: { duration: number };
}

const menu = ['Menu', 'Rewards', 'Gift Cards'];

const Path = (props: PathProps) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <button
        className="fixed right-[16px] top-[13px] h-[50px] w-6 cursor-pointer rounded-full border-none bg-transparent outline-none md:top-[18px]"
        style={{
            WebkitUserSelect: 'none',
            MozUserSelect: 'none'
        }}
        onClick={toggle}>
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <Path
                variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5' },
                    open: { d: 'M 3 16.5 L 17 2.5' }
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346' },
                    open: { d: 'M 3 2.5 L 17 16.346' }
                }}
            />
        </svg>
    </button>
);

const Navigation = () => (
    <motion.ul
        className="absolute top-8 m-0 flex list-none flex-col px-8 py-4"
        variants={{
            open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 }
            },
            closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
            }
        }}>
        {menu.map((item, index) => (
            <MenuItem
                item={item}
                key={index}
            />
        ))}
    </motion.ul>
);

const MenuItem = ({ item }: { item: string }) => {
    return (
        <motion.li
            className="m-0 mb-8 flex cursor-pointer list-none items-center justify-start p-0"
            variants={{
                open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        y: { stiffness: 1000, velocity: -100 }
                    }
                },
                closed: {
                    y: 50,
                    opacity: 0,
                    transition: {
                        y: { stiffness: 1000 }
                    }
                }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            <div className="text-lg text-black md:text-2xl">{item}</div>
        </motion.li>
    );
};

export default function HeaderMenu({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { height } = useDimensions(containerRef);

    return (
        <div>
            <div className="fixed right-0 top-[72px] flex h-full w-[80%] max-w-full flex-1 items-stretch justify-start overflow-hidden md:top-[83px]">
                <motion.nav
                    initial={false}
                    animate={isOpen ? 'open' : 'closed'}
                    custom={height}
                    ref={containerRef}>
                    <motion.div
                        className="absolute bottom-0 left-0 top-0 w-full border-t-2 border-[#dcdcdc] bg-white"
                        variants={{
                            open: (height = 1000) => ({
                                clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
                                transition: {
                                    type: 'spring',
                                    stiffness: 20,
                                    restDelta: 2
                                }
                            }),
                            closed: {
                                clipPath: 'circle(0px at 0px 0px)',
                                transition: {
                                    delay: 0.4,
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 40
                                }
                            }
                        }}
                    />
                    <Navigation />
                    <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                </motion.nav>
                <motion.div
                    className="absolute left-8 right-8 top-56 w-[77%] border-b-2 border-[#dcdcdc]"
                    variants={{
                        open: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                y: { stiffness: 1000, velocity: -100 }
                            }
                        },
                        closed: {
                            y: 200,
                            opacity: 0,
                            transition: {
                                y: { stiffness: 1000 }
                            }
                        }
                    }}
                    initial={false}
                    animate={isOpen ? 'open' : 'closed'}>
                    <div className="absolute mt-8 flex items-center">
                        <button className="mr-4 flex items-center rounded-full border-[1px] border-black px-4 pb-1.5 pt-1 text-sm font-semibold tracking-[1px] text-black">
                            Sign in
                        </button>
                        <button className="flex items-center rounded-full bg-black px-4 pb-1.5 pt-1 text-sm font-semibold tracking-[1px] text-white">
                            Join now
                        </button>
                    </div>
                    <Link
                        href={'/'}
                        target="_self"
                        className="absolute mt-24 flex text-black">
                        <IoLocationSharp className="h-6 w-6" />
                        <div className="ml-3 text-sm font-semibold">Find a store</div>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
