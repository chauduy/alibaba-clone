'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { storage } from '@/util';

import Loading from '../Loading/page';

function AppRedirect({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAppSelector((state: RootState) => state.auth);
    const router = useRouter();
    const path = storage.getItem('path');

    useEffect(() => {
        const handleRedirect = () => {
            if (!pathname.includes('auth')) {
                if (path) {
                    setLoading(true);
                    storage.removeItem('path');
                    router.push(path);
                } else {
                    setLoading(false);
                }
            } else {
                if (user) {
                    router.back();
                } else {
                    setLoading(false);
                }
            }
        };

        handleRedirect();
    }, [pathname, path, user]);

    if (loading)
        return (
            <div className="screenWrapperLoading">
                <Loading />
            </div>
        );

    return children;
}

export default AppRedirect;
