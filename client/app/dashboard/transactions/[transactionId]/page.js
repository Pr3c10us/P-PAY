'use client'
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const SingleTransaction = () => {
    const pathname = usePathname();
    return <div>{pathname.split('/')[3]}</div>;
};

export default SingleTransaction;
