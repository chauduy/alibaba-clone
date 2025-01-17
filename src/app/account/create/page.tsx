import Link from 'next/link';
import { SiStarbucks } from 'react-icons/si';

function CreateAccount() {
    return (
        <div className="h-full w-full">
            <div className="border-secondary border-b-2 p-4">
                <Link
                    href={'/'}
                    target="_self">
                    <SiStarbucks className="h-12 w-12 text-primary md:h-[50px] md:w-[50px]" />
                </Link>
            </div>
            <form className="px-4 py-6">
                <h2 className="mb-8 text-center text-2xl font-extrabold text-black">
                    Sign in or create an account
                </h2>
                <div className="flex items-center text-sm font-medium text-black">
                    <span className="mr-1 text-primary">*</span>indicates required field
                </div>
                <div className="relative mt-5">
                    <label
                        htmlFor="username"
                        className="absolute left-3 top-[-11px] z-50 flex items-center bg-primary/10 px-1 text-sm font-medium text-[#868686] peer-focus:bg-primary/10">
                        <span className="mr-1 text-primary">*</span>Username or email address
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="peer absolute z-0 w-full rounded-lg border-[1px] border-[#999999] px-4 py-3 font-medium text-black outline-0 focus:border-2 focus:border-primary focus:bg-primary/10"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;
