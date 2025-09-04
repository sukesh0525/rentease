import type { ReactNode } from 'react';
import Link from 'next/link';
import { Car } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { SidebarNav } from '@/components/layout/sidebar-nav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pageTitle = "Dashboard"; // This would be dynamic in a real app
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 flex-shrink-0 border-r bg-card">
        <div className="flex h-16 items-center justify-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-primary font-headline">RentEase</h1>
          </Link>
        </div>
        <div className="mt-6">
          <SidebarNav />
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* The Header component is now page-specific */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
