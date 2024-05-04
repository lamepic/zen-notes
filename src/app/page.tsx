import { Archivo_Black } from 'next/font/google';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navigation/Navbar';
import { cn } from '@/lib/utils';
import GetStartedButton from '@/components/GetStartedButton';

const bangers = Archivo_Black({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400'],
});

export default function Home() {
    return (
        <main className="h-screen flex flex-col">
            <Navbar />
            <div className="h-[calc(100vh - 10vh)] my-auto max-w-xl flex flex-col items-center space-y-5 mx-auto">
                <h1
                    className={cn(
                        'capitalize text-center text-5xl lg:text-6xl font-black lg:tracking-wider',
                        bangers.className
                    )}
                >
                    A minimal note taking app
                </h1>
                <p className="text-xl lg:text-2xl">
                    Take note minus the distractions
                </p>
                <GetStartedButton />
            </div>
            <Footer />
        </main>
    );
}
