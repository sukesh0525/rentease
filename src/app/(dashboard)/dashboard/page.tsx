import { StatCard } from "@/components/dashboard/stat-card";
import { Car, DollarSign, Gauge, Users, Wrench } from "lucide-react";
import { bookings, customers, vehicles } from "@/lib/data";
import { DashboardClientContent } from "@/components/dashboard/dashboard-client-content";
import { Header } from "@/components/layout/header";

export default function DashboardPage() {
    const totalVehicles = vehicles.length;
    const availableNow = vehicles.filter(v => v.status === 'Available').length;
    const currentlyRented = vehicles.filter(v => v.status === 'Rented').length;
    const underMaintenance = vehicles.filter(v => v.status === 'Maintenance').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);
    const utilization = totalVehicles > 0 ? ((currentlyRented / totalVehicles) * 100).toFixed(0) : 0;

    const availableVehiclesData = vehicles.filter(v => v.status === 'Available');
    const recentBookingsData = bookings.map(b => ({
        ...b,
        customer: customers.find(c => c.id === b.customerId),
        vehicle: vehicles.find(v => v.id === b.vehicleId),
    }));


    return (
        <div className="fade-in space-y-6">
            <Header title="Dashboard" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <StatCard title="Total Vehicles" value={totalVehicles.toString()} icon={<Car className="h-5 w-5"/>} />
                <StatCard title="Total Revenue" value={`₹${(totalRevenue/1000).toFixed(1)}k`} icon={<DollarSign className="h-5 w-5"/>} />
                <StatCard title="Total Customers" value={customers.length.toString()} icon={<Users className="h-5 w-5"/>} />
                <StatCard title="Utilization" value={`${utilization}%`} icon={<Gauge className="h-5 w-5"/>} />
                <StatCard title="Maintenance" value={underMaintenance.toString()} icon={<Wrench className="h-5 w-5"/>} />
            </div>

            <DashboardClientContent 
                availableVehicles={availableVehiclesData}
                recentBookings={recentBookingsData}
            />
        </div>
    );
}
