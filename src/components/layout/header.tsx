
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, User, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { bookings, customers, vehicles } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import type { Booking, Customer, Vehicle } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type HeaderProps = {
  title: string;
};

type PendingBooking = Booking & {
    customer: Customer | undefined;
    vehicle: Vehicle | undefined;
}

export function Header({ title }: HeaderProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [pendingBookings, setPendingBookings] = useState<PendingBooking[]>([]);

  useEffect(() => {
    const updatePendingBookings = () => {
        const pending = bookings
        .filter(b => b.status === 'Pending')
        .map(b => ({
            ...b,
            customer: customers.find(c => c.id === b.customerId),
            vehicle: vehicles.find(v => v.id === b.vehicleId),
        }));
      setPendingBookings(pending);
    }
    updatePendingBookings();

    // This is a simple way to keep the list updated. In a real app, you'd use a more robust
    // state management solution or server-sent events.
    const interval = setInterval(updatePendingBookings, 2000); 
    return () => clearInterval(interval);
  }, []);

  const handleBookingAction = (bookingId: string, newStatus: 'Confirmed' | 'Cancelled') => {
      const bookingIndex = bookings.findIndex(b => b.id === bookingId);
      if (bookingIndex !== -1) {
          bookings[bookingIndex].status = newStatus;
          toast({
              title: `Booking ${newStatus}`,
              description: `The booking request ${bookingId} has been ${newStatus.toLowerCase()}.`,
          });
          // Force a re-render by updating the state
          setPendingBookings(current => current.filter(b => b.id !== bookingId));
      }
  };


  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6 shrink-0">
      <h1 className="text-2xl font-semibold text-foreground font-headline">{title}</h1>
      <div className="flex items-center gap-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-5 w-5" />
                    {pendingBookings.length > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {pendingBookings.length}
                        </span>
                    )}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Pending Bookings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {pendingBookings.length > 0 ? (
                        pendingBookings.map(booking => (
                            <DropdownMenuItem key={booking.id} className="p-2 focus:bg-muted" onSelect={(e) => e.preventDefault()}>
                                <div className="flex flex-col w-full gap-2">
                                    <div>
                                        <p className="font-semibold text-sm">{booking.customer?.name}</p>
                                        <p className="text-xs text-muted-foreground">{booking.vehicle?.brand} {booking.vehicle?.name}</p>
                                        <p className="text-xs text-muted-foreground">{booking.startDate} to {booking.endDate}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button size="sm" variant="outline" className="h-7 px-2 text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleBookingAction(booking.id, 'Cancelled')}>
                                            <X className="h-3 w-3 mr-1"/> Decline
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-7 px-2 text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleBookingAction(booking.id, 'Confirmed')}>
                                            <Check className="h-3 w-3 mr-1"/> Approve
                                        </Button>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <p className="p-4 text-sm text-center text-muted-foreground">No pending requests.</p>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                  <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin-123@gmail.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/login')}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
