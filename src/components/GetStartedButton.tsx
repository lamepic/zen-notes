'use client';

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

import { Button } from './ui/button';
import { createSession } from '@/lib/session';
import { useRouter } from 'next/navigation';

function GetStartedButton() {
    const router = useRouter();

    useEffect(() => {
        const session = Cookies.get('zen-note-session');
        if (session) router.replace('/dashboard');
    }, []);

    const handleGotoPage = () => {
        createSession();
        router.replace('/dashboard');
    };

    return (
        <Button className="p-7 w-44 text-lg" onClick={handleGotoPage}>
            Get Started
        </Button>
    );
}

export default GetStartedButton;
