'use client';
import { AiOutlineCaretDown } from 'react-icons/ai';

export default function Loading() {
    return (
        <main className="flex h-full flex-col items-center scroll-smooth px-4 py-8 xl:flex-row xl:items-start xl:justify-center xl:gap-x-8">
            <div id="top" className="h-0 w-0"></div>
            <div className="top-24 flex w-full flex-col space-y-4 xl:sticky xl:max-w-sm">
                <h1 className=" h-4 w-20 max-w-xl animate-pulse rounded-md bg-gray-100 text-left text-lg xsm:h-6 xsm:w-28 xsm:text-2xl xl:max-w-sm"></h1>
                <section className="mt-2 mb-8 flex w-full max-w-xl items-center justify-between gap-x-4 gap-y-8 rounded-xl px-6  md:justify-around xl:h-min xl:max-w-sm xl:flex-col xl:items-start xl:justify-start">
                    <div className="relative w-full space-y-2">
                        <h3 className="h-4 w-[80%]  animate-pulse rounded-md bg-gray-100 xsm:w-40"></h3>
                        <button
                            className={`flex w-full animate-pulse items-center justify-between rounded-md border-2 bg-neutral py-1 px-2 capitalize transition-all duration-300 xsm:h-11 xsm:py-1.5 xsm:text-lg   md:text-xl`}
                        >
                            <span className="h-6 w-[60%] rounded-md bg-gray-100"></span>
                            <AiOutlineCaretDown
                                className={`text-sm text-gray-300 transition-all duration-300 `}
                            />
                        </button>
                    </div>
                    <div className="relative w-full space-y-2">
                        <h3 className="h-4 w-[80%]  animate-pulse rounded-md bg-gray-100 xsm:w-40"></h3>
                        <button
                            className={`flex w-full animate-pulse items-center justify-between rounded-md border-2 bg-neutral py-1 px-2 capitalize transition-all duration-300 xsm:h-11 xsm:py-1.5 xsm:text-lg   md:text-xl`}
                        >
                            <span className="h-6 w-[60%] rounded-md bg-gray-100"></span>
                            <AiOutlineCaretDown
                                className={`text-sm text-gray-300 transition-all duration-300 `}
                            />
                        </button>
                    </div>
                </section>
            </div>
            <section
                className={`m-4 flex w-full max-w-2xl flex-col space-y-4 rounded-xl xl:mt-16`}
            >
                <h1 className="xsm:h-10 h-8 w-40 animate-pulse rounded-lg bg-gray-100 text-xl font-semibold xsm:w-60 xsm:text-3xl"></h1>
                <div className="flex w-full flex-col items-center space-y-4 ">
                    <div className="] w-full max-w-2xl space-y-2 p-1 xsm:p-4">
                        <h2 className="h-4 w-32 animate-pulse rounded bg-gray-100 text-gray-400"></h2>
                        <div
                            className={`flex w-full flex-col items-center overflow-auto px-2 xsm:px-5 `}
                        >
                            <div className="my-2 flex h-20 w-full animate-pulse cursor-pointer items-center gap-x-2 rounded-lg border bg-gray-200 px-4 py-4 shadow-sm hover:bg-secondary hover:bg-opacity-10 xsm:gap-x-4"></div>
                            <div className="my-2 flex h-20 w-full animate-pulse cursor-pointer items-center gap-x-2 rounded-lg border bg-gray-200 px-4 py-4 shadow-sm hover:bg-secondary hover:bg-opacity-10 xsm:gap-x-4"></div>
                            <div className="my-2 flex h-20 w-full animate-pulse cursor-pointer items-center gap-x-2 rounded-lg border bg-gray-200 px-4 py-4 shadow-sm hover:bg-secondary hover:bg-opacity-10 xsm:gap-x-4"></div>
                        </div>
                    </div>
                    <div className="] w-full max-w-2xl space-y-2 p-1 xsm:p-4">
                        <h2 className="h-4 w-32 animate-pulse rounded bg-gray-100 text-gray-400"></h2>
                        <div
                            className={`flex w-full flex-col items-center overflow-auto px-2 xsm:px-5 `}
                        >
                            <div className="my-2 flex h-20 w-full animate-pulse cursor-pointer items-center gap-x-2 rounded-lg border bg-gray-200 px-4 py-4 shadow-sm hover:bg-secondary hover:bg-opacity-10 xsm:gap-x-4"></div>
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
    );
}
