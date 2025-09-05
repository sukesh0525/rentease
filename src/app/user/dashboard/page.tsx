
"use client";

import { useEffect, useState } from 'react';
import { bookings, customers, type Customer, vehicles } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Star, Wallet, CalendarCheck } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { getStatusBadge } from '@/lib/utils.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatCard } from '@/components/dashboard/stat-card';
import Link from 'next/link';
import { LoadingScreen } from '@/components/common/loader';

export default function UserDashboardPage() {
  const [user, setUser] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
        const userEmail = localStorage.getItem('loggedInUserEmail');
        if (userEmail) {
        const currentUser = customers.find(c => c.email === userEmail);
        setUser(currentUser || null);
        }
        setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="fade-in space-y-6">
        <Header title="Dashboard" />
        <Card>
          <CardContent className="p-6">
            <p>Could not find user data. Please <Link href="/login" className="underline">log in</Link> again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userBookings = bookings.filter(b => b.customerId === user.id);
  const recentUserBookings = userBookings.map(b => ({
      ...b,
      vehicle: vehicles.find(v => v.id === b.vehicleId)
  })).slice(0, 5);


  return (
    <div className="fade-in space-y-6">
      <Header title={`Welcome, ${user.name.split(' ')[0]}!`} />
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Bookings" value={user.bookingsCount.toString()} icon={<CalendarCheck className="h-5 w-5"/>} />
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
             <Link href="/user/profile" passHref>
                <Button className="w-full">View & Edit Profile</Button>
             </Link>
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
                            <TableHead>Dates</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentUserBookings.map(booking => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.vehicle?.brand} {booking.vehicle?.name}</TableCell>
                                <TableCell>{booking.startDate} to {booking.endDate}</TableCell>
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
