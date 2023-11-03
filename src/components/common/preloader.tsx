import Image from 'next/image';

import logo from '~/public/assets/career (1).png'

export default function Preloader() {
  return (
    <div className="pattern-isometric fixed inset-0 z-[9999] grid place-content-center overflow-hidden bg-background pattern-bg-transparent pattern-gray-400 pattern-opacity-100 pattern-size-16 dark:pattern-gray-900 dark:pattern-opacity-100">
      <Image
        src={logo}
        alt="Logo"
        priority
        width={170}
        height={170}
        className="animate-bounce"
      />
    </div>
  );
}
