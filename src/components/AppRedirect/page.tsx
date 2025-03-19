'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { storage } from '@/util';

import Loading from '../Loading/page';

//handle payment success & payment cancel page

function AppRedirect({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const pathname = usePathname();
    const path = storage.getItem('path');

    useEffect(() => {
        if (!pathname.includes('auth')) {
            if (path) {
                setLoading(true);
                storage.removeItem('path');
                router.push(path);
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [pathname, path]);

    if (loading)
        return (
            <div className="screenWrapperLoading">
                <Loading />
            </div>
        );

    return children;
}

export default AppRedirect;
