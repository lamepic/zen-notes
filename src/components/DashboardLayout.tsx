'use client';

import React, { useState } from 'react';
import TopNav from './Navigation/TopNav';
import { cn } from '@/lib/utils';
import Sidebar from './Navigation/Sidebar';
import { useNote } from '@/providers/NoteProvider';
import EmptyDashboard from './EmptyDashboard';

type PropType = {
    children: React.ReactNode;
};

function DashboardLayout({ children }: PropType) {
    const [full, setFull] = useState<boolean>(true);
    const { selectedNote } = useNote();
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);

    const handleToggleContentWidth = () => {
        setFull(!full);
    };

    const handleToggleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    return (
        <div className="h-screen relative md:flex overflow-hidden">
            <div
                className={cn(
                    'absolute top-0 left-0 w-full h-full md:relative md:block md:border-r md:flex-[0.4] lg:flex-[0.25] transition-all ease duration-300 z-50',
                    openSidebar
                        ? 'translate-x-100'
                        : '-translate-x-full md:translate-x-0'
                )}
            >
                <Sidebar handleToggleSidebar={handleToggleSidebar} />
            </div>
            <div
                className={cn(
                    'md:flex-1 space-y-6 h-full py-3 transition-opacity ease duration-500',
                    openSidebar ? 'opacity-0' : 'opacity-100'
                )}
            >
                <div
                    className={cn(
                        'h-full px-5 md:px-10 py-3 space-y-5 transition-all duration-200 ease-in-out',
                        full ? 'w-full border-r-0' : 'md:w-9/12 border-r'
                    )}
                >
                    <TopNav
                        handleToggleSidebar={handleToggleSidebar}
                        handleToggleContentWidth={handleToggleContentWidth}
                    />
                    {selectedNote ? <>{children}</> : <EmptyDashboard />}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
