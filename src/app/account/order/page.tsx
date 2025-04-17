'use client';

import { useEffect, useState } from 'react';

import InspirationList from '@/components/InspirationList/page';
import Loading from '@/components/Loading/page';
import PaginationCustom from '@/components/ui/pagination';
import CustomTable from '@/components/ui/table';
import { cellOrderColumns, headOrderColumns } from '@/constants';
import { getOrders } from '@/redux/feature/auth/authThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { CustomOrderProps } from '@/type';
import { convertToDate, getAmount, getOrderStatus } from '@/util';

function Order() {
    const [customOrders, setCustomOrders] = useState<CustomOrderProps[]>();
    const { orders, countOrders, lastItem, firstItem, user } = useAppSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [isNext, setIsNext] = useState<boolean | null>(null);

    useEffect(() => {
        // 5 => items per page
        setTotalPage(Math.ceil(countOrders! / 5));
    }, [countOrders]);

    useEffect(() => {
        if (user && lastItem && firstItem && isNext !== null) {
            const direction = isNext ? 'next' : 'prev';
            dispatch(
                getOrders({
                    uid: user.uid,
                    lastItem,
                    firstItem,
                    direction
                })
            );
        }
    }, [currentPage]);

    useEffect(() => {
        if (!orders) return;
        const tempOrders = orders.map((item, index) => ({
            ...item,
            no: String(index + 1),
            delivery_time: convertToDate(item.delivery_time),
            order_time: convertToDate(item.order_time),
            status: getOrderStatus(item.delivery_time),
            amount: `$${getAmount(item.list)}`,
            status_style:
                getOrderStatus(item.delivery_time) === 'Completed'
                    ? 'text-green-600'
                    : 'text-yellow-400',
            amount_style: 'font-bold'
        }));

        setCustomOrders(tempOrders);
    }, [orders]);

    const handleNext = () => {
        setCurrentPage((prevState) => prevState + 1);
        setIsNext(true);
    };

    const handleBack = () => {
        setCurrentPage((prevState) => prevState - 1);
        setIsNext(false);
    };

    return (
        <>
            {orders !== null ? (
                <div className="largeScreenConstrain lg:mt-10">
                    <h1 className="lg mb-4 px-4 text-2xl font-bold">Orders</h1>
                    <div className="relative min-h-[276px] px-4">
                        {customOrders && customOrders?.length > 0 ? (
                            <>
                                <CustomTable
                                    row={customOrders}
                                    cellColumns={cellOrderColumns}
                                    headColumns={headOrderColumns}
                                />
                                {totalPage > 1 && (
                                    <div className="absolute bottom-0 left-[50%] -translate-x-1/2">
                                        <PaginationCustom
                                            currentPage={currentPage}
                                            totalPage={totalPage}
                                            onNext={handleNext}
                                            onPrevious={handleBack}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-[16px] font-medium">{`You don't have any orders yet.`}</div>
                        )}
                    </div>
                    <div className="mt-4 lg:mt-8">
                        <InspirationList />
                    </div>
                </div>
            ) : (
                <div className="screenWrapperLoading">
                    <Loading />
                </div>
            )}
        </>
    );
}

export default Order;
