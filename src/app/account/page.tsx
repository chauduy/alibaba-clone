'use client';

import FavoritePreview from '@/components/FavoritePreview/page';
import InspirationList from '@/components/InspirationList/page';
import OrderPreview from '@/components/OrderPreview/page';
import ProfileInfo from '@/components/ProfileInfo/page';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

function AccountPage() {
    const { loadingFavorite } = useAppSelector((state: RootState) => state.favorite);

    return (
        <>
            {!loadingFavorite && (
                <div className="largeScreenConstrain bg-[#f8f8f8] lg:mt-20">
                    <ProfileInfo />
                    <FavoritePreview />
                    <OrderPreview />
                    <InspirationList />
                </div>
            )}
        </>
    );
}

export default AccountPage;
