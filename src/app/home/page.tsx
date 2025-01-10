import Image from 'next/image';
import { SiStarbucks } from 'react-icons/si';
import { IoMdMenu } from 'react-icons/io';
import { IconButton } from '@mui/material';
import Link from 'next/link';

function Login() {
    return (
        <div className="h-full w-full">
            <div className="flex items-center justify-between border-b-2 border-[#dcdcdc] p-4">
                <Link
                    href={'/'}
                    target="_self">
                    <SiStarbucks className="h-10 w-10 text-primary" />
                </Link>
                <IconButton>
                    <IoMdMenu className="h-7 w-7 text-[#00000094]" />
                </IconButton>
            </div>
            <main>
                <section className="mt-8">
                    <Image
                        src={'/images/home/home-img-01.webp'}
                        alt="home-img"
                        className="h-full w-full"
                        width={1000}
                        height={1000}
                    />
                </section>
            </main>
        </div>
    );
}

export default Login;
