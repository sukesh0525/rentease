
"use client";

import { useEffect, useRef, useState } from 'react';
import { customers, type Customer, vehicles, bookings } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Star, Pencil } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { getStatusBadge } from '@/lib/utils.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function UserProfilePage() {
  const [user, setUser] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    if (userEmail) {
      const currentUser = customers.find(c => c.email === userEmail);
      setUser(currentUser || null);
      setAvatar(currentUser?.avatar || null);
    }
    setIsLoading(false);
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
        toast({
            title: "Profile Picture Updated",
            description: "Your new profile picture has been set.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const userBookings = user ? bookings.filter(b => b.customerId === user.id).map(b => ({
      ...b,
      vehicle: vehicles.find(v => v.id === b.vehicleId)
  })) : [];

  if (isLoading) {
    return (
      <div className="fade-in space-y-6">
        <Header title="My Profile" />
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader className="items-center text-center">
              <Skeleton className="h-24 w-24 rounded-full mb-4" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline">Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fade-in space-y-6">
        <Header title="My Profile" />
        <Card>
          <CardContent className="p-6">
            <p>Could not find user data. Please try logging in again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fade-in space-y-6">
        <Header title="My Profile" />
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
                <CardHeader className="items-center text-center">
                    <div className="relative group">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={avatar || undefined} alt={user.name} />
                            <AvatarFallback><User className="h-12 w-12"/></AvatarFallback>
                        </Avatar>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute bottom-4 right-0 rounded-full h-8 w-8 bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleEditClick}
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit Photo</span>
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            className="hidden"
                            accept="image/png, image/jpeg, image/gif"
                        />
                    </div>
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
                            <p className="font-bold text-lg">₹{(user.totalSpent/1000).toFixed(1)}k</p>
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
                        <Input id="email" type="email" defaultValue={user.email} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue={user.phone} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" defaultValue={user.address} />
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
