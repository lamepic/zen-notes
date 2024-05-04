import { cn } from '@/lib/utils';
import { Chewy } from 'next/font/google';

const bangers = Chewy({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
});

function Logo() {
    return (
        <h1 className={cn('text-3xl lg:text-4xl font-bold', bangers.className)}>
            Zen Notes
        </h1>
    );
}

export default Logo;
