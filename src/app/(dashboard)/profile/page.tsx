import { bookings, customers, vehicles } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Star } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { getStatusBadge } from '@/lib/utils.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ProfilePage() {
  const user = customers[0]; // Mock: using the first customer as the logged-in user
  const userBookings = bookings.filter(b => b.customerId === user.id).map(b => ({
      ...b,
      vehicle: vehicles.find(v => v.id === b.vehicleId)
  }));

  return (
    <div className="fade-in space-y-6">
        <Header title="My Profile" />
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
                <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback><User className="h-12 w-12"/></AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="grid grid-cols-3 gap-4 text-center w-full border-t pt-4">
                        <div>
                            <p className="font-bold text-lg">{user.bookingsCount}</p>
                            <p className="text-xs text-muted-foreground">Bookings</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">₹{(user.totalSpent/1000).toFixed(1)}K</p>
                            <p className="text-xs text-muted-foreground">Total Spent</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg flex items-center justify-center">{user.rating} <Star className="h-4 w-4 ml-1 text-yellow-400 fill-current"/></p>
                            <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="font-headline">Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue={user.phone} />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Booking History</CardTitle>
                <CardDescription>A record of all your past and current bookings.</CardDescription>
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
                        {userBookings.map(booking => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.vehicle?.brand} {booking.vehicle?.name}</TableCell>
                                <TableCell>{booking.startDate}</TableCell>
                                <TableCell>{booking.endDate}</TableCell>
                                <TableCell>₹{booking.amount.toLocaleString()}</TableCell>
                                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
