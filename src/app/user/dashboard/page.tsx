import { bookings, customers, vehicles } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Star, Wallet, CalendarCheck } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { getStatusBadge } from '@/lib/utils.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatCard } from '@/components/dashboard/stat-card';
import Link from 'next/link';

export default function UserDashboardPage() {
  // Mocking the logged-in user as the first customer
  const user = customers[0];
  const userBookings = bookings.filter(b => b.customerId === user.id);
  const activeBookings = userBookings.filter(b => b.status === 'Active' || b.status === 'Confirmed').length;
  const completedBookings = userBookings.filter(b => b.status === 'Completed').length;

  const recentUserBookings = userBookings.map(b => ({
      ...b,
      vehicle: vehicles.find(v => v.id === b.vehicleId)
  })).slice(0, 5);

  return (
    <div className="fade-in space-y-6">
      <Header title={`Welcome, ${user.name.split(' ')[0]}!`} />
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Bookings" value={user.bookingsCount.toString()} icon={<CalendarCheck className="h-5 w-5"/>} />
            <StatCard title="Total Spent" value={`₹${user.totalSpent.toLocaleString()}`} icon={<Wallet className="h-5 w-5"/>} />
            <StatCard title="Your Rating" value={user.rating.toString()} icon={<Star className="h-5 w-5"/>} />
            <StatCard title="Member Since" value={new Date(user.memberSince).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })} icon={<User className="h-5 w-5"/>} />
        </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
            </Avatar>
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
                                <TableCell>₹{booking.amount.toLocaleString()}</TableCell>
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
