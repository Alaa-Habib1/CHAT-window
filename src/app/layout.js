import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white text-black ${inter.className} font-bold`}>
        {children}
      </body>
    </html>
  );
}



