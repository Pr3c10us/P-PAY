'use client';
import React, { useEffect, useState } from 'react';
import FormOne from './formOne';
import FormThree from './formThree';
import FormTwo from './formTwo';
import axios from 'axios';
import Success from './success';
import Fail from './fail';

const Transfer = () => {
    const [form, setForm] = useState(1);
    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState('');
    const [user, setUser] = useState({});
    const [pin, setPin] = useState('');
    const [errorMsg, setErrorMsg] = useState('Transfer failed');

    useEffect(() => {
        axios(`${process.env.NEXT_PUBLIC_API_URL}user/userDetails`, {
            method: 'GET',
        }).then((response) => {
            const user = response.data.user;
            setUser(user);
        });
    }, []);
    return (
        <main className="relative grid h-full grid-cols-1 gap-4 overflow-auto bg-vector-pattern bg-small py-8 px-4 2xsm:px-8 md:bg-big">
            {form === 1 && (
                <FormOne
                    setName={setName}
                    setForm={setForm}
                    setUsername={setUsername}
                    user={user}
                />
            )}
            {form === 2 && (
                <FormTwo
                    name={name}
                    user={user}
                    setForm={setForm}
                    setAmount={setAmount}
                    amount={amount}
                    setPin={setPin}
                />
            )}
            {form === 3 && (
                <FormThree
                    username={username}
                    setForm={setForm}
                    user={user}
                    name={name}
                    amount={amount}
                    pin={pin}
                    setErrorMsg={setErrorMsg}
                />
            )}
            {form == 4 && <Success />}
            {form == 5 && <Fail errorMsg={errorMsg} setForm={setForm} />}
        </main>
    );
};

export default Transfer;
