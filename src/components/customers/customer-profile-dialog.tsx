
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { bookings as initialBookings, vehicles, type Customer } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStatusBadge } from "@/lib/utils.tsx";
import { Star, Calendar, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

interface CustomerProfileDialogProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerProfileDialog({ customer, isOpen, onClose }: CustomerProfileDialogProps) {
  const [bookings, setBookings] = useState(initialBookings);

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
    }
  }, [isOpen]);

  if (!customer) return null;

  const customerBookings = bookings
    .filter(b => b.customerId === customer.id)
    .map(b => ({
      ...b,
      vehicle: vehicles.find(v => v.id === b.vehicleId)
    }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
             <Avatar className="h-16 w-16">
                <AvatarImage src={customer.avatar} alt={customer.name} />
                <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                 <DialogTitle className="font-headline text-2xl">{customer.name}</DialogTitle>
                <DialogDescription>
                    {customer.email} | {customer.phone}
                </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold flex items-center justify-center gap-2">{customer.bookingsCount} <Calendar className="h-5 w-5"/></p>
                </div>
                 <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold flex items-center justify-center gap-2">Rs.{customer.totalSpent.toLocaleString()} <Wallet className="h-5 w-5"/></p>
                </div>
                 <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold flex items-center justify-center gap-2">{customer.rating} <Star className="h-5 w-5 text-yellow-400 fill-current"/></p>
                </div>
            </div>
            
            <div>
                <h4 className="font-semibold text-lg border-b pb-2 mb-4">Booking History</h4>
                <div className="max-h-64 overflow-y-auto">
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
                            {customerBookings.map(booking => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.vehicle?.brand} {booking.vehicle?.name}</TableCell>
                                    <TableCell>{booking.startDate} to {booking.endDate}</TableCell>
                                    <TableCell>Rs.{booking.amount.toLocaleString()}</TableCell>
                                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
