import { SWRConfig } from 'swr';
import { NotesProvider } from './NotesProvider';
import DashboardLayout from '@/components/DashboardLayout';
import { Toaster } from '@/components/ui/toaster';
import { swrOptions } from './configs';

function Providers({ children }) {
  return (
    <SWRConfig value={swrOptions}>
      <NotesProvider>
        <DashboardLayout>{children}</DashboardLayout>
        <Toaster />
      </NotesProvider>
    </SWRConfig>
  );
}

export default Providers;
