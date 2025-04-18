'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { cellOrderColumns, headOrderColumns, orderTabs } from '@/constants';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { CustomOrderProps } from '@/type';
import { convertToDate, getAmount, getOrderStatus } from '@/util';

import { OrderTabs } from '../Tabs/page';
import CustomTable from '../ui/table';

function OrderPreview() {
    const [selectedOrderType, setSelectedOrderType] = useState<string | undefined>();
    const [customOrders, setCustomOrders] = useState<CustomOrderProps[]>();
    const [currentOrders, setCurrentOrders] = useState<CustomOrderProps[]>();
    const { previewOrders } = useAppSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!previewOrders) return;
        const tempOrders = previewOrders.map((item) => ({
            ...item,
            id: item.orderId,
            no: item.orderId.split('-')[0],
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

        setSelectedOrderType(orderTabs[0].key);
        setCustomOrders(tempOrders);
    }, [previewOrders]);

    useEffect(() => {
        if (selectedOrderType === 'All') {
            setCurrentOrders(customOrders?.slice(0, 3));
            return;
        }
        setCurrentOrders(
            customOrders?.filter((item) => item.status === selectedOrderType).slice(0, 3)
        );
    }, [selectedOrderType]);

    const handleViewOrder = (id: string) => {
        if (!id) return;
        router.push(`/account/order/${id}`);
    };

    return (
        <div className="mb-2 bg-white px-4 pb-6 pt-3">
            <div className="flex gap-x-4">
                <h1 className="mb-4 text-2xl font-bold">Orders</h1>
                <Link
                    className="mt-2 text-blue-600 hover:underline"
                    href="/account/order"
                    target="_self">
                    View all
                </Link>
            </div>
            <div className="min-h-[215px]">
                <OrderTabs
                    selectedOrderType={selectedOrderType}
                    setSelectedOrderType={setSelectedOrderType}
                />
                {currentOrders && currentOrders?.length > 0 ? (
                    <CustomTable
                        row={currentOrders}
                        cellColumns={cellOrderColumns}
                        headColumns={headOrderColumns}
                        onViewOrder={handleViewOrder}
                    />
                ) : (
                    <div className="text-[16px] font-medium">{`You don't have any orders ${selectedOrderType !== 'All' ? 'on ' + selectedOrderType?.toLocaleLowerCase() : 'yet'}.`}</div>
                )}
            </div>
        </div>
    );
}

export default OrderPreview;
