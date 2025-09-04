
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Car,
  LayoutGrid,
  User,
  History,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/user/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/user/vehicles', label: 'Available Vehicles', icon: Car },
  { href: '/user/bookings', label: 'My Bookings', icon: History },
  { href: '/user/tracking', label: 'Vehicle Tracking', icon: MapPin },
  { href: '/user/profile', label: 'My Profile', icon: User },
];

export function UserSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 px-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'sidebar-link flex items-center rounded-md px-4 py-3 text-gray-700 dark:text-gray-300 font-medium',
              isActive && 'active'
            )}
          >
            <Icon className="mr-3 h-6 w-6" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
