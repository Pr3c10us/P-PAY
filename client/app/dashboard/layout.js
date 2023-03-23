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
                console.log(error);
                // router.push('/login');
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
        <main className="flex h-full">
            <nav
                className={` flex h-full flex-col border-r-2 shadow-xl xsm:w-20 md:w-64 ${
                    loading ? '' : ''
                }`}
            >
                {loading ? (
                    <>
                        <div
                            className={`flex w-full justify-center py-8 px-2 md:justify-start md:px-8 `}
                        >
                            <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300"></div>
                        </div>
                        <ul className={`mt-4 flex w-full flex-1 flex-col`}>
                            <li
                                className={`flex items-center justify-center gap-x-2 py-4 px-2 text-base md:justify-start md:px-8`}
                            >
                                <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl" />
                                <p className="hidden h-7 w-24 animate-pulse rounded-xl bg-gray-200 md:block"></p>
                            </li>
                            <li
                                className={`flex items-center justify-center gap-x-2 py-4 px-2 text-base md:justify-start md:px-8`}
                            >
                                <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl" />
                                <p className="hidden h-7 w-20 animate-pulse rounded-xl bg-gray-200 md:block"></p>
                            </li>
                            <li
                                className={`flex items-center justify-center gap-x-2 py-4 px-2 text-base md:justify-start md:px-8`}
                            >
                                <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl" />
                                <p className="hidden h-7 w-28 animate-pulse rounded-xl bg-gray-200 md:block"></p>
                            </li>
                            <li
                                className={`flex items-center justify-center gap-x-2 py-4 px-2 text-base md:justify-start md:px-8`}
                            >
                                <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl" />
                                <p className="hidden h-7 w-20 animate-pulse rounded-xl bg-gray-200 md:block"></p>
                            </li>
                        </ul>
                        <li
                            className={`flex items-center justify-center gap-x-2 py-4 px-2 text-base md:justify-start md:px-8`}
                        >
                            <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-300 text-3xl" />
                            <p className="hidden h-7 w-24 animate-pulse rounded-xl bg-gray-200 md:block"></p>
                        </li>
                    </>
                ) : (
                    <>
                        <div
                            className={`flex w-full justify-center py-8 px-2 md:justify-start md:px-8 `}
                        >
                            <Link href="/" className="">
                                <Image
                                    src="/ppay-icon.svg"
                                    width={50}
                                    height={50}
                                    alt="p-pay"
                                    className="w-10 md:w-12"
                                    priority
                                ></Image>
                            </Link>
                        </div>
                        <ul className={`mt-4 flex w-full flex-1 flex-col`}>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/home');
                                }}
                                className={`relative flex cursor-pointer items-center justify-center gap-x-2 overflow-hidden py-4 px-2 text-base hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 ${
                                    (pathname == '/dashboard/home' ||
                                        pathname == '/dashboard/addMoney' ||
                                        pathname == '/dashboard/withdraw') &&
                                    'bg-secondary bg-opacity-20 '
                                }`}
                            >
                                <CgHomeAlt className="text-3xl xsm:text-4xl" />
                                <p className="hidden md:block">Dashboard</p>
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/transfer');
                                }}
                                className={`relative flex cursor-pointer items-center justify-center gap-x-2 overflow-hidden py-4 px-2 text-base hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 ${
                                    pathname.includes('/dashboard/transfer') &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <AiFillDollarCircle className="text-3xl xsm:text-4xl" />
                                <p className="hidden md:block">Transfer</p>
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/transactions');
                                }}
                                className={`relative flex cursor-pointer items-center justify-center gap-x-2 overflow-hidden py-4 px-2 text-base hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 ${
                                    pathname.includes(
                                        '/dashboard/transactions'
                                    ) &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <IoReceipt className="text-3xl xsm:text-4xl" />
                                <p className="hidden md:block">Transactions</p>
                                {/* IoReceipt */}
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/profile');
                                }}
                                className={`relative flex cursor-pointer items-center justify-center gap-x-2 overflow-hidden py-4 px-2 text-base hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 ${
                                    pathname.includes('/dashboard/profile') &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <FaUserCircle className="text-3xl xsm:text-4xl" />
                                <p className="hidden md:block">Profile</p>
                            </li>
                        </ul>
                        <div
                            onClick={handleLogout}
                            className={`text-md my-8 mx-2 flex w-full cursor-pointer items-center justify-center gap-x-2 md:mx-8  md:justify-start`}
                        >
                            <IoLogOut className="text-3xl xsm:text-4xl" />
                            <p className="hidden md:block">Logout</p>
                        </div>
                    </>
                )}
            </nav>
            <main className="min-h-full w-full overflow-auto scroll-smooth">
                {loading ? null : children}
            </main>
        </main>
    );
}
// before:absolute before:right-0 before:h-full before:w-1 before:bg-gradient-to-t before:from-white before:via-whit before:to-black before:blur-sm hover:bg-secondary hover:bg-opacity-20