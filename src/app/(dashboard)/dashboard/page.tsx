
"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Car, DollarSign, Gauge, Users, Wrench } from "lucide-react";
import { bookings, customers, vehicles, type Booking, type Customer, type Vehicle } from "@/lib/data";
import { DashboardClientContent } from "@/components/dashboard/dashboard-client-content";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/common/loader";
import type { GenerateInsightsOutput } from "@/ai/flows/insights-flow";
import { getInsightsAction } from "./ai-insights/actions";


export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<{
        totalVehicles: number;
        availableNow: number;
        currentlyRented: number;
        underMaintenance: number;
        totalRevenue: number;
        utilization: string;
        totalCustomers: number;
        availableVehiclesData: Vehicle[];
        recentBookingsData: (Booking & { customer: Customer | undefined; vehicle: Vehicle | undefined; })[];
        insightsData: GenerateInsightsOutput['insights'];
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const totalVehicles = vehicles.length;
            const availableNow = vehicles.filter(v => v.status === 'Available').length;
            const currentlyRented = vehicles.filter(v => v.status === 'Rented').length;
            const underMaintenance = vehicles.filter(v => v.status === 'Maintenance').length;
            const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);
            const utilization = totalVehicles > 0 ? ((currentlyRented / totalVehicles) * 100).toFixed(0) : "0";
            const totalCustomers = customers.length;

            const availableVehiclesData = vehicles.filter(v => v.status === 'Available');
            const recentBookingsData = bookings.map(b => ({
                ...b,
                customer: customers.find(c => c.id === b.customerId),
                vehicle: vehicles.find(v => v.id === b.vehicleId),
            }));

            const insightsResult = await getInsightsAction();

            setDashboardData({
                totalVehicles,
                availableNow,
                currentlyRented,
                underMaintenance,
                totalRevenue,
                utilization,
                totalCustomers,
                availableVehiclesData,
                recentBookingsData,
                insightsData: insightsResult.insights.slice(0, 2),
            });
            setIsLoading(false);
        };

        fetchData();
    }, []); // Re-run when vehicles data might have changed. A more robust solution might use a state manager.

    if (isLoading || !dashboardData) {
        return <LoadingScreen />
    }

    const {
        totalVehicles,
        totalRevenue,
        totalCustomers,
        utilization,
        underMaintenance,
        availableVehiclesData,
        recentBookingsData,
        insightsData,
    } = dashboardData;


    return (
        <div className="fade-in space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <StatCard title="Total Vehicles" value={totalVehicles.toString()} icon={<Car className="h-5 w-5"/>} />
                <StatCard title="Total Revenue" value={`Rs.${(totalRevenue/1000).toFixed(1)}k`} icon={<DollarSign className="h-5 w-5"/>} />
                <StatCard title="Total Customers" value={totalCustomers.toString()} icon={<Users className="h-5 w-5"/>} />
                <StatCard title="Utilization" value={`${utilization}%`} icon={<Gauge className="h-5 w-5"/>} />
                <StatCard title="Maintenance" value={underMaintenance.toString()} icon={<Wrench className="h-5 w-5"/>} />
            </div>

            <DashboardClientContent 
                availableVehicles={availableVehiclesData}
                recentBookings={recentBookingsData}
                insights={insightsData}
            />
        </div>
    );
}
