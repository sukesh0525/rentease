
"use client";

import { useEffect, useState, useCallback } from 'react';
import { customers as initialCustomers, bookings as initialBookings, type Customer, type Booking, vehicles } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Star, Wallet, CalendarCheck } from 'lucide-react';
import { getStatusBadge } from '@/lib/utils.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatCard } from '@/components/dashboard/stat-card';
import Link from 'next/link';
import { LoadingScreen } from '@/components/common/loader';
import { useRouter } from 'next/navigation';

export default function UserDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<Customer | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    if (userEmail) {
        const storedCustomersRaw = localStorage.getItem('customers');
        const customers: Customer[] = storedCustomersRaw ? JSON.parse(storedCustomersRaw) : initialCustomers;
        const currentUser = customers.find((c: Customer) => c.email === userEmail);
        setUser(currentUser || null);

        if (currentUser) {
            const storedBookingsRaw = localStorage.getItem('bookings');
            const allBookings: Booking[] = storedBookingsRaw ? JSON.parse(storedBookingsRaw) : initialBookings;
            setUserBookings(allBookings.filter(b => b.customerId === currentUser.id));
        }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Simulate a loading delay for better UX
    const timer = setTimeout(() => {
        fetchData();
    }, 1000);
    
    window.addEventListener('storage', fetchData);

    return () => {
        clearTimeout(timer);
        window.removeEventListener('storage', fetchData);
    }
  }, [fetchData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="fade-in space-y-6">
        <Card>
          <CardContent className="p-6">
            <p>Could not find user data. Please <Link href="/login" className="underline">log in</Link> again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recentUserBookings = userBookings.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map(b => ({
      ...b,
      vehicle: vehicles.find(v => v.id === b.vehicleId)
  })).slice(0, 5);


  return (
    <div className="fade-in space-y-6">
        <h2 className="text-3xl font-bold font-headline text-foreground">Welcome, {user.name}!</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Bookings" value={userBookings.length.toString()} icon={<CalendarCheck className="h-5 w-5"/>} />
            <StatCard title="Total Spent" value={`Rs.${user.totalSpent.toLocaleString()}`} icon={<Wallet className="h-5 w-5"/>} />
            <StatCard title="Your Rating" value={user.rating.toString()} icon={<Star className="h-5 w-5"/>} />
            <StatCard title="Member Since" value={new Date(user.memberSince).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })} icon={<User className="h-5 w-5"/>} />
        </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
             <Button className="w-full" onClick={() => router.push('/user/profile')}>View & Edit Profile</Button>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline">Recent Activity</CardTitle>
                <CardDescription>Your latest bookings at a glance.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentUserBookings.map(booking => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.vehicle?.brand} {booking.vehicle?.name}</TableCell>
                                <TableCell>{booking.startDate}</TableCell>
                                <TableCell>{booking.endDate}</TableCell>
                                <TableCell>Rs.{booking.amount.toLocaleString()}</TableCell>
                                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
