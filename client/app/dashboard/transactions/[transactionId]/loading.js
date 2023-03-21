import React from 'react';

const Loading = () => {
    return (
        <main className="grid h-full w-full grid-cols-1 bg-vector-pattern bg-small py-12 px-4 md:bg-big">
            <div className="flex w-full max-w-md flex-col items-center justify-center space-y-8 place-self-center rounded-xl border bg-neutral p-8  shadow-xl">
                <div className="flex w-full flex-col items-center justify-center space-y-4">
                    <div className="h-4 w-28 animate-pulse rounded-lg bg-gray-100 xsm:h-6 xsm:w-40 xsm:text-xl"></div>
                    <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200 xsm:h-16 xsm:w-16"></div>
                    <div
                        className={`h-4 w-24 animate-pulse rounded-lg bg-gray-100 font-semibold xsm:h-6 xsm:w-32 xsm:text-xl`}
                    ></div>
                </div>

                <div className="flex w-full flex-col items-center justify-center">
                    <div className="flex w-full items-center justify-between border-b py-6 text-sm xsm:text-base">
                        <h2 className="h-4 w-16 animate-pulse rounded-lg bg-gray-100 xsm:h-6 xsm:w-24"></h2>
                        <div className="flex h-4 w-32 animate-pulse flex-col items-end rounded-lg bg-gray-100 text-sm font-medium text-gray-500 xsm:h-6 xsm:w-44"></div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-6 text-sm xsm:text-base">
                        <h2 className="h-4 w-16 animate-pulse rounded-lg bg-gray-100 xsm:h-6 xsm:w-24"></h2>
                        <div className="flex h-4 w-32 animate-pulse flex-col items-end rounded-lg bg-gray-100 text-sm font-medium text-gray-500 xsm:h-6 xsm:w-44"></div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-6 text-sm xsm:text-base">
                        <h2 className="h-4 w-16 animate-pulse rounded-lg bg-gray-100 xsm:h-6 xsm:w-24"></h2>
                        <div className="flex h-4 w-32 animate-pulse flex-col items-end rounded-lg bg-gray-100 text-sm font-medium text-gray-500 xsm:h-6 xsm:w-44"></div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-6 text-sm xsm:text-base">
                        <h2 className="h-4 w-16 animate-pulse rounded-lg bg-gray-100 xsm:h-6 xsm:w-24"></h2>
                        <div className="flex h-4 w-32 animate-pulse flex-col items-end rounded-lg bg-gray-100 text-sm font-medium text-gray-500 xsm:h-6 xsm:w-44"></div>
                    </div>
                </div>
                <div>
                    <button className="h-6 w-16 animate-pulse rounded-lg bg-gray-200 text-sm text-white xsm:h-8 xsm:w-20 xsm:py-2 xsm:px-6"></button>
                </div>
            </div>
        </main>
    );
};

export default Loading;
