import { bookings, customers, vehicles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPaymentBadge, getStatusBadge } from "@/lib/utils.tsx";
import { StatCard } from "@/components/dashboard/stat-card";
import { Book, CalendarCheck, DollarSign, Wallet } from "lucide-react";
import { Header } from "@/components/layout/header";

export default function BookingsPage() {
    const bookingDetails = bookings.map(b => {
        const customer = customers.find(c => c.id === b.customerId);
        const vehicle = vehicles.find(v => v.id === b.vehicleId);
        return { ...b, customer, vehicle };
    });

    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(b => b.status === 'Active').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);
    const avgBookingValue = totalRevenue / totalBookings;


  return (
    <div className="fade-in space-y-6">
        <Header title="Booking Management" />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Bookings" value={totalBookings.toString()} icon={<Book className="h-5 w-5"/>} />
            <StatCard title="Active Bookings" value={activeBookings.toString()} icon={<CalendarCheck className="h-5 w-5"/>} />
            <StatCard title="Monthly Revenue" value={`₹${(totalRevenue/1000).toFixed(1)}k`} icon={<DollarSign className="h-5 w-5"/>} />
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
                <TableHead className="font-semibold">Actions</TableHead>
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
                  <TableCell>
                    <Button variant="link" className="p-0 h-auto">View</Button>
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
