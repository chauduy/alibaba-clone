'use client';

import { useState } from 'react';

import { OrderTabs } from '@/components/Tabs/page';
import { Button } from '@/components/ui/button';
import { orderTabs } from '@/constants';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

function AccountPage() {
    const [selectedOrderType, setSelectedOrderType] = useState<string>(orderTabs[0].key);
    const { user, orders } = useAppSelector((state: RootState) => state.auth);

    console.log('orders', orders);

    return (
        <div className="h-[2000px] bg-[#f8f8f8]">
            <div className="mb-2 bg-white px-4 py-3">
                <h1 className="mb-4 text-2xl font-bold">Profile</h1>
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center">
                        <div className="min-w-[120px]">Your fullname:</div>
                        <div>{user?.first_name! + ' ' + user?.last_name!}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="min-w-[120px]">Email:</div>
                        {`${user?.email?.slice(0, 4)}***@${user?.email?.split('@')[1]}`}
                    </div>
                    <div className="flex items-center">
                        <div className="min-w-[120px]">Password:</div>*********
                    </div>
                    <div className="flex items-center">
                        <div className="min-w-[120px]">Linked Mobile:</div>
                        <div>123123123</div>
                    </div>
                </div>
                <div className="flex items-center gap-x-2">
                    <Button
                        variant={'ghost'}
                        className="pl-0 text-blue-700">
                        Change email address
                    </Button>
                    <Button
                        variant={'ghost'}
                        className="text-blue-700">
                        Change password
                    </Button>
                </div>
            </div>
            <div className="mb-2 bg-white px-4 py-3">
                <h1 className="mb-4 text-2xl font-bold">Favorites</h1>
            </div>
            <div className="mb-2 bg-white px-4 py-3">
                <h1 className="mb-4 text-2xl font-bold">Orders</h1>
                <div>
                    <OrderTabs
                        selectedOrderType={selectedOrderType}
                        setSelectedOrderType={setSelectedOrderType}
                    />
                </div>
            </div>
        </div>
    );
}

export default AccountPage;
