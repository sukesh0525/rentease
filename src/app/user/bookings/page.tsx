
"use client";

import { useEffect, useState } from 'react';
import { bookings, customers, vehicles } from "@/lib/data";
import type { Booking, Customer } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPaymentBadge, getStatusBadge } from "@/lib/utils.tsx";
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function UserBookingsPage() {
    const { toast } = useToast();
    const [user, setUser] = useState<Customer | null>(null);
    const [userBookings, setUserBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userEmail = localStorage.getItem('loggedInUserEmail');
        if (userEmail) {
            const currentUser = customers.find(c => c.email === userEmail);
            setUser(currentUser || null);
            if (currentUser) {
                // Filter bookings for the current user from the global bookings array
                const currentUserBookings = bookings.filter(b => b.customerId === currentUser.id);
                setUserBookings(currentUserBookings);
            }
        }
        setIsLoading(false);
    }, []);

    const handlePayment = (bookingId: string) => {
        // Update booking payment status
        const booking = bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.payment = 'Paid';
        }
        setUserBookings(prev => prev.map(b => b.id === bookingId ? { ...b, payment: 'Paid' as const } : b));
        
        // Update customer's total spent
        if (booking && user) {
            user.totalSpent += booking.amount;
        }

        toast({
            title: "Payment Successful!",
            description: "Your booking has been paid for.",
        });
    };

    if (isLoading) {
        return (
             <div className="fade-in space-y-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
    
    const bookingDetails = userBookings.map(b => {
        const vehicle = vehicles.find(v => v.id === b.vehicleId);
        return { ...b, customer: user, vehicle };
    });

  return (
    <div className="fade-in space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">All My Bookings</CardTitle>
                <CardDescription>Here is a list of all your past and current bookings.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-semibold">Booking ID</TableHead>
                            <TableHead className="font-semibold">Vehicle</TableHead>
                            <TableHead className="font-semibold">Dates</TableHead>
                            <TableHead className="font-semibold">Amount</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Payment</TableHead>
                            <TableHead className="font-semibold text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookingDetails.map(b => (
                            <TableRow key={b.id}>
                                <TableCell className="font-medium">{b.id}</TableCell>
                                <TableCell>{b.vehicle?.brand} {b.vehicle?.name}</TableCell>
                                <TableCell>{b.startDate} to {b.endDate}</TableCell>
                                <TableCell className="font-semibold">Rs.{b.amount.toLocaleString()}</TableCell>
                                <TableCell>{getStatusBadge(b.status)}</TableCell>
                                <TableCell>{getPaymentBadge(b.payment)}</TableCell>
                                <TableCell className="text-center">
                                    {b.status === 'Confirmed' && b.payment === 'Pending' ? (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button>Pay Now</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Complete Your Payment</DialogTitle>
                                                    <DialogDescription>
                                                        Total Amount: Rs.{b.amount.toLocaleString()}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="py-4">
                                                    <p className="mb-4 font-semibold">Select Payment Method</p>
                                                    <RadioGroup defaultValue="upi">
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="upi" id="upi" />
                                                            <Label htmlFor="upi">UPI</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="credit" id="credit" />
                                                            <Label htmlFor="credit">Credit Card</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="debit" id="debit" />
                                                            <Label htmlFor="debit">Debit Card</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                                <Button onClick={() => handlePayment(b.id)}>Confirm Payment</Button>
                                            </DialogContent>
                                        </Dialog>
                                    ) : (
                                         <Button variant="link" className="p-0 h-auto" disabled={b.status !== 'Completed'}>View Invoice</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
