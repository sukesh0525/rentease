
"use client";

import { useEffect, useState, useRef } from 'react';
import { customers, type Customer, vehicles, bookings } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star, Edit } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { getStatusBadge } from '@/lib/utils.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export default function UserProfilePage() {
  const [user, setUser] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    if (userEmail) {
      const currentUser = customers.find(c => c.email === userEmail);
      if (currentUser) {
        setUser(currentUser);
        const savedAvatar = localStorage.getItem(`avatar_${userEmail}`);
        setAvatarPreview(savedAvatar || currentUser.avatar);
      }
    }
    setIsLoading(false);
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setAvatarPreview(result);
            if (user?.email) {
                localStorage.setItem(`avatar_${user.email}`, result);
                toast({
                    title: "Profile Picture Updated",
                    description: "Your new photo has been saved.",
                });
            }
        };
        reader.readAsDataURL(file);
    }
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
              <Skeleton className="h-24 w-24 rounded-full" />
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
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
                <CardHeader className="items-center text-center">
                    <div className="relative">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={avatarPreview || ''} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute bottom-4 right-0 rounded-full"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Edit className="h-4 w-4"/>
                            <span className="sr-only">Edit photo</span>
                        </Button>
                        <Input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="grid grid-cols-3 gap-4 text-center w-full border-t pt-4">
                        <div>
                            <p className="font-bold text-lg">{userBookings.length}</p>
                            <p className="text-xs text-muted-foreground">Bookings</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">Rs.{(user.totalSpent/1000).toFixed(1)}k</p>
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
                                <TableCell>Rs.{booking.amount.toLocaleString()}</TableCell>
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
