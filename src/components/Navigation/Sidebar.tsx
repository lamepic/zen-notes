import Logo from '../Logo';
import { Settings, X } from 'lucide-react';
import SidebarContent from './SidebarContent';
import ThemeToggle from '../ThemeToggle';
import AppSettings from '../AppSettings';

type PropType = {
    handleToggleSidebar: () => void;
};

function Sidebar({ handleToggleSidebar }: PropType) {
    return (
        <div className="relative space-y-3 h-full pt-3 z-50">
            <div className="space-y-8">
                <div className="flex items-center justify-between px-5">
                    <Logo />
                    <X
                        onClick={handleToggleSidebar}
                        className="cursor-pointer md:hidden"
                    />
                </div>
                <div className="px-5">
                    <AppSettings />
                </div>
            </div>
            <hr className="opacity-60" />
            <div className="h-full">
                <SidebarContent />
            </div>
        </div>
    );
}

export default Sidebar;
