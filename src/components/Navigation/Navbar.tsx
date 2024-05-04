import Link from 'next/link';
import Logo from '../Logo';
import { Button } from '../ui/button';
import ThemeToggle from '../ThemeToggle';

function Navbar() {
    return (
        <nav className="flex justify-between p-5 pt-4 lg:px-8 items-center">
            <Logo link={true} />
            <div className="flex items-center gap-2">
                <Button variant="outline" className="font-semibold">
                    <Link href="/login">Sign in</Link>
                </Button>
                <ThemeToggle />
            </div>
        </nav>
    );
}

export default Navbar;
