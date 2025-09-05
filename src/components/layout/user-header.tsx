
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useEffect, useState } from 'react';
import type { Customer } from '@/lib/data';
import { customers } from '@/lib/storage';
import { ModeToggle } from '../mode-toggle';

export function UserHeader() {
  const router = useRouter();
  const [user, setUser] = useState<Customer | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);


  useEffect(() => {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    if (userEmail) {
      const currentUser = customers.find(c => c.email === userEmail);
      setUser(currentUser || null);
      if(currentUser) {
        const savedAvatar = localStorage.getItem(`avatar_${userEmail}`);
        setAvatarPreview(savedAvatar || currentUser.avatar);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserEmail');
    router.push('/login');
  };

  return (
     <header className="flex h-16 items-center justify-end border-b bg-card px-6 shrink-0">
        <div className="flex items-center gap-4">
            <ModeToggle />
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={avatarPreview || ''} alt={user?.name || ''} />
                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                    </p>
                </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                <Link href="/user/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                <Link href="/user/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  );
}
