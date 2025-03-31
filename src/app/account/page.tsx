import { Button } from '@/components/ui/button';

function AccountPage() {
    return (
        <div className="h-[2000px] bg-[#f8f8f8] px-4 py-3">
            <h1 className="text-2xl font-bold">Profile</h1>
            <div>
                <span>Your fullname:</span>123123123
            </div>
            <div>
                <span>Email:</span>123123123
                <span>
                    <Button
                        variant={'ghost'}
                        className="text-blue-700">
                        Change email address
                    </Button>
                </span>
            </div>
            <div>
                <span>Linked Mobile:</span>123123123
            </div>
        </div>
    );
}

export default AccountPage;
