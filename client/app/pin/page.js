'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PinInput from 'react-pin-input';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import FormOne from './formOne';
import FormTwo from './formTwo';

const setPin = () => {
    const [form, setForm] = useState(1);
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [error, setError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const handleContinue = () => {
        if (!pin) {
            return setError('Provide 4 digits pin');
        }
        setForm(2);
        setError('');
    };

    return (
        <main className="relative grid h-full grid-cols-1 gap-0 overflow-hidden   py-8 px-4 2xsm:px-8">
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
