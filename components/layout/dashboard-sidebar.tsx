'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import {
  BarChart3Icon,
  BriefcaseIcon,
  ChevronRightIcon,
  LogOutIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import useAuth from '@/hooks/useAuth';

import GradientLogo from '../common/gradient-logo';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { isMobileNavbarOpenAtom } from './dashboard-header';
import DashboardMobileNavbar from './dashboard-mobile-navbar';

const sidebarRoutes = [
  {
    title: 'Stats',
    path: '/dashboard',
    icon: <BarChart3Icon />,
  },
  {
    title: 'All Jobs',
    path: '/dashboard/all-jobs',
    icon: <BriefcaseIcon />,
  },
  {
    title: 'Add Job',
    path: '/dashboard/add-job',
    icon: <PlusCircleIcon />,
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: <UserCircleIcon />,
  },
];

const isSidebarExpandedAtom = atomWithStorage('bexjobs-sidebar', true);

export default function DashboardSidebar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useAtom(
    isSidebarExpandedAtom
  );
  const isMobileNavbarOpen = useAtomValue(isMobileNavbarOpenAtom);

  const { logOut } = useAuth();

  const pathname = usePathname();

  return (
    <>
      <aside
        id="dashboard-sidebar"
        className={twMerge(
          'dashboard-sidebar sticky top-0 hidden max-h-screen overflow-y-scroll overscroll-y-contain border-r pt-3 md:flex md:flex-col',
          isSidebarExpanded ? 'w-52 lg:w-60' : 'w-20'
        )}
      >
        <div
          className={twMerge(
            'flex items-center pl-4',
            !isSidebarExpanded && 'justify-center px-4'
          )}
        >
          <div className={twMerge(!isSidebarExpanded && 'hidden')}>
            <Link href="/dashboard">
              <GradientLogo />
            </Link>
          </div>
          <Button
            aria-expanded={isSidebarExpanded}
            aria-controls="dashboard-sidebar"
            size="sm"
            className={twMerge(
              'p-2',
              isSidebarExpanded && 'ml-auto rounded-lg rounded-r-none p-0'
            )}
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          >
            <span className="sr-only">Toggle Sidebar</span>
            <ChevronRightIcon
              aria-hidden="true"
              className={twMerge(isSidebarExpanded && 'rotate-180')}
            />
          </Button>
        </div>
        <ul className="my-auto flex flex-col gap-4 p-4 font-medium">
          {sidebarRoutes.map((sidebarRoute) => {
            return (
              <li
                key={sidebarRoute.title}
                className={twMerge(
                  'relative rounded-md p-2',
                  isSidebarExpanded ? 'w-full' : 'w-fit'
                )}
              >
                {pathname === sidebarRoute.path && (
                  <motion.div
                    aria-hidden="true"
                    layout="position"
                    layoutId="dashboard-sidebar-link"
                    className="absolute inset-0 rounded-md bg-accent"
                    transition={{
                      layout: { type: 'spring', duration: 0.5 },
                    }}
                  />
                )}
                <Link
                  href={sidebarRoute.path}
                  className="group relative z-10 flex items-center gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-linear group-hover:rotate-12"
                  >
                    {sidebarRoute.icon}
                  </span>
                  <span className={twMerge(!isSidebarExpanded && 'hidden')}>
                    {sidebarRoute.title}
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="space-y-4">
            <Separator />
            <button
              className={twMerge(
                'group flex items-center gap-3 rounded-md p-2 transition-colors duration-300 ease-linear hover:bg-accent/50',
                isSidebarExpanded ? 'w-full' : 'w-fit'
              )}
              onClick={() => logOut()}
            >
              <LogOutIcon
                aria-hidden="true"
                className="transition-transform duration-300 ease-linear group-hover:rotate-12"
              />
              <span className={twMerge(!isSidebarExpanded && 'hidden')}>
                Logout
              </span>
            </button>
          </li>
        </ul>
      </aside>
      {isMobileNavbarOpen && <DashboardMobileNavbar />}
    </>
  );
}
