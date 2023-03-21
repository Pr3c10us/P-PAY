'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PinInput from 'react-pin-input';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import FormOne from './formOne';
import FormTwo from './formTwo';
import axios from 'axios';

const setPin = () => {
    const router = useRouter();
    const [form, setForm] = useState(1);
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [error, setError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [loading, setLoading] = useState(true);

    // const handleContinue = () => {
    //     if (!pin) {
    //         return setError('Provide 4 digits pin');
    //     }
    //     setForm(2);
    //     setError('');
    // };
    const handleEffect = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}user/isPinSet`
            );
            const pinSet = response.data.pinSet;
            if (pinSet) {
                return router.push('/dashboard/home');
            }
            setLoading(false);
        } catch (error) {
            return router.push('/login');
        }
    };
    useEffect(() => {
        handleEffect();
    }, []);

    if (loading) {
        return (
            <main className="relative grid h-full grid-cols-1 gap-4 overflow-auto py-8   px-4 2xsm:px-8">
                <div className="flex h-full w-full items-center justify-center">
                    <Image
                        priority
                        src="/ppay-icon-loading.svg"
                        width={100}
                        height={100}
                        alt="p-pay"
                        className="animate-pulse"
                    ></Image>
                </div>
            </main>
        );
    }

    return (
        <main className="relative grid h-full grid-cols-1 gap-0 overflow-hidden bg-vector-pattern bg-small py-8   px-4 2xsm:px-8 md:bg-big">
            {form === 1 && (
                <FormOne
                    form={form}
                    setForm={setForm}
                    setPin={setPin}
                    pin={pin}
                />
            )}
            {form === 2 && (
                <FormTwo
                    setPin={setPin}
                    form={form}
                    setForm={setForm}
                    pin={pin}
                />
            )}
        </main>
    );
};

export default setPin;
