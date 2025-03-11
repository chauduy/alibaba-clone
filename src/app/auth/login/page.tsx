import React from 'react';

import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function Login() {
    return (
        <div className="min-h-[600px] w-full px-5 pb-6 pt-14 text-sm md:mx-auto md:min-h-[800px] md:w-1/2 lg:flex lg:min-h-[600px] lg:w-full lg:bg-[url(/images/bg-login.avif)] lg:bg-no-repeat 2xl:justify-end">
            <div className="lg:ml-10 lg:h-fit lg:w-[400px] lg:bg-white lg:px-5 lg:py-8 xl:mr-[15%] 2xl:ml-0">
                <label
                    className="font-bold"
                    htmlFor="user_name">
                    Account:
                </label>
                <Input
                    className="mt-1 text-sm focus-within:border-primary focus-visible:ring-0"
                    name="user_name"
                    id="user_name"
                    placeholder="Enter your email or member ID"
                />
                <div className="mt-4 flex items-center justify-between">
                    <label
                        className="font-bold"
                        htmlFor="password">
                        Password:
                    </label>
                    <Link
                        href="/auth/forget-password"
                        target="_self"
                        className="text-xs text-[#08c]">
                        Forgot password?
                    </Link>
                </div>
                <Input
                    className="mt-1 text-sm focus-within:border-primary focus-visible:ring-0"
                    name="password"
                    id="password"
                    placeholder="Enter your email or member ID"
                />
                <Button
                    variant={'default'}
                    className="mt-6 w-full text-white">
                    Sign in
                </Button>
                <div className="mt-6 text-center text-xs text-[#999999]">Or sign in with</div>
                <div className="mt-4 flex items-center justify-between px-10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white shadow-2xl">
                        <FcGoogle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800">
                        <FaFacebookF className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0076b8]">
                        <FaLinkedinIn className="h-6 w-6 text-white" />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center text-center">
                    <div className="text-[#999999]">
                        Don't have an account?{' '}
                        <Link
                            href={'/auth/registration'}
                            target="_self"
                            className="text-primary">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
