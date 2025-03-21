'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Loading from '@/components/Loading/page';
import { storage } from '@/util';

function PaymentLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isValidURL =
        searchParams.get('code') !== null && searchParams.get('code') === storage.getItem('code');

    if (!isValidURL) {
        router.back();
        return (
            <div className="screenWrapperLoading">
                <Loading />
            </div>
        );
    }

    return children;
}

export default PaymentLayout;
