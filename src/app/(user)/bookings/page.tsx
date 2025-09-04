import { bookings, customers, vehicles } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPaymentBadge, getStatusBadge } from "@/lib/utils.tsx";
import { Header } from "@/components/layout/header";

export default function UserBookingsPage() {
    // Mock user
    const user = customers[0];

    const bookingDetails = bookings
        .filter(b => b.customerId === user.id)
        .map(b => {
            const vehicle = vehicles.find(v => v.id === b.vehicleId);
            return { ...b, customer: user, vehicle };
    });

  return (
    <div className="fade-in space-y-6">
        <Header title="My Bookings" />
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
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingDetails.map(b => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.id}</TableCell>
                  <TableCell>{b.vehicle?.brand} {b.vehicle?.name}</TableCell>
                  <TableCell>{b.startDate} to {b.endDate}</TableCell>
                  <TableCell className="font-semibold">₹{b.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(b.status)}</TableCell>
                  <TableCell>{getPaymentBadge(b.payment)}</TableCell>
                  <TableCell>
                    <Button variant="link" className="p-0 h-auto">View Invoice</Button>
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
