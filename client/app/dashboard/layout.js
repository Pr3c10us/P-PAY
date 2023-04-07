'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CgHomeAlt } from 'react-icons/cg';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOut, IoReceipt } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

export default function RootLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    const handleEffect = async (req, res) => {
        axios.defaults.withCredentials = true;
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}user/userDetails`)
            .then((response) => {
                const user = response.data.user;

                if (!user.emailVerified) {
                    return router.push(
                        `/emailVerification?email=${user.email}`
                    );
                }
                if (!user.twoFactorVerified) {
                    return router.push(`/twoFactor?email=${user.email}`);
                }
                if (!user.pin) {
                    return router.push(`/pin`);
                }
                setLoading(false);
            })
            .catch((error) => {
                // console.log(error);
                router.push('/login');
            });
    };
    useEffect(() => {
        handleEffect();
    }, []);

    const handleLogout = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}auth/logout`);
        router.push('/login');
    };

    return (
        <main className='flex h-full'>
            <nav
                className={`fixed left-1/2 bottom-4 z-50 flex -translate-x-1/2 overflow-hidden rounded-2xl border-2 bg-white shadow-xl  xsm:relative xsm:bottom-auto xsm:left-auto xsm:h-full xsm:w-20 xsm:translate-x-0 xsm:flex-col xsm:rounded-none xsm:border-r-2 xsm:border-none md:w-64 ${
                    loading ? '' : ''
                }`}
            >
                {loading ? (
                    <>
                        <div
                            className={`hidden w-full justify-center py-8 px-2 xsm:flex md:justify-start md:px-8 `}
                        >
                            <div className='h-12 w-12 animate-pulse rounded-lg bg-gray-300'></div>
                        </div>
                        <ul
                            className={`flex w-full xsm:mt-4 xsm:flex-1 xsm:flex-col`}
                        >
                            <li
                                className={`flex items-center justify-center gap-x-2 px-4 py-4 text-base xsm:py-4 xsm:px-2 md:justify-start md:px-8`}
                            >
                                <div className='h-6 w-6 animate-pulse rounded-lg bg-gray-300 text-3xl xsm:h-10 xsm:w-10' />
                                <p className='hidden h-7 w-24 animate-pulse rounded-xl bg-gray-200 md:block'></p>
                            </li>
                            <li
                                className={`flex items-center justify-center gap-x-2 px-4 py-4 text-base xsm:py-4 xsm:px-2 md:justify-start md:px-8`}
                            >
                                <div className='h-6 w-6 animate-pulse rounded-lg bg-gray-300 text-3xl xsm:h-10 xsm:w-10' />
                                <p className='hidden h-7 w-20 animate-pulse rounded-xl bg-gray-200 md:block'></p>
                            </li>
                            <li
                                className={`flex items-center justify-center gap-x-2 px-4 py-4 text-base xsm:py-4 xsm:px-2 md:justify-start md:px-8`}
                            >
                                <div className='h-6 w-6 animate-pulse rounded-lg bg-gray-300 text-3xl xsm:h-10 xsm:w-10' />
                                <p className='hidden h-7 w-28 animate-pulse rounded-xl bg-gray-200 md:block'></p>
                            </li>
                            <li
                                className={`flex items-center justify-center gap-x-2 px-4 py-4 text-base xsm:py-4 xsm:px-2 md:justify-start md:px-8`}
                            >
                                <div className='h-6 w-6 animate-pulse rounded-lg bg-gray-300 text-3xl xsm:h-10 xsm:w-10' />
                                <p className='hidden h-7 w-20 animate-pulse rounded-xl bg-gray-200 md:block'></p>
                            </li>
                            <li
                                className={`flex items-center justify-center gap-x-2 px-4 py-4 text-base xsm:py-4 xsm:px-2 md:justify-start md:px-8`}
                            >
                                <div className='h-6 w-6 animate-pulse rounded-lg bg-gray-300 text-3xl xsm:h-10 xsm:w-10' />
                                <p className='hidden h-7 w-20 animate-pulse rounded-xl bg-gray-200 md:block'></p>
                            </li>
                        </ul>
                        <li
                            className={`hidden items-center justify-center gap-x-2 px-4 py-4 text-base xsm:flex xsm:py-4 xsm:px-2 md:justify-start md:px-8`}
                        >
                            <div className='h-6 w-6 animate-pulse rounded-lg bg-gray-300 text-3xl xsm:h-10 xsm:w-10' />
                            <p className='hidden h-7 w-24 animate-pulse rounded-xl bg-gray-200 md:block'></p>
                        </li>
                    </>
                ) : (
                    <>
                        <div
                            className={`hidden w-full justify-center py-8 px-2 xsm:flex md:justify-start md:px-8 `}
                        >
                            <Link href='/' className=''>
                                <Image
                                    src='/ppay-icon.svg'
                                    width={50}
                                    height={50}
                                    alt='p-pay'
                                    className='w-10 md:w-12'
                                    priority
                                ></Image>
                            </Link>
                        </div>
                        <ul
                            className={`flex w-full xsm:mt-4 xsm:flex-1 xsm:flex-col`}
                        >
                            <li
                                onClick={() => {
                                    router.push('/dashboard/home');
                                }}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-x-2 px-4 pt-2 text-base hover:bg-secondary hover:bg-opacity-5 xsm:flex-row xsm:py-4 xsm:px-2  md:justify-start md:px-8 ${
                                    (pathname == '/dashboard/home' ||
                                        pathname == '/dashboard/addMoney' ||
                                        pathname == '/dashboard/withdraw') &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <CgHomeAlt className='h-6 w-6 xsm:h-10 xsm:w-10' />
                                <p className='text-[0.5rem] font-semibold xsm:hidden md:block'>
                                    Dashboard
                                </p>
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/transfer');
                                }}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-x-2 px-4 pt-2 text-base hover:bg-secondary hover:bg-opacity-5 xsm:flex-row xsm:py-4 xsm:px-2  md:justify-start md:px-8 ${
                                    pathname.includes('/dashboard/transfer') &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <AiFillDollarCircle className='h-6 w-6 xsm:h-10 xsm:w-10' />
                                <p className='text-[0.5rem] font-semibold xsm:hidden md:block'>
                                    Transfer
                                </p>
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/transactions');
                                }}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-x-2 px-4 pt-2 text-base hover:bg-secondary hover:bg-opacity-5 xsm:flex-row xsm:py-4 xsm:px-2  md:justify-start md:px-8 ${
                                    pathname.includes(
                                        '/dashboard/transactions'
                                    ) &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <IoReceipt className='h-6 w-6 xsm:h-10 xsm:w-10' />
                                <p className='text-[0.5rem] font-semibold xsm:hidden md:block'>
                                    Transactions
                                </p>
                                {/* IoReceipt */}
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/profile');
                                }}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-x-2 px-4 pt-2 text-base hover:bg-secondary hover:bg-opacity-5 xsm:flex-row xsm:py-4 xsm:px-2  md:justify-start md:px-8 ${
                                    pathname.includes('/dashboard/profile') &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <FaUserCircle className='h-6 w-6 xsm:h-10 xsm:w-10' />
                                <p className='text-[0.5rem] font-semibold xsm:hidden md:block'>
                                    Profile
                                </p>
                            </li>
                            <li
                                onClick={handleLogout}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-x-2 px-4 pt-2 text-base hover:bg-secondary hover:bg-opacity-5 xsm:flex-row xsm:py-4 xsm:px-2  md:justify-start md:px-8`}
                            >
                                <IoLogOut className='h-6 w-6 xsm:h-10 xsm:w-10' />
                                <p className='text-[0.5rem] font-semibold xsm:hidden md:block'>
                                    Logout
                                </p>
                            </li>
                        </ul>
                        <div
                            onClick={handleLogout}
                            className={`text-md hidden w-full cursor-pointer items-center justify-center gap-x-2 px-4 pt-2 hover:bg-secondary hover:bg-opacity-5 xsm:my-8 xsm:mx-2 xsm:flex xsm:py-4 xsm:py-0 xsm:px-0 md:mx-8 md:justify-start`}
                        >
                            <IoLogOut className='h-6 w-6 xsm:h-10 xsm:w-10' />
                            <p className='text-[0.5rem] font-semibold xsm:hidden md:block'>
                                Logout
                            </p>
                        </div>
                    </>
                )}
            </nav>
            <main className='mb-20 w-full overflow-auto scroll-smooth xsm:h-full'>
                {loading ? null : children}
            </main>
        </main>
    );
}
