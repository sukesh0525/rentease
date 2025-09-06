
"use client";

import { bookings, customers, vehicles } from "@/lib/data";
import type { Booking, Customer, Vehicle } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin, Clock, Car, Info, User } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from "react";

type ActiveBooking = Booking & {
    customer: Customer | undefined;
    vehicle: Vehicle | undefined;
}

export default function AdminTrackingPage() {
    
    const [activeBookings, setActiveBookings] = useState<ActiveBooking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const loadTrackingData = () => {
        setIsLoading(true);
        // We need to use the data from localStorage if it exists.
        const storedBookingsRaw = localStorage.getItem('bookings');
        const storedVehiclesRaw = localStorage.getItem('vehicles');
        const storedCustomersRaw = localStorage.getItem('customers');

        const allBookings: Booking[] = storedBookingsRaw ? JSON.parse(storedBookingsRaw) : bookings;
        const allVehicles: Vehicle[] = storedVehiclesRaw ? JSON.parse(storedVehiclesRaw) : vehicles;
        const allCustomers: Customer[] = storedCustomersRaw ? JSON.parse(storedCustomersRaw) : customers;

        // Find vehicles that are currently rented and have an active booking associated with them.
        const rentedVehicles = allVehicles.filter(v => v.status === 'Rented');
        const trackedBookings = rentedVehicles.map(vehicle => {
            const booking = allBookings.find(b => b.vehicleId === vehicle.id && b.status === 'Active');
            if (booking) {
                return {
                    ...booking,
                    customer: allCustomers.find(c => c.id === booking.customerId),
                    vehicle: vehicle,
                };
            }
            return null;
        }).filter((b): b is ActiveBooking => b !== null);

        setActiveBookings(trackedBookings);
        setIsLoading(false);
    }
    
    useEffect(() => {
        loadTrackingData();
        // Listen for storage changes to update data in real-time
        window.addEventListener('storage', loadTrackingData);
        return () => {
            window.removeEventListener('storage', loadTrackingData);
        };
    }, []);


    return (
        <div className="fade-in space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Live Vehicle Tracking</CardTitle>
                    <CardDescription>Monitor all active rentals in real-time.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isLoading ? (
                         <p>Loading tracking data...</p>
                    ) : activeBookings.length > 0 ? (
                        activeBookings.map(booking => (
                            <Card key={booking.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 shadow-md">
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
                                            <User className="mr-2 h-4 w-4" />
                                            Rented by: <strong>{booking.customer?.name || 'N/A'}</strong>
                                        </p>
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
                                There are no vehicles currently on rent. Once a booking becomes active, you can track it here.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
