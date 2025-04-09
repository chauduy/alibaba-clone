'use client';

import { useEffect, useState } from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { orderTabs } from '@/constants';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { CustomOrderProps } from '@/type';
import { convertToDate, getAmount, getOrderStatus } from '@/util';

import { OrderTabs } from '../Tabs/page';

function OrderPreview() {
    const [selectedOrderType, setSelectedOrderType] = useState<string | undefined>();
    const [customOrders, setCustomOrders] = useState<CustomOrderProps[]>();
    const [currentOrders, setCurrentOrders] = useState<CustomOrderProps[]>();
    const { orders } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!orders) return;
        const tempOrders = orders.map((item) => ({
            ...item,
            delivery_time: convertToDate(item.delivery_time),
            order_time: convertToDate(item.order_time),
            status: getOrderStatus(item.delivery_time)
        }));
        setSelectedOrderType(orderTabs[0].key);
        setCustomOrders(tempOrders);
    }, [orders]);

    useEffect(() => {
        if (selectedOrderType === 'all') {
            setCurrentOrders(customOrders);
            return;
        }
        setCurrentOrders(
            customOrders?.filter((item) => item.status === selectedOrderType).slice(0, 3)
        );
    }, [selectedOrderType]);

    return (
        <div className="mb-2 bg-white px-4 pb-6 pt-3">
            <h1 className="mb-4 text-2xl font-bold">Orders</h1>
            <div>
                <OrderTabs
                    selectedOrderType={selectedOrderType}
                    setSelectedOrderType={setSelectedOrderType}
                />
                {currentOrders && currentOrders?.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead className="text-nowrap">Order time</TableHead>
                                <TableHead className="text-nowrap">Delivery time</TableHead>
                                <TableHead className="text-center">Amount</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentOrders?.map((item, index) => (
                                <TableRow key={item.orderId}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{item.order_time}</TableCell>
                                    <TableCell>{item.delivery_time}</TableCell>
                                    <TableCell className="text-center">{`$${getAmount(item.list)}`}</TableCell>
                                    <TableCell className="text-center">
                                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-[16px] font-medium">{`You don't have any orders on ${selectedOrderType}`}</div>
                )}
            </div>
        </div>
    );
}

export default OrderPreview;
