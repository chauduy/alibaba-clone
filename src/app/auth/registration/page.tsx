'use client';

import { useMemo } from 'react';

import * as Yup from 'yup';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import Select from '@/components/custom/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RegistrationForm } from '@/type';

import { yupResolver } from '@hookform/resolvers/yup';

import countries from '../../../../country.json';

const schema = Yup.object().shape({
    country_id: Yup.string().required('Country is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    phone_code: Yup.string().required('Phone code is required'),
    phone_number: Yup.string().required('Phone number is required'),
    terms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions')
});

function Registration() {
    const listCountry = useMemo(() => {
        return countries.map((item) => {
            const { countryCode, countryName, ...rest } = item;

            return {
                icon: (
                    <Image
                        src={`https://s.alicdn.com/@u/mobile/g/common/flags/1.0.0/assets/${countryCode.toLocaleLowerCase()}.png`}
                        alt="country-icon"
                        width={28}
                        height={20}
                    />
                ),
                value: countryCode,
                label: decodeURIComponent(countryName.replace(/\+/g, ' ')),
                ...rest
            };
        });
    }, [countries]);
    const form = useForm({
        defaultValues: {
            country_id: listCountry?.[0]?.value,
            email: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
            phone_code: listCountry?.[0]?.phoneCode,
            phone_number: '',
            terms: false
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = async (values: RegistrationForm) => {
        console.log('values', values);
    };

    return (
        <form
            className="flex min-h-[600px] flex-col gap-y-4 px-5 py-10 text-sm md:px-28 lg:mx-auto lg:max-w-screen-md lg:py-20"
            onSubmit={form.handleSubmit(onSubmit)}>
            <div className="registrationField">
                <label
                    htmlFor="select_country"
                    className="registrationLabel">
                    <span className="mr-1 text-red-700">*</span>Country/ Region:
                </label>
                <Select
                    options={listCountry}
                    placeholder="Select a country"
                    id="select_country"
                    defaultValue={listCountry?.[0]?.value}
                    onValueChange={(item: string) => {
                        form.setValue(
                            'phone_code',
                            listCountry.find((country) => country.value === item)?.phoneCode!
                        );
                    }}
                    {...form.register('country_id')}
                />
                {form.formState.errors.country_id && (
                    <div className="text-red-600">{form.formState.errors.country_id.message}</div>
                )}
            </div>
            <div className="registrationField">
                <label
                    htmlFor="email"
                    className="registrationLabel">
                    <span className="mr-1 text-red-700">*</span>Email:
                </label>
                <Input
                    placeholder="Your email will be set as account name"
                    id="email"
                    className="text-sm"
                    {...form.register('email')}
                />
                {form.formState.errors.email && (
                    <div className="text-red-600">{form.formState.errors.email.message}</div>
                )}
            </div>
            <div className="registrationField">
                <label
                    htmlFor="password"
                    className="registrationLabel">
                    <span className="mr-1 text-red-700">*</span>Password:
                </label>
                <Input
                    placeholder="Set the login password"
                    id="password"
                    className="text-sm"
                    type="password"
                    {...form.register('password')}
                />
                {form.formState.errors.password && (
                    <div className="text-red-600">{form.formState.errors.password.message}</div>
                )}
            </div>
            <div className="registrationField">
                <label
                    htmlFor="confirm_password"
                    className="registrationLabel">
                    <span className="mr-1 text-red-700">*</span>Confirm password
                </label>
                <Input
                    placeholder="Enter your login password again to continue"
                    id="confirm_password"
                    className="text-sm"
                    type="password"
                    {...form.register('confirm_password')}
                />
                {form.formState.errors.confirm_password && (
                    <div className="text-red-600">
                        {form.formState.errors.confirm_password.message}
                    </div>
                )}
            </div>
            <div className="registrationField">
                <label
                    htmlFor="first_name"
                    className="registrationLabel">
                    <span className="mr-1 text-red-700">*</span>Full name
                </label>
                <div className="flex items-start gap-x-2 md:w-full">
                    <div>
                        <Input
                            placeholder="Enter your first name"
                            id="first_name"
                            className="text-sm"
                            type="text"
                            {...form.register('first_name')}
                        />
                        {form.formState.errors.first_name && (
                            <div className="mt-1 text-red-600">
                                {form.formState.errors.first_name.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <Input
                            placeholder="Enter your last name"
                            id="last_name"
                            className="text-sm"
                            type="text"
                            {...form.register('last_name')}
                        />
                        {form.formState.errors.last_name && (
                            <div className="mt-1 text-red-600">
                                {form.formState.errors.last_name.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="registrationField">
                <label
                    htmlFor="phone_number"
                    className="registrationLabel">
                    <span className="mr-1 text-red-700">*</span>Tel
                </label>
                <div className="flex items-start gap-x-2 md:w-full">
                    <Input
                        placeholder="Code"
                        className="w-1/4 text-sm"
                        disabled
                        {...form.register('phone_code')}
                        defaultValue={listCountry?.[0]?.phoneCode}
                    />
                    <div>
                        <Input
                            placeholder="Enter your phone number"
                            className="text-sm"
                            type="number"
                            id="phone_number"
                            {...form.register('phone_number')}
                        />
                        {form.formState.errors.phone_number && (
                            <div className="mt-1 text-red-600">
                                {form.formState.errors.phone_number.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-start gap-x-2 md:ml-auto md:w-[68%]">
                <Checkbox
                    id="terms"
                    checked={form.watch('terms')}
                    onCheckedChange={(checked) => form.setValue('terms', !!checked)}
                    className="mt-0.5 rounded-full"
                    defaultValue={'false'}
                    {...form.register('terms')}
                />
                <div>
                    <label htmlFor="terms">
                        I agree to the{' '}
                        <span className="text-primary">Free Membership Agreement</span>
                        {', '}
                        <span className="text-primary">Terms of Use </span>and
                        <span className="text-primary"> Privacy Policy</span> of Alibaba.com. I also
                        agree to receive more information about its products and services.
                    </label>
                    {form.formState.errors.terms && (
                        <div className="mt-1 text-red-600">
                            {form.formState.errors.terms.message}
                        </div>
                    )}
                </div>
            </div>
            <div className="md:ml-auto md:w-[68%]">
                <Button
                    type="submit"
                    variant={'default'}
                    className="text-white">
                    Create an account
                </Button>
            </div>
        </form>
    );
}

export default Registration;
