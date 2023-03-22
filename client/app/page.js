'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <main className="flex h-screen w-auto flex-col pb-4">
            <nav className="flex items-center justify-between py-4  px-6 sm:py-6  sm:px-8">
                <div>
                    <Image
                        width="65"
                        height="28"
                        src="/ppay.svg"
                        className="w-24"
                        alt="ppay"
                        priority
                    />
                </div>
                <div className="hidden w-full flex-1 items-center justify-center gap-6 sm:flex">
                    <Link
                        href="/support"
                        className="relative border-opacity-0 text-lg transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:border-opacity-100 hover:after:w-full"
                    >
                        Support me
                    </Link>
                    <Link
                        href="/technologies"
                        className="relative border-opacity-0 text-lg transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:border-opacity-100 hover:after:w-full"
                    >
                        Technologies
                    </Link>
                </div>
                <div className="hidden items-center justify-center gap-3 sm:flex">
                    <button
                        onClick={() => router.push('/login')}
                        className="rounded-lg bg-secondary py-2 px-6 text-neutral transition-all duration-300"
                    >
                        Login
                    </button>
                </div>
                <button
                    className="z-50 ml-auto space-y-1 sm:hidden"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <div
                        className={
                            openMenu
                                ? 'h-[3px] w-7 translate-y-[7px] rotate-45 rounded-xl bg-black transition-all duration-300'
                                : 'h-[3px] w-7 rounded-xl bg-black transition-all duration-300'
                        }
                    ></div>
                    <div
                        className={
                            openMenu
                                ? 'h-[3px] w-7 rounded-xl bg-black opacity-0 transition-all duration-300 '
                                : 'h-[3px] w-7 rounded-xl bg-black transition-all duration-300'
                        }
                    ></div>
                    <div
                        className={
                            openMenu
                                ? 'm-0 h-[3px] w-7 -translate-y-[7px] -rotate-45 rounded-xl bg-black transition-all duration-300'
                                : 'h-[3px] w-7 rounded-xl bg-black transition-all duration-300'
                        }
                    ></div>
                </button>
            </nav>
            <section
                className={
                    openMenu
                        ? 'fixed inset-0 z-40 flex flex-col gap-6 bg-white py-20 px-4 transition-all duration-500 sm:hidden'
                        : 'fixed inset-0 z-40 flex -translate-y-full flex-col gap-6 bg-white py-20 px-10 transition-all duration-500 sm:hidden'
                }
            >
                <div className="flex w-full flex-col gap-2 text-xl">
                    <Link
                        href="/support"
                        className="w-full rounded-lg py-2 px-2 transition-all duration-200 hover:bg-secondary hover:bg-opacity-10"
                    >
                        Support me
                    </Link>
                    <Link
                        href="/technologies"
                        className="w-full rounded-lg py-2 px-2 transition-all duration-200 hover:bg-secondary hover:bg-opacity-10"
                    >
                        Technologies
                    </Link>
                </div>
                <hr className="w-full text-center" />
                <div className="flex w-full items-center justify-center gap-4 text-xl">
                    <button
                        onClick={() => router.push('/login')}
                        className="w-[80%] rounded-lg bg-secondary py-2.5 px-3 text-white transition-all duration-300 "
                    >
                        Login
                    </button>
                </div>
            </section>
            <section className="grid h-full flex-1 items-center px-8 text-left md:px-20 lg:grid-cols-2 lg:pr-0 ">
                <div className="flex flex-col space-y-4 text-center lg:pl-8 lg:text-left">
                    <div>
                        <h2 className="flex w-full flex-col text-4xl font-bold text-secondary sm:text-5xl">
                            <span>A Simple E-wallet</span>
                            <span>for everyday transaction</span>
                        </h2>
                        <p className="text-lg sm:text-2xl lg:max-w-md">
                            P-pay helps to send and receive money without
                            unnecessary features and fees
                        </p>
                    </div>
                    <div className="w-full">
                        <Link href="/signup">
                            <button className="rounded-lg bg-secondary px-8 py-2 text-lg text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-110">
                                Signup
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="hidden h-full w-full items-center justify-center lg:flex">
                    {/* <Image
                        src="/wallet.jpg"
                        width={5152}
                        height={5152}
                        alt="wallet"
                        className="object-cover h-[500px]"
                        priority
                    ></Image> */}
                </div>
            </section>
        </main>
    );
}
// flex flex-col items-center justify-center pb-4 text-center text-sm
