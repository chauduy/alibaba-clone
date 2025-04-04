'use client';

import { useEffect } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

import Confetti from '@/components/Confetti/page';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { clearCart } from '@/redux/feature/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

function Success() {
    const router = useRouter();
    const { list } = useAppSelector((state: RootState) => state.cart);
    const { user } = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleSubmitOrder = async () => {
            if (!user?.uid || !list || list.length === 0) return;

            const orderId = uuidv4();
            const orderData = {
                list,
                order_time: new Date(),
                delivery_time: new Date(new Date().setDate(new Date().getDate() + 7)),
                orderId
            };

            try {
                const orderRef = doc(db, 'customers', user.uid, 'orders', orderId);
                await setDoc(orderRef, orderData);
                dispatch(clearCart());
                console.log('Order submitted successfully!');
            } catch (error) {
                console.error('Error submitting order:', error);
            }
        };

        handleSubmitOrder();
    }, [list]);

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
