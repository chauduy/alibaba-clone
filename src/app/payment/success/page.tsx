'use client';

import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';

import Confetti from '@/components/Confetti/page';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

function Success() {
    const router = useRouter();
    const { list } = useAppSelector((state: RootState) => state.cart);

    return (
        <div className="flex h-[700px] flex-col items-center justify-center px-6 md:h-[1000px] lg:h-[800px]">
            <div className="flex flex-col items-center gap-y-2 md:gap-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary md:h-16 md:w-16">
                    <FaCheck className="h-6 w-6 text-white md:h-8 md:w-8" />
                </div>
                <h4 className="text-lg font-extrabold md:text-4xl">Congratulation!</h4>
                <div className="text-center text-sm text-gray-500 md:max-w-[70%] md:text-lg">
                    Thank you for your order. We appreciate your business and look forward to
                    serving you again.
                </div>
                <Button
                    variant={'default'}
                    className="mt-2 rounded-full text-white"
                    onClick={() => router.push('/')}>
                    Countinue to shopping
                </Button>
            </div>
            <Confetti />
        </div>
    );
}

export default Success;
