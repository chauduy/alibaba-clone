'use client';

import React from 'react';

import * as Yup from 'yup';
import { signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaFacebookF } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

import ButtonLoading from '@/components/ButtonLoading/page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth, provider } from '@/lib/firebase';
import { setLoginMethod, setUser } from '@/redux/feature/auth/authSlice';
import { signIn } from '@/redux/feature/auth/authThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
});

interface AuthState {
    email: string;
    password: string;
}

function Login() {
    const { loading } = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const form = useForm({
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    const handleSubmitForm = async (values: AuthState) => {
        try {
            const result = await dispatch(
                signIn({ email: values.email, password: values.password })
            );
            if (signIn.fulfilled.match(result)) {
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const userResponse = result.user;
            const user = {
                display_name: userResponse.displayName,
                email: userResponse.email,
                phone_number: userResponse.phoneNumber,
                token: await userResponse.getIdToken(),
                uid: userResponse.uid
            };
            dispatch(setLoginMethod('google'));
            dispatch(setUser({ user }));
            router.push('/');
        } catch (error) {
            toast.error('Something went wrong');
            console.error('Google Sign-In Error:', error);
        }
    };

    return (
        <form
            className="min-h-[600px] w-full px-5 pb-6 pt-14 text-sm md:mx-auto md:min-h-[800px] md:w-1/2 lg:flex lg:min-h-[600px] lg:w-full lg:bg-[url(/images/bg-login.avif)] lg:bg-no-repeat 3xl:justify-end"
            onSubmit={form.handleSubmit(handleSubmitForm)}>
            <div className="lg:ml-10 lg:h-fit lg:w-[400px] lg:bg-white lg:px-5 lg:py-8 3xl:ml-0 3xl:mr-[15%]">
                <label
                    className="font-bold"
                    htmlFor="email">
                    Account:
                </label>
                <Input
                    className="mt-1 text-sm focus-within:border-primary focus-visible:ring-0"
                    id="email"
                    placeholder="Enter your email or member ID"
                    {...form.register('email')}
                />
                {form.formState.errors.email && (
                    <div className="mt-1 text-red-600">{form.formState.errors.email.message}</div>
                )}
                <div className="mt-4">
                    <label
                        className="font-bold"
                        htmlFor="password">
                        Password:
                    </label>
                </div>
                <Input
                    className="mt-1 text-sm focus-within:border-primary focus-visible:ring-0"
                    id="password"
                    type="password"
                    placeholder="Enter your email or member ID"
                    {...form.register('password')}
                />
                {form.formState.errors.password && (
                    <div className="mt-1 text-red-600">
                        {form.formState.errors.password.message}
                    </div>
                )}
                <Button
                    type="submit"
                    variant={'default'}
                    className="mt-6 w-full text-white">
                    {loading ? <ButtonLoading /> : 'Sign in'}
                </Button>
                <div className="mt-6 text-center text-xs text-[#999999]">Or sign in with</div>
                <div className="mt-4 flex items-center justify-center">
                    <div
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white shadow-2xl"
                        onClick={handleGoogleSignIn}>
                        <FcGoogle className="h-6 w-6 text-white" />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center text-center">
                    <div className="text-[#999999]">
                        {`Don't have an account?`}{' '}
                        <Link
                            href={'/auth/registration'}
                            target="_self"
                            className="text-primary">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;
