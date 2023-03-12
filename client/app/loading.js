'use client';
import Image from 'next/image';

export default function App() {
    return (
        <main className="relative grid h-full grid-cols-1 gap-4 overflow-auto   py-8 px-4 2xsm:px-8">
            <div className="flex h-full w-full items-center justify-center">
                <Image
                    priority
                    src="/ppay-icon-loading.svg"
                    width={100}
                    height={100}
                    alt="p-pay"
                    className="animate-pulse"
                ></Image>
            </div>
        </main>
    );
}
