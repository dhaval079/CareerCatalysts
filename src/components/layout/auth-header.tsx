import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';

import AnimatedThemeTabs from '../common/animated-theme-tabs';
import { buttonVariants } from '../ui/button';

export default function AuthHeader() {
  return (
    <header className="flex h-16 items-center">
      <div className="container flex items-center justify-between gap-3 md:gap-6">
        <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
          <ChevronLeftIcon aria-hidden="true" className="mr-2 h-4 w-4" />
          <span>Back</span>
        </Link>
        <AnimatedThemeTabs />
      </div>
    </header>
  );
}