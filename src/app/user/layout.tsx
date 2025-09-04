
import type { ReactNode } from 'react';
import Link from 'next/link';
import { UserSidebarNav } from '@/components/layout/user-sidebar-nav';
import { UserHeader } from '@/components/layout/user-header';

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 flex-shrink-0 border-r bg-card">
        <div className="flex h-16 items-center justify-center border-b px-6">
          <Link href="/user/dashboard" className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-primary font-headline">RentEase</h1>
          </Link>
        </div>
        <div className="mt-6">
          <UserSidebarNav />
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <UserHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
