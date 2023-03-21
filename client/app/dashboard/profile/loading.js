'use client';

export default function App() {
    return (
        <main className="flex flex-col items-center gap-y-8 py-12 px-8">
            <form className="relative h-full w-full max-w-4xl space-y-4 overflow-hidden rounded-lg border-2 pt-4">
                <div className="mx-4 space-y-2">
                    <h1 className="h-5 w-[40%] animate-pulse rounded-md bg-gray-100 text-xl font-semibold xsm:h-6 xsm:w-40"></h1>
                    <p className="h-3 w-[70%] animate-pulse rounded bg-gray-100 text-sm font-medium text-gray-400 xsm:h-4 xsm:w-64"></p>
                </div>
                <ul className="mx-4">
                    <li className="mb-4 grid gap-4 sm:grid-cols-2">
                        <div className="flex w-full flex-col space-y-2">
                            <label
                                className="h-4 w-[40%] animate-pulse rounded bg-gray-100 font-semibold xsm:h-5 xsm:w-28"
                                htmlFor="firstname"
                            ></label>
                            <span className="block h-10 w-full animate-pulse appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2 " />
                        </div>
                        <div className="flex w-full flex-col space-y-2">
                            <label
                                className="h-4 w-[40%] animate-pulse rounded bg-gray-100 font-semibold xsm:h-5 xsm:w-28"
                                htmlFor="firstname"
                            ></label>
                            <span className="block h-10 w-full animate-pulse appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2 " />
                        </div>
                    </li>
                    <li className="grid gap-4 sm:grid-cols-2">
                        <div className="flex w-full flex-col space-y-2">
                            <label
                                className="h-4 w-[40%] animate-pulse rounded bg-gray-100 font-semibold xsm:h-5 xsm:w-28"
                                htmlFor="firstname"
                            ></label>
                            <span className="block h-10 w-full animate-pulse appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2 " />
                        </div>
                        <div className="hidden sm:block"></div>
                    </li>
                </ul>

                <div className="relative flex w-full justify-end bg-secondary bg-opacity-[0.03] px-4 py-2.5">
                    <button
                        type="submit"
                        className={`h-10 w-16 animate-pulse rounded-lg bg-gray-200 px-4 py-2 text-white`}
                    ></button>
                </div>
            </form>
            <form className="relative h-full w-full max-w-4xl space-y-4 overflow-hidden rounded-lg border-2 pt-4">
                <div className="mx-4">
                    <h1 className="h-5 w-[60%] animate-pulse rounded-md bg-gray-100 text-xl font-semibold xsm:h-6 xsm:w-40"></h1>
                </div>
                <ul className="flex w-full flex-col items-center px-4">
                    <li className="relative mb-4 flex w-full max-w-md flex-col justify-center space-y-2">
                        <label
                            className="h-4 w-[40%] animate-pulse rounded bg-gray-100 font-semibold xsm:h-5 xsm:w-28"
                            htmlFor="firstname"
                        ></label>
                        <span className="block h-10 w-full animate-pulse appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2 " />
                    </li>
                    <li className="relative mb-4 flex w-full max-w-md flex-col justify-center space-y-2">
                        <label
                            className="h-4 w-[40%] animate-pulse rounded bg-gray-100 font-semibold xsm:h-5 xsm:w-28"
                            htmlFor="firstname"
                        ></label>
                        <span className="block h-10 w-full animate-pulse appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2 " />
                    </li>
                    <li className="relative mb-4 flex w-full max-w-md flex-col justify-center space-y-2">
                        <label
                            className="h-4 w-[40%] animate-pulse rounded bg-gray-100 font-semibold xsm:h-5 xsm:w-28"
                            htmlFor="firstname"
                        ></label>
                        <span className="block h-10 w-full animate-pulse appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2 " />
                    </li>
                </ul>

                <div className="relative flex w-full justify-end bg-secondary bg-opacity-[0.03] px-4 py-2.5">
                    <button
                        type="submit"
                        className={`h-10 w-16 animate-pulse rounded-lg bg-gray-200 px-4 py-2 text-white`}
                    ></button>
                </div>
            </form>
            <form className="relative h-full w-full max-w-4xl space-y-4 overflow-hidden rounded-lg border-2 pt-4">
                <div className="mx-4">
                    <h1 className="h-5 w-[60%] animate-pulse rounded-md bg-gray-100 text-xl font-semibold xsm:h-6 xsm:w-40"></h1>
                </div>
                <ul className="flex w-full flex-col items-center px-4">
                    <li className="relative mb-4 flex w-full max-w-md flex-col justify-center space-y-2">
                        <label
                            className="h-4 w-[40%] animate-pulse rounded bg-gray-100 font-semibold xsm:h-5 xsm:w-28"
                            htmlFor="firstname"
                        ></label>
                        <span className="block h-10 w-full animate-pulse appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2 " />
                    </li>
                    <li className="relative mb-4 flex w-full max-w-md flex-col justify-center space-y-2">
                        <label
                            className="h-4 w-[40%] animate-pulse rounded bg-gray-100 font-semibold xsm:h-5 xsm:w-28"
                            htmlFor="firstname"
                        ></label>
                        <span className="block h-10 w-full animate-pulse appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2 " />
                    </li>
                </ul>

                <div className="relative flex w-full justify-end bg-secondary bg-opacity-[0.03] px-4 py-2.5">
                    <button
                        type="submit"
                        className={`h-10 w-16 animate-pulse rounded-lg bg-gray-200 px-4 py-2 text-white`}
                    ></button>
                </div>
            </form>
            {/* <EditProfile />

            <ChangePassword />
            <ChangePin /> */}
        </main>
    );
}
