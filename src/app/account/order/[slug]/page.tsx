'use client';

import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import CartItem from '@/components/CartItem/page';
import InspirationList from '@/components/InspirationList/page';
import Loading from '@/components/Loading/page';
import OrderSummary from '@/components/OrderSummary/page';
import PaginationCustom from '@/components/ui/pagination';
import { db } from '@/lib/firebase';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { OrderProps, Product } from '@/type';
import { customToast } from '@/util';

import { DocumentData } from '@google-cloud/firestore';

function OrderDetail() {
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [source, setSource] = useState<Record<number, Product[]>>({});
    const params = useParams();
    const orderId = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const [currentOrder, setCurrentOrders] = useState<OrderProps | DocumentData>();
    const { user } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        async function getOrderById(id: string) {
            const orderRef = doc(db, 'customers', user!.uid, 'orders', id);
            const snap = await getDoc(orderRef);
            if (snap.exists()) {
                setCurrentOrders(snap.data());
            } else {
                toast.error('Something went wrong. Please try again!', customToast('error'));
            }
        }

        if (orderId && user?.uid) {
            getOrderById(orderId);
        }
    }, [orderId, user?.uid]);

    useEffect(() => {
        if (currentOrder) {
            function paginateItems(items: Product[], itemsPerPage = 3) {
                const result: Record<number, Product[]> = {};
                const totalPages = Math.ceil(items.length / itemsPerPage);

                for (let i = 0; i < totalPages; i++) {
                    const page = i + 1;
                    const start = i * itemsPerPage;
                    const end = start + itemsPerPage;
                    result[page] = items.slice(start, end);
                }

                return result;
            }
            setTotalPage(Math.ceil(currentOrder?.list.length / 3));
            setSource(paginateItems(currentOrder?.list));
        }
    }, [currentOrder]);

    const handleNext = () => {
        setCurrent((prevState) => prevState + 1);
    };

    const handleBack = () => {
        setCurrent((prevState) => prevState - 1);
    };

    return (
        <div className="largeScreenConstrain p-4">
            {currentOrder ? (
                <>
                    <h1 className="mt-10 text-2xl font-bold">Order Detail</h1>
                    <div className="mt-8 flex flex-col gap-y-4 lg:ml-4 xl:flex-row xl:gap-x-24">
                        <div className="relative ml-[-16px] flex min-h-[600px] flex-col gap-y-4 pb-8 lg:ml-[-28px] lg:min-h-[720px]">
                            {source[current]?.map((item, index) => (
                                <CartItem
                                    product={{
                                        ...item,
                                        isLast: index === source[current].length - 1
                                    }}
                                    key={item.id}
                                    disabled
                                />
                            ))}

                            {totalPage > 1 && (
                                <div className="absolute bottom-0 left-[50%] -translate-x-1/2">
                                    <PaginationCustom
                                        currentPage={current}
                                        totalPage={totalPage}
                                        onNext={handleNext}
                                        onPrevious={handleBack}
                                    />
                                </div>
                            )}
                        </div>
                        <OrderSummary
                            list={currentOrder.list!}
                            hideCheckout
                        />
                    </div>
                    <div className="mt-4 lg:mt-8">
                        <InspirationList />
                    </div>
                </>
            ) : (
                <div className="screenWrapperLoading">
                    <Loading />
                </div>
            )}
        </div>
    );
}

export default OrderDetail;
