import { useState } from 'react';

import * as Yup from 'yup';
import { updateEmail, updatePassword } from 'firebase/auth';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { auth } from '@/lib/firebase';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { customToast } from '@/util';

import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface FormData {
    email?: string;
    password?: string;
}

function ProfileInfo() {
    const { user, loginMethod } = useAppSelector((state: RootState) => state.auth);
    const [isShowForm, setIsShowForm] = useState<boolean>(false);
    const [isShowEmailInput, setIsShowEmailInput] = useState<boolean>(false);
    const [isShowPasswordInput, setIsShowPasswordInput] = useState<boolean>(false);

    const form = useForm<FormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(
            Yup.object().shape({
                ...(isShowEmailInput && {
                    email: Yup.string().email('Invalid email').required('New email is required')
                }),
                ...(isShowPasswordInput && {
                    password: Yup.string().required('New password is required')
                })
            })
        ) as Resolver<FormData>
    });

    const handleSubmitChangeInfo: SubmitHandler<FormData> = async (values) => {
        if (!auth.currentUser) {
            toast.error('Please log out and log in again');
            return;
        }
        if (values?.email) {
            try {
                await updateEmail(auth.currentUser!, values.email);
                toast.success('Change email successfully', customToast('success'));
            } catch (error) {
                toast.error('Something went wrong. Please try again!', customToast('error'));
            }
        } else if (values?.password) {
            try {
                await updatePassword(auth.currentUser!, values.password);
                toast.success('Change password successfully', customToast('success'));
            } catch (error) {
                toast.error('Something went wrong. Please try again!', customToast('error'));
            }
        }
    };

    return (
        <div className="mb-2 bg-white px-4 py-3">
            <h1 className="mb-4 text-2xl font-bold">Profile</h1>
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                    <div className="min-w-[120px]">Your name:</div>
                    <div>
                        {user?.display_name
                            ? user.display_name
                            : user?.first_name! + ' ' + user?.last_name!}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="min-w-[120px]">Email:</div>
                    {`${user?.email?.slice(0, 3)}***@${user?.email?.split('@')[1]}`}
                </div>
                {loginMethod === 'account' && (
                    <div className="flex items-center">
                        <div className="min-w-[120px]">Password:</div>*********
                    </div>
                )}
                <div className="flex items-center">
                    <div className="min-w-[120px]">Linked Mobile:</div>
                    <div>
                        {user?.phone_number ? `****** ${user?.phone_number?.slice(-4)}` : 'N/A'}
                    </div>
                </div>
            </div>
            {loginMethod === 'account' && (
                <div className="mt-2 flex items-center gap-x-2">
                    <Button
                        variant={'ghost'}
                        className="pl-0 text-blue-700 focus:bg-transparent"
                        onClick={() => {
                            if (!isShowForm) {
                                setIsShowForm(true);
                            }
                            if (isShowPasswordInput) {
                                setIsShowPasswordInput(false);
                            }
                            setIsShowEmailInput(true);
                        }}>
                        Change email address
                    </Button>
                    <Button
                        variant={'ghost'}
                        className="text-blue-700 focus:bg-transparent"
                        onClick={() => {
                            if (!isShowForm) {
                                setIsShowForm(true);
                            }
                            if (isShowEmailInput) {
                                setIsShowEmailInput(false);
                            }
                            setIsShowPasswordInput(true);
                        }}>
                        Change password
                    </Button>
                </div>
            )}
            {isShowForm && (
                <form
                    className="mt-2"
                    onSubmit={form.handleSubmit(handleSubmitChangeInfo)}>
                    {isShowEmailInput && (
                        <>
                            <Input
                                placeholder="Please enter your new email"
                                id="email"
                                type="email"
                                className="text-sm"
                                {...form.register('email')}
                            />
                            {form.formState.errors.email && (
                                <div className="mt-1 text-red-600">
                                    {form.formState.errors.email.message}
                                </div>
                            )}
                        </>
                    )}
                    {isShowPasswordInput && (
                        <>
                            <Input
                                placeholder="Please enter your new password"
                                id="password"
                                type="password"
                                className="text-sm"
                                {...form.register('password')}
                            />
                            {form.formState.errors.password && (
                                <div className="mt-1 text-red-600">
                                    {form.formState.errors.password.message}
                                </div>
                            )}
                        </>
                    )}
                    <div className="mt-4 flex gap-x-2">
                        <Button
                            className="text-white"
                            type="submit">
                            Save
                        </Button>
                        <Button
                            className="border border-gray-500 bg-white text-gray-500 hover:bg-transparent"
                            onClick={() => {
                                setIsShowEmailInput(false);
                                setIsShowPasswordInput(false);
                                setIsShowForm(false);
                                form.reset();
                            }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ProfileInfo;
