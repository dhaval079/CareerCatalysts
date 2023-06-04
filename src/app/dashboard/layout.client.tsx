'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import useAuth from '~/hooks/useAuth';
import { buttonVariants } from '~/components/ui/button';
import AuthLoader from '~/components/common/auth-loader';
import DashboardHeader from '~/components/layout/dashboard-header';
import DashboardSidebar from '~/components/layout/dashboard-sidebar';

function DecorativePattern() {
  return (
    <div
      aria-hidden="true"
      className="pattern-boxes fixed inset-0 -z-10 flex overflow-hidden pattern-bg-transparent pattern-gray-400 pattern-opacity-10 pattern-size-4 dark:pattern-gray-800"
      style={{
        maskImage: `linear-gradient(-45deg, rgb(var(--background)), transparent 70%)`,
        WebkitMaskImage: `linear-gradient(-45deg, rgb(var(--background)), transparent 70%)`,
      }}
    ></div>
  );
}

function GoToLogin() {
  return (
    <div className="grid place-items-center gap-3 md:gap-6">
      <p className="font-medium md:text-lg">
        Log in to view and manage your jobs.
      </p>
      <Link
        href="/login"
        className={twMerge(
          buttonVariants({ size: 'lg' }),
          'font-medium md:text-lg'
        )}
      >
        Login
      </Link>
    </div>
  );
}

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <div className="dashboard-grid-container min-h-screen">
        <main className="dashboard-main container grid place-content-center py-6 md:py-12">
          <AuthLoader />
        </main>
        <DecorativePattern />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="dashboard-grid-container min-h-screen">
        <main className="dashboard-main container grid place-content-center py-6 md:py-12">
          <GoToLogin />
        </main>
        <DecorativePattern />
      </div>
    );
  }

  return (
    <div className="dashboard-grid-container min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />
      <main className="dashboard-main container py-6 md:py-12">{children}</main>
      <DecorativePattern />
    </div>
  );
}
