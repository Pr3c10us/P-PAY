import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full scroll-smooth dark:text-black">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body className="h-full scroll-smooth bg-neutral font-bai dark:text-black">
                {children}
            </body>
        </html>
    );
}
