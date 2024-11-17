'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationItem = {
  id: string;
  label: string;
  href: string;
};

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export function Navigation(): JSX.Element {
  const pathname = usePathname();

  const isCurrentPathname = (href: string): boolean => {
    return pathname === href;
  };

  return (
    <nav
      aria-label="navigation"
      className="p-4 w-fit h-screen bg-gray-800 text-white"
    >
      <ul className="flex flex-col items-start justify-center gap-2">
        {navigationItems.map((item) => {
          return (
            <li key={item.id}>
              <Link
                className="aria-[current=page]:text-red-400"
                aria-current={isCurrentPathname(item.href) ? 'page' : undefined}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
