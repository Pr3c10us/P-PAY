'use client';

export default function App() {
    return (
        <main className="relative grid h-full grid-cols-1 gap-4 overflow-auto bg-vector-pattern bg-small py-8 px-4 2xsm:px-8 md:bg-big">
            <form
                autoComplete="off"
                className="flex h-48 w-full max-w-xl flex-col justify-center space-y-2 place-self-center rounded-xl  border border-t-gray-200 bg-neutral px-2 pt-4 pb-4 shadow-md xsm:h-60 sm:space-y-4 sm:px-8 sm:pt-8"
            >
                <h1 className="h-6 w-20 animate-pulse rounded-xl bg-gray-100 text-2xl font-medium xsm:h-9 xsm:w-40 sm:text-3xl"></h1>
                <p className="h-4 w-full animate-pulse rounded bg-gray-100 text-[0.75rem] xsm:w-96 sm:text-base"></p>
                <div className="">
                    <input
                        className={`mb-1 max-h-10 min-h-[2.5rem] w-full animate-pulse border-b bg-inherit px-2 pt-2 text-xl lowercase tracking-widest transition duration-300 focus:outline-none sm:text-2xl`}
                    />
                </div>
                <div className="flex w-full justify-center">
                    <button
                        type="submit"
                        className="h-8 w-24 animate-pulse rounded-lg bg-gray-200 py-1.5 text-white xsm:h-11 xsm:w-32 sm:w-44 sm:py-2 sm:text-xl"
                    ></button>
                </div>
            </form>
        </main>
    );
}
// 231
// 196
