import Link from 'next/link';
import { Chewy } from 'next/font/google';
import { cn } from '@/lib/utils';

const bangers = Chewy({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

function Logo({ link }) {
  return (
    <h1>
      <Link href={link ? '/' : ''} className={cn('text-2xl lg:text-3xl font-bold', bangers.className)}>
        Zen Notes
      </Link>
    </h1>
  );
}

export default Logo;
