'use client';
import { DotLoader } from 'react-spinners';

export default function App() {
    return (
        <main className="relative grid h-full grid-cols-1 gap-4 overflow-auto bg-gradient-to-r from-white to-blue-100 py-8 px-4 2xsm:px-8">
            <form
                className="flex w-auto animate-bounce flex-col items-center justify-center place-self-center rounded-full
            bg-white p-8 shadow-lg"
            ></form>
        </main>
    );
}
