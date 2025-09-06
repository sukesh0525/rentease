
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Car,
  CalendarDays,
  LayoutGrid,
  Users,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/vehicles', label: 'Vehicles', icon: Car },
  { href: '/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/tracking', label: 'Vehicle Tracking', icon: MapPin },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
];

export function SidebarNav() {
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
