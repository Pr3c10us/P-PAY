'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CgHomeAlt } from 'react-icons/cg';
import { AiFillSetting, AiFillDollarCircle } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { BsBarChartLineFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';
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
        <main className="flex h-full">
            <nav
                className={` flex h-full w-20 flex-col md:w-64 ${
                    loading ? '' : ''
                }`}
            >
                {loading ? (
                    <>
                        <div
                            className={`flex w-full justify-center py-8 px-2 md:justify-start md:px-8 `}
                        >
                            <div className="h-12 w-12 rounded-lg animate-pulse bg-gray-200"></div>
                        </div>
                        <ul className={`mt-4 flex w-full flex-1 flex-col`}>
                            <li
                                className={`text-md flex cursor-pointer items-center justify-center gap-x-2 py-4 px-2 hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 `}
                            >
                                <div className="h-7 w-7 animate-pulse bg-gray-200 rounded-lg text-3xl" />
                                <p className="hidden h-7 w-24 animate-pulse rounded-xl bg-gray-200 md:block"></p>
                            </li>
                            <li
                                className={`text-md flex cursor-pointer items-center justify-center gap-x-2 py-4 px-2 hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 `}
                            >
                                <div className="h-7 w-7 animate-pulse bg-gray-200 rounded-lg text-3xl" />
                                <p className="hidden h-7 w-20 animate-pulse rounded-xl bg-gray-200 md:block"></p>
                            </li>
                            <li
                                className={`text-md flex cursor-pointer items-center justify-center gap-x-2 py-4 px-2 hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 `}
                            >
                                <div className="h-7 w-7 animate-pulse bg-gray-200 rounded-lg text-3xl" />
                                <p className="hidden h-7 w-28 animate-pulse rounded-xl bg-gray-200 md:block"></p>
                            </li>
                            <li
                                className={`text-md flex cursor-pointer items-center justify-center gap-x-2 py-4 px-2 hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 `}
                            >
                                <div className="h-7 w-7 animate-pulse bg-gray-200 rounded-lg text-3xl" />
                                <p className="hidden h-7 w-20 animate-pulse rounded-xl bg-gray-200 md:block"></p>
                            </li>
                        </ul>
                        <li
                            className={`text-md flex cursor-pointer items-center justify-center gap-x-2 py-4 px-2 hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 `}
                        >
                            <div className="h-7 w-7 animate-pulse bg-gray-200 rounded-lg text-3xl" />
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
                                    router.push('/dashboard/');
                                }}
                                className={`text-md flex cursor-pointer items-center justify-center gap-x-2 py-4 px-2 hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 ${
                                    pathname == '/dashboard' &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <CgHomeAlt className="text-3xl" />
                                <p className="hidden md:block">Dashboard</p>
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/transfer');
                                }}
                                className={`text-md flex cursor-pointer items-center justify-center gap-x-2 py-4 px-2 hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 ${
                                    pathname == '/dashboard/transfer' &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <AiFillDollarCircle className="text-3xl" />
                                <p className="hidden md:block">Transfer</p>
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/transactions');
                                }}
                                className={`text-md flex cursor-pointer items-center justify-center gap-x-2 py-4 px-2 hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 ${
                                    pathname == '/dashboard/transactions' &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <BsBarChartLineFill className="text-3xl" />
                                <p className="hidden md:block">Transactions</p>
                            </li>
                            <li
                                onClick={() => {
                                    router.push('/dashboard/settings');
                                }}
                                className={`text-md flex cursor-pointer items-center justify-center gap-x-2 py-4 px-2 hover:bg-secondary hover:bg-opacity-5  md:justify-start md:px-8 ${
                                    pathname == '/dashboard/settings' &&
                                    'bg-secondary bg-opacity-20 hover:bg-secondary hover:bg-opacity-20'
                                }`}
                            >
                                <FaUserCircle className="text-3xl" />
                                <p className="hidden md:block">Profile</p>
                            </li>
                        </ul>
                        <div
                            onClick={handleLogout}
                            className={`text-md my-8 mx-2 flex w-full cursor-pointer items-center justify-center gap-x-2 md:mx-8  md:justify-start`}
                        >
                            <IoLogOut className="text-3xl" />
                            <p className="hidden md:block">Logout</p>
                        </div>
                    </>
                )}
            </nav>
            <main className="h-full w-full overflow-auto">
                {loading ? (
                    <div className="flex h-full w-full items-center justify-center">
                        <Image
                            src="/ppay-icon-loading.svg"
                            width={100}
                            height={100}
                            alt="p-pay"
                            className="animate-pulse"
                            priority
                        ></Image>
                    </div>
                ) : (
                    children
                )}
            </main>
        </main>
    );
}
