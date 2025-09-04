
"use client";

import { bookings, customers, vehicles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPaymentBadge, getStatusBadge } from "@/lib/utils.tsx";
import { StatCard } from "@/components/dashboard/stat-card";
import { Book, CalendarCheck, Check, DollarSign, Wallet, X } from "lucide-react";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Booking } from "@/lib/data";

export default function BookingsPage() {
    const { toast } = useToast();
    const [currentBookings, setCurrentBookings] = useState<Booking[]>(bookings);

    const bookingDetails = currentBookings.map(b => {
        const customer = customers.find(c => c.id === b.customerId);
        const vehicle = vehicles.find(v => v.id === b.vehicleId);
        return { ...b, customer, vehicle };
    });

    const totalBookings = currentBookings.length;
    const activeBookings = currentBookings.filter(b => b.status === 'Active').length;
    const totalRevenue = currentBookings.reduce((sum, b) => sum + b.amount, 0);
    const avgBookingValue = totalRevenue > 0 ? totalRevenue / totalBookings : 0;

    const handleBookingAction = (bookingId: string, newStatus: 'Confirmed' | 'Cancelled') => {
        // In a real app, this would be an API call. Here we just update mock data.
        const updatedBookings = currentBookings.map(b => 
            b.id === bookingId ? { ...b, status: newStatus } : b
        );
        setCurrentBookings(updatedBookings);
        // This is a simulation, in a real app you would update the source `bookings` array
        // For now, we will update the original array to make the changes persist across page navigations.
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = newStatus;
        }

        toast({
            title: `Booking ${newStatus}`,
            description: `The booking request ${bookingId} has been ${newStatus.toLowerCase()}.`,
        });
    };

    return (
        <div className="fade-in space-y-6">
            <Header title="Booking Management" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Bookings" value={totalBookings.toString()} icon={<Book className="h-5 w-5"/>} />
                <StatCard title="Active Bookings" value={activeBookings.toString()} icon={<CalendarCheck className="h-5 w-5"/>} />
                <StatCard title="Total Revenue" value={`₹${(totalRevenue/1000).toFixed(1)}k`} icon={<DollarSign className="h-5 w-5"/>} />
                <StatCard title="Avg Booking Value" value={`₹${avgBookingValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} icon={<Wallet className="h-5 w-5"/>} />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">All Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold">Booking ID</TableHead>
                                <TableHead className="font-semibold">Customer</TableHead>
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
                                    <TableCell>{b.customer?.name}</TableCell>
                                    <TableCell>{b.vehicle?.brand} {b.vehicle?.name}</TableCell>
                                    <TableCell>{b.startDate} to {b.endDate}</TableCell>
                                    <TableCell className="font-semibold">₹{b.amount.toLocaleString()}</TableCell>
                                    <TableCell>{getStatusBadge(b.status)}</TableCell>
                                    <TableCell>{getPaymentBadge(b.payment)}</TableCell>
                                    <TableCell className="text-center">
                                        {b.status === 'Pending' ? (
                                            <div className="flex gap-2 justify-center">
                                                <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleBookingAction(b.id, 'Confirmed')}>
                                                    <Check className="h-4 w-4 mr-1" /> Approve
                                                </Button>
                                                <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleBookingAction(b.id, 'Cancelled')}>
                                                    <X className="h-4 w-4 mr-1" /> Decline
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button variant="link" className="p-0 h-auto">View</Button>
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
