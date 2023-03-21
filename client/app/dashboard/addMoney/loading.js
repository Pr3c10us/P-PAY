'use client';

export default function Loading() {
    return (
        <div className="grid h-full w-full bg-vector-pattern bg-small px-4 md:bg-big ">
            <div className="relative flex w-full max-w-4xl items-center place-self-center rounded-lg border-2 bg-neutral shadow-lg xsm:w-auto md:h-96 md:w-full">
                
                <div className=" flex h-full w-full flex-1 flex-col items-start justify-center space-y-6 py-8 px-4 md:items-start">
                    <div className="h-10 mb-4 w-28 animate-pulse rounded-md bg-gray-200"></div>
                    <h1 className="h-6 w-[70%] animate-pulse rounded-md bg-gray-100 text-2xl font-semibold xsm:h-8 lg:text-3xl"></h1>
                    <div className="flex w-full flex-col justify-center space-y-4">
                        <div className="w-full space-y-2">
                            <label
                                htmlFor="amount"
                                className="block h-4 w-[30%] animate-pulse rounded bg-gray-100 text-sm font-medium leading-6 text-gray-900 "
                            ></label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <span className="block h-10 w-full animate-pulse rounded-md border-2 py-1.5 px-7 outline-none transition-all duration-300 focus:border-secondary focus:outline-none xsm:min-w-[19rem] md:min-w-0"></span>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="h-8 w-20 animate-pulse rounded-md bg-gray-200 px-4 py-2 text-sm text-white lg:text-base" />
                        </div>
                    </div>
                </div>
                <div className="hidden h-full w-full flex-1 px-4 md:flex"></div>
            </div>
        </div>
    );
}
