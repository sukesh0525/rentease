
"use client";

import { useState, useEffect } from "react";
import { addDays, format, differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import type { Vehicle, Customer } from "@/lib/data";
import { Calendar as CalendarIcon, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { customers as initialCustomers, bookings } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface BookingDialogProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingDialog({ vehicle, isOpen, onClose }: BookingDialogProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: new Date(),
        to: addDays(new Date(), 3),
    });
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        if (dateRange.from && dateRange.to) {
            const days = differenceInDays(dateRange.to, dateRange.from) + 1;
            setTotalCost(days * vehicle.pricePerDay);
        } else {
            setTotalCost(0);
        }
    }, [dateRange, vehicle.pricePerDay]);

    const handleBooking = () => {
        const userEmail = localStorage.getItem('loggedInUserEmail');
        if (!userEmail) {
            toast({
                variant: 'destructive',
                title: 'Not Logged In',
                description: 'You must be logged in to make a booking.',
            });
            router.push('/login');
            return;
        }

        const storedCustomersRaw = localStorage.getItem('customers');
        const customers: Customer[] = storedCustomersRaw ? JSON.parse(storedCustomersRaw) : initialCustomers;
        const user = customers.find(c => c.email === userEmail);
        
        if (!user) {
             toast({
                variant: 'destructive',
                title: 'User Not Found',
                description: 'Could not find user details. Please log in again.',
            });
            router.push('/login');
            return;
        }

        if (!dateRange.from || !dateRange.to) {
             toast({
                variant: 'destructive',
                title: 'Invalid Dates',
                description: 'Please select a valid date range.',
            });
            return;
        }

        const newBooking = {
            id: `BK${Math.floor(1000 + Math.random() * 9000)}`,
            customerId: user.id,
            vehicleId: vehicle.id,
            startDate: format(dateRange.from, 'yyyy-MM-dd'),
            endDate: format(dateRange.to, 'yyyy-MM-dd'),
            amount: totalCost,
            status: 'Pending' as const,
            payment: 'Pending' as const,
        };

        bookings.push(newBooking);

        toast({
            title: 'Booking Request Sent!',
            description: 'Your request has been sent to the admin for approval.',
        });

        onClose();
        router.push('/user/bookings');
    };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Book: {vehicle.brand} {vehicle.name}</DialogTitle>
          <DialogDescription>
            Select your rental dates to proceed with the booking.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dates" className="text-right">
              Dates
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={{ from: dateRange.from!, to: dateRange.to }}
                    onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    numberOfMonths={1}
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 mt-4 p-4 bg-muted rounded-lg">
             <div className="flex items-center text-lg font-semibold text-primary">
                 <Wallet className="mr-2 h-6 w-6"/>
                 <span>Total Cost:</span>
             </div>
             <p className="text-2xl font-bold">Rs.{totalCost.toLocaleString()}</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handleBooking} disabled={!dateRange.from || !dateRange.to}>
            Send Booking Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
