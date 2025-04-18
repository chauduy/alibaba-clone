'use client';

import FavoritePreview from '@/components/FavoritePreview/page';
import InspirationList from '@/components/InspirationList/page';
import OrderPreview from '@/components/OrderPreview/page';
import ProfileInfo from '@/components/ProfileInfo/page';
import ProfileSetting from '@/components/ProfileSetting/page';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

function AccountPage() {
    const { loadingFavorite } = useAppSelector((state: RootState) => state.favorite);

    return (
        <>
            {!loadingFavorite && (
                <div className="largeScreenConstrain bg-[#f8f8f8] lg:mt-10 lg:bg-white">
                    <div className="lg:flex">
                        <div className="xl:mr-40">
                            <ProfileInfo />
                        </div>
                        <ProfileSetting />
                        <div className="lg:ml-auto">
                            <FavoritePreview />
                        </div>
                    </div>
                    <OrderPreview />
                    <InspirationList />
                </div>
            )}
        </>
    );
}

export default AccountPage;
