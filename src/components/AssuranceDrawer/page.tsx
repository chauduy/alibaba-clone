import Image from 'next/image';
import { CiCircleCheck } from 'react-icons/ci';
import { HiMiniXMark } from 'react-icons/hi2';
import { MdOutlineNavigateNext } from 'react-icons/md';

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer';
import useViewport from '@/hook/useViewport';

import { Button } from '../ui/button';

function AssuranceDrawer() {
    const { width } = useViewport();
    const isDesktop = width > 1024;

    return (
        <Drawer direction={isDesktop ? 'right' : 'bottom'}>
            <DrawerTrigger className="w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-1">
                        <Image
                            src={'/icons/assurance.webp'}
                            alt="assurance-icon"
                            width={1000}
                            height={1000}
                            className="h-3 w-3"
                        />

                        <div className="text-xs font-bold">Trade Assurance</div>
                    </div>
                    <MdOutlineNavigateNext className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-1 text-left text-[10px]">
                    Built-in order protection service in alibaba.com
                </div>
                <div className="flex items-center text-[10px]">
                    <CiCircleCheck className="mr-1 h-3 w-3 text-primary" />
                    <div>Product quality</div>
                    <CiCircleCheck className="ml-2 mr-1 h-3 w-3 text-primary" />
                    <div>On-time shipment</div>
                </div>
            </DrawerTrigger>
            <DrawerContent className="bg-white">
                <DrawerHeader className="relative border-b-[1px] border-[#dddddd]">
                    <DrawerTitle className="text-lg">Trade Assurance</DrawerTitle>
                    <DrawerClose>
                        <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-3 h-8 w-8 text-secondary">
                            <HiMiniXMark />
                        </Button>
                    </DrawerClose>
                </DrawerHeader>
                <div className="bg-white p-4">
                    <div className="rounded-md bg-[#FFF0E6] p-4 text-[11.5px]">
                        <div className="flex items-center gap-x-2">
                            <Image
                                src={'/icons/assurance.webp'}
                                alt="assurrance-icon"
                                width={1000}
                                height={1000}
                                className="h-6 w-6"
                            />
                            <div className="text-lg">Trade Assurance</div>
                        </div>
                        <div className="mt-2 text-[#666666]">
                            Alibaba.com's built-in order protection service which protects online
                            orders when payment is made through Alibaba.com.
                        </div>
                        <div className="mt-2 text-[#666666]">Trade Assurance reduces risks in:</div>
                        <div className="mt-2 flex items-center">
                            <Image
                                src={'/icons/quality.avif'}
                                alt="assurrance-icon"
                                width={1000}
                                height={1000}
                                className="mr-1 w-6"
                            />
                            <div className="mr-12 mt-1">Product quality </div>
                            <Image
                                src={'/icons/shipment.avif'}
                                alt="assurrance-icon"
                                width={1000}
                                height={1000}
                                className="mr-1 w-6"
                            />
                            <div className="mt-1">On-time shipment</div>
                        </div>
                    </div>
                    <div className="mt-3 rounded-md bg-[#F7F8FA] p-4 text-[11.5px]">
                        <div className="mb-3 text-sm">Secure payment options</div>
                        <div className="flex items-center gap-x-2 border-b-[1px] border-[#dddddd] pb-3">
                            <Image
                                src={'/icons/visa.webp'}
                                alt="payment-icon"
                                width={1000}
                                height={1000}
                                className="w-8"
                            />
                            <Image
                                src={'/icons/master-card.webp'}
                                alt="payment-icon"
                                width={1000}
                                height={1000}
                                className="w-12"
                            />
                            <Image
                                src={'/icons/t-t.webp'}
                                alt="payment-icon"
                                width={1000}
                                height={1000}
                                className="w-5"
                            />
                            <Image
                                src={'/icons/western.webp'}
                                alt="payment-icon"
                                width={1000}
                                height={1000}
                                className="w-[108px]"
                            />
                            <Image
                                src={'/icons/boleto.webp'}
                                alt="payment-icon"
                                width={1000}
                                height={1000}
                                className="w-5"
                            />
                        </div>
                        <div className="mt-2">
                            <div className="text-sm font-bold italic text-[#6CAD4E]">
                                Online Bank Payment
                            </div>
                            <div className="mt-0.5 text-xs text-[#666666]">
                                Direct payment from an online Bank.
                            </div>
                            <div className="mt-3 text-sm font-bold italic text-[#1E56EF]">
                                Pay Later
                            </div>
                            <div className="mt-0.5 text-xs text-[#666666]">
                                Fast and simple way to finance your order.
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 rounded-md bg-[#F7F8FA] p-4 text-[11.5px]">
                        <div className="text-sm">Other trade services</div>
                        <div className="mb-2 mt-3 flex items-center gap-x-2">
                            <Image
                                src={'/icons/logistics.webp'}
                                alt="services-icon"
                                width={1000}
                                height={1000}
                                className="w-5"
                            />
                            <div className="text-sm">Alibaba.com Logistics</div>
                        </div>
                        <ol className="text-[#666666]">
                            <li>. Fast ocean and air shipping</li>
                            <li>. Competitive prices</li>
                            <li>. Online tracking</li>
                        </ol>
                        <div className="mb-2 mt-3 flex items-center gap-x-2">
                            <Image
                                src={'/icons/solution.webp'}
                                alt="services-icon"
                                width={1000}
                                height={1000}
                                className="w-5"
                            />
                            <div className="text-sm">Inspection Solutions</div>
                        </div>
                        <ol className="text-[#666666]">
                            <li>. Leading inspection companies</li>
                            <li>. Competitive prices</li>
                            <li>. Dedicated one-on-one service</li>
                        </ol>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default AssuranceDrawer;
