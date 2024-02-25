'use client';

import { useAuth } from '@/lib/auth';
import Providers from '@/lib/providers';

function Layout({ children }) {
  const { loading, user } = useAuth();

  return (
    <div className="h-screen lg:place-center">
      {loading && !user ? (
        <div className="h-full place-center">
          <p className="text-3xl text-center">Loading...</p>
        </div>
      ) : (
        <Providers>{children}</Providers>
      )}
    </div>
  );
}

export default Layout;
