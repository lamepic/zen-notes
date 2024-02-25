'use client';

import { useAuth } from '@/lib/auth';
import { Toaster } from '@/components/ui/toaster';
import { NotesProvider } from '@/lib/NotesProvider';

import DashboardLayout from '@/components/DashboardLayout';

function Layout({ children }) {
  const { loading, user } = useAuth();

  return (
    <div className="h-screen lg:place-center">
      {loading && !user ? (
        <div className="h-full place-center">
          <p className="text-3xl text-center">Loading...</p>
        </div>
      ) : (
        <NotesProvider>
          <DashboardLayout>{children}</DashboardLayout>
          <Toaster />
        </NotesProvider>
      )}
    </div>
  );
}

export default Layout;
