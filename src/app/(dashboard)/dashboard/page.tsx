
"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Car, DollarSign, Gauge, Users, Wrench } from "lucide-react";
import { bookings as initialBookings, customers as initialCustomers, vehicles as initialVehicles, type Booking, type Customer, type Vehicle } from "@/lib/data";
import { DashboardClientContent } from "@/components/dashboard/dashboard-client-content";
import { useEffect, useState, useCallback } from "react";
import { LoadingScreen } from "@/components/common/loader";
import type { GenerateInsightsOutput } from "@/ai/flows/insights-flow";
import { getInsightsAction } from "@/app/(dashboard)/ai-insights/actions";


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

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const storedBookingsRaw = localStorage.getItem('bookings');
        const storedVehiclesRaw = localStorage.getItem('vehicles');
        const storedCustomersRaw = localStorage.getItem('customers');

        const bookings: Booking[] = storedBookingsRaw ? JSON.parse(storedBookingsRaw) : initialBookings;
        const vehicles: Vehicle[] = storedVehiclesRaw ? JSON.parse(storedVehiclesRaw) : initialVehicles;
        const customers: Customer[] = storedCustomersRaw ? JSON.parse(storedCustomersRaw) : initialCustomers;

        const totalVehicles = vehicles.length;
        const availableNow = vehicles.filter(v => v.status === 'Available').length;
        const currentlyRented = vehicles.filter(v => v.status === 'Rented').length;
        const underMaintenance = vehicles.filter(v => v.status === 'Maintenance').length;
        const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);
        const utilization = totalVehicles > 0 ? ((currentlyRented / totalVehicles) * 100).toFixed(0) : "0";
        const totalCustomers = customers.length;

        const availableVehiclesData = vehicles.filter(v => v.status === 'Available');
        const recentBookingsData = bookings.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map(b => ({
            ...b,
            customer: customers.find(c => c.id === b.customerId),
            vehicle: vehicles.find(v => v.id === b.vehicleId),
        }));
        
        try {
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
        } catch (e) {
             console.error("Could not generate insights, using fallback data", e);
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
                insightsData: [
                    { title: "Insights Unavailable", description: "AI analysis could not be performed at this time.", recommendation: "Please check back later."}
                ],
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        window.addEventListener('storage', fetchData);
        return () => {
            window.removeEventListener('storage', fetchData);
        };
    }, [fetchData]);

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
