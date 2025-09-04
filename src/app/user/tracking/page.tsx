
"use client";

import { useEffect, useState } from 'react';
import { bookings, customers, vehicles } from "@/lib/data";
import type { Booking, Customer, Vehicle } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin, Clock, Car, Info } from 'lucide-react';
import Image from 'next/image';

type ActiveBooking = Booking & {
    customer: Customer | undefined;
    vehicle: Vehicle | undefined;
}

export default function UserTrackingPage() {
    const [user, setUser] = useState<Customer | null>(null);
    const [activeBookings, setActiveBookings] = useState<ActiveBooking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userEmail = localStorage.getItem('loggedInUserEmail');
        if (userEmail) {
            const currentUser = customers.find(c => c.email === userEmail);
            setUser(currentUser || null);
            if (currentUser) {
                const currentUserBookings = bookings
                    .filter(b => b.customerId === currentUser.id && b.status === 'Active')
                    .map(b => ({
                        ...b,
                        customer: currentUser,
                        vehicle: vehicles.find(v => v.id === b.vehicleId),
                    }));
                setActiveBookings(currentUserBookings);
            }
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
             <div className="fade-in space-y-6">
                <Header title="Vehicle Tracking" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="fade-in space-y-6">
            <Header title="Vehicle Tracking" />
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Live Tracking</CardTitle>
                    <CardDescription>Here is the live status of your active rentals.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {activeBookings.length > 0 ? (
                        activeBookings.map(booking => (
                            <Card key={booking.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                                <div className="md:col-span-1">
                                     <Image 
                                        src={booking.vehicle?.image || ''} 
                                        alt={booking.vehicle?.name || 'Vehicle'} 
                                        width={600}
                                        height={400}
                                        className="rounded-lg object-cover w-full h-full"
                                        data-ai-hint={booking.vehicle?.aiHint}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <h3 className="font-bold text-xl font-headline flex items-center">
                                        <Car className="mr-2 h-6 w-6 text-primary"/>
                                        {booking.vehicle?.brand} {booking.vehicle?.name}
                                    </h3>
                                    <div className="flex items-center text-lg font-semibold text-green-600">
                                       <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                                       {booking.tracking?.status || 'Status Unavailable'}
                                    </div>
                                    <div className="text-muted-foreground space-y-2">
                                        <p className="flex items-center">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            Last known location: <strong>{booking.tracking?.location || 'N/A'}</strong>
                                        </p>
                                        <p className="flex items-center">
                                            <Clock className="mr-2 h-4 w-4" />
                                            Last seen: {booking.tracking?.lastSeen || 'N/A'}
                                        </p>
                                    </div>
                                    <p className="text-sm">Booking ID: {booking.id}</p>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>No Active Rentals</AlertTitle>
                            <AlertDescription>
                                You do not have any vehicles currently on rent. Once a booking becomes active, you can track it here.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
