import React from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

function AppSettings() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center justify-between w-full">
                    <p>Settings</p>
                    <Settings size={15} />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-5">
                    <div className="flex justify-between items-center">
                        <p>Change Theme</p>
                        <ThemeToggle />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AppSettings;
