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
        const decision = window.confirm('Are you sure you want to "log out"?');
        if (decision) {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}auth/logout`);
            router.push('/login');
        }
        return;
    };

    return (
        <main className='flex h-full flex-col-reverse xsm:flex-row'>
            <nav
                className={` flex shadow-xl xsm:h-full xsm:w-20 xsm:flex-col xsm:border-r-2 md:w-64 ${
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
                            className={`grid w-full grid-cols-5 xsm:mt-4 xsm:flex xsm:flex-1 xsm:flex-col`}
                        >
                            <li
                                className={`flex flex-col items-center justify-center gap-2 py-2.5 px-2 text-base xsm:flex-row xsm:py-4 md:justify-start md:px-8`}
                            >
                                <div className='h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl' />
                                <p className='h-3 w-full animate-pulse rounded-xl bg-gray-200 xsm:hidden xsm:h-7 xsm:w-24 md:block'></p>
                            </li>
                            <li
                                className={`flex flex-col items-center justify-center gap-2 py-2.5 px-2 text-base xsm:flex-row xsm:py-4 md:justify-start md:px-8`}
                            >
                                <div className='h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl' />
                                <p className='h-3 w-full animate-pulse rounded-xl bg-gray-200 xsm:hidden xsm:h-7 xsm:w-20 md:block'></p>
                            </li>
                            <li
                                className={`flex flex-col items-center justify-center gap-2 py-2.5 px-2 text-base xsm:flex-row xsm:py-4 md:justify-start md:px-8`}
                            >
                                <div className='h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl' />
                                <p className='h-3 w-full animate-pulse rounded-xl bg-gray-200 xsm:hidden xsm:h-7 xsm:w-28 md:block'></p>
                            </li>
                            <li
                                className={`flex flex-col items-center justify-center gap-2 py-2.5 px-2 text-base xsm:flex-row xsm:py-4 md:justify-start md:px-8`}
                            >
                                <div className='h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl' />
                                <p className='h-3 w-full animate-pulse rounded-xl bg-gray-200 xsm:hidden xsm:h-7 xsm:w-20 md:block'></p>
                            </li>
                            <li
                                className={`flex flex-col items-center justify-center gap-2 py-2.5 px-2 text-base xsm:hidden xsm:flex-row xsm:py-4 md:justify-start md:px-8`}
                            >
                                <div className='h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl' />
                                <p className='h-3 w-full animate-pulse rounded-xl bg-gray-200 xsm:hidden xsm:h-7 xsm:w-20 md:block'></p>
                            </li>
                        </ul>
                        <li
                            className={`hidden items-center justify-center gap-x-2 py-2.5 px-2 text-base xsm:flex xsm:py-4 md:justify-start md:px-8`}
                        >
                            <div className='h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl' />
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
                            className={`grid w-full grid-cols-5 xsm:mt-4 xsm:flex xsm:flex-1 xsm:flex-col`}
                        >
                            <li
                                onClick={() => {
                                    router.push('/dashboard/home');
                                }}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-y-2 gap-x-2 py-2.5 px-2 text-base hover:bg-secondary hover:bg-opacity-5 xsm:flex-row xsm:py-4  md:justify-start md:px-8 ${
                                    (pathname == '/dashboard/home' ||
                                        pathname == '/dashboard/addMoney' ||
                                        pathname == '/dashboard/withdraw') &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <CgHomeAlt className='text-4xl' />
                                <p className='text-xs font-medium xsm:hidden xsm:text-base md:block'>
                                    Dashboard
                                </p>
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/transfer');
                                }}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-y-2 gap-x-2 py-2.5 px-2 text-base hover:bg-secondary hover:bg-opacity-5 xsm:flex-row xsm:py-4  md:justify-start md:px-8 ${
                                    pathname.includes('/dashboard/transfer') &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <AiFillDollarCircle className='text-4xl' />
                                <p className='text-xs font-medium xsm:hidden xsm:text-base md:block'>
                                    Transfer
                                </p>
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/transactions');
                                }}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-y-2 gap-x-2 py-2.5 px-2 text-base hover:bg-secondary hover:bg-opacity-5 xsm:flex-row xsm:py-4  md:justify-start md:px-8 ${
                                    pathname.includes(
                                        '/dashboard/transactions'
                                    ) &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <IoReceipt className='text-4xl' />
                                <p className='text-xs font-medium xsm:hidden xsm:text-base md:block'>
                                    Transactions
                                </p>
                                {/* IoReceipt */}
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/profile');
                                }}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-y-2 gap-x-2 py-2.5 px-2 text-base hover:bg-secondary hover:bg-opacity-5 xsm:flex-row xsm:py-4  md:justify-start md:px-8 ${
                                    pathname.includes('/dashboard/profile') &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <FaUserCircle className='text-4xl' />
                                <p className='text-xs font-medium xsm:hidden xsm:text-base md:block'>
                                    Profile
                                </p>
                            </li>
                            <li
                                onClick={handleLogout}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-y-2 gap-x-2 py-2.5 px-2 text-base hover:bg-secondary hover:bg-opacity-5 xsm:hidden xsm:flex-row xsm:py-4  md:justify-start md:px-8`}
                            >
                                <IoLogOut className='text-4xl' />
                                <p className='text-xs font-medium xsm:hidden xsm:text-base md:block'>
                                    Logout
                                </p>
                            </li>
                        </ul>
                        <div
                            onClick={handleLogout}
                            className={`hidden w-full cursor-pointer items-center justify-center gap-x-2 py-4 px-2 hover:bg-secondary hover:bg-opacity-5 xsm:flex  md:justify-start md:px-8 `}
                        >
                            <IoLogOut className='text-4xl' />
                            <p className='text-xs font-medium xsm:hidden xsm:text-base md:block'>
                                Logout
                            </p>
                        </div>
                    </>
                )}
            </nav>
            <main className='h-full w-full overflow-auto scroll-smooth'>
                {loading ? null : children}
            </main>
        </main>
    );
}
