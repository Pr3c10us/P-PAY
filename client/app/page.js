'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <main className="flex h-screen w-auto flex-col bg-gradient-to-r from-white to-blue-100 pb-4">
            <nav className="flex items-center justify-between py-4  px-6 sm:py-6  sm:px-8">
                <div>
                    <Image
                        width="65"
                        height="28"
                        src="./ppay.svg"
                        className="w-24"
                        alt="ppay"
                        priority
                    />
                </div>
                <div className="hidden w-full flex-1 items-center justify-center gap-6 sm:flex">
                    <Link
                        href="/support"
                        className="pb-1 hover:pb-2 transition-all duration-300 hover:border-b-2 hover:text-[#00BAF7]"
                    >
                        Support me
                    </Link>
                    <Link
                        href="/technologies"
                        className="pb-1 hover:pb-2 transition-all duration-300 hover:border-b-2 hover:text-[#00BAF7]"
                    >
                        Technologies
                    </Link>
                </div>
                <div className="hidden items-center justify-center gap-3 sm:flex">
                    <button
                        onClick={() => router.push('/login')}
                        className="rounded-lg border-2 border-black bg-white  py-1.5 px-4 transition-all duration-300  hover:-translate-y-1 hover:scale-110"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => router.push('/signup')}
                        className="rounded-lg bg-[#00BAF7] py-2 px-4 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                    >
                        Signup
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
                        className="w-full rounded-lg py-2 px-2 transition-all duration-200 hover:bg-[#00b9f712]"
                    >
                        Support me
                    </Link>
                    <Link
                        href="/technologies"
                        className="w-full rounded-lg py-2 px-2 transition-all duration-200 hover:bg-[#00b9f712]"
                    >
                        Technologies
                    </Link>
                </div>
                <hr className="w-full text-center" />
                <div className="flex w-full items-center justify-center gap-4 text-xl">
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full rounded-lg bg-black py-2.5 px-3 text-white shadow-lg transition-all duration-300 "
                    >
                        Login
                    </button>
                    <button
                        onClick={() => router.push('/signup')}
                        className="w-full rounded-lg bg-[#00BAF7] py-2.5 px-3 text-white shadow-lg transition-all duration-300"
                    >
                        Signup
                    </button>
                </div>
            </section>
            <section className="flex flex-1 flex-col items-center justify-center space-y-4 px-8 text-left sm:px-20 sm:text-center ">
                <div>
                    <h2 className="flex w-full flex-col text-4xl font-bold sm:text-5xl">
                        <span>
                            A <span className="text-[#00BAF7]">Simple</span>{' '}
                            E-wallet
                        </span>
                        <span>for everyday transaction</span>
                    </h2>
                    <p className="text-lg sm:text-2xl">
                        P-pay helps to send and receive money without
                        unnecessary features and fees, cause am lazy.
                    </p>
                </div>
                <div className="w-full">
                    <Link href="/signup">
                        <button className="rounded-lg bg-[#00BAF7] px-8 py-2 text-lg text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-110">
                            Get Started
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
// flex flex-col items-center justify-center pb-4 text-center text-sm
