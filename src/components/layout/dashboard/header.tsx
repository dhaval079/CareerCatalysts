'use client';

import { atom, useAtom } from 'jotai';
import { ChevronRightIcon, MenuIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import useGetUser from '~/hooks/api/useUser';
import { Button } from '~/components/ui/button';
import AuthActions from '~/components/common/auth-actions';
import ErrorDisplay from '~/components/common/error-display';
import LoadingIndicator from '~/components/common/loading-indicator';
import TabsThemeToggler from '~/components/common/tabs-theme-toggler';

import { isSidebarExpandedAtom } from './sidebar';

export const isMobileNavbarOpenAtom = atom(false);

export default function Header() {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useAtom(
    isMobileNavbarOpenAtom
  );
  const [isSidebarExpanded, setIsSidebarExpanded] = useAtom(
    isSidebarExpandedAtom
  );

  const { data, isLoading, isError, error } = useGetUser();

  return (
    <header
      className="dashboard-header sticky top-0 z-10 h-16 border-b"
      style={{
        backgroundImage: `radial-gradient(
        transparent 1px,
        rgb(var(--background)) 1px
  )`,
        backgroundSize: '3px 3px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div className="container flex h-full items-center justify-between gap-3">
        <button
          aria-expanded={isMobileNavbarOpen}
          aria-controls="mobile-navbar"
          className="flex items-center justify-center md:hidden"
          onClick={() => setIsMobileNavbarOpen(true)}
        >
          <span className="sr-only">Open Mobile Nav</span>
          <MenuIcon aria-hidden="true" />
        </button>
        {isLoading ? (
          <LoadingIndicator msg="Fetching user..." />
        ) : isError ? (
          <ErrorDisplay msg={error.message} />
        ) : (
          <p className="text-xl font-medium">
            Hi, <span className="text-foreground">{data.user.firstName}</span>
          </p>
        )}
        <div className="flex items-center gap-3 md:gap-6">
          <TabsThemeToggler />
          <AuthActions />
        </div>
      </div>
      <Button
        aria-expanded={isSidebarExpanded}
        aria-controls="dashboard-sidebar"
        className="absolute -left-3 top-1/2 z-50 hidden h-fit w-fit -translate-y-1/2 rounded-full p-1 md:inline-block lg:-left-4"
        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
      >
        <span className="sr-only">Toggle Sidebar</span>
        <ChevronRightIcon
          aria-hidden="true"
          className={twMerge(
            'h-4 w-4 lg:h-5 lg:w-5',
            isSidebarExpanded && 'rotate-180'
          )}
        />
      </Button>
    </header>
  );
}