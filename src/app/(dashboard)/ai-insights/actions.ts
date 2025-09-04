"use server";
import { generateAiRentalInsights, type GenerateAiRentalInsightsInput } from '@/ai/flows/generate-ai-rental-insights';
import { bookings, customers, vehicles } from '@/lib/data';

// This function is a server action that can be called from client components.
export async function getAiInsights() {
    try {
        const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);
        const rentedVehiclesCount = vehicles.filter(v => v.status === 'Rented').length;
        const totalVehiclesCount = vehicles.length;
        const utilization = totalVehiclesCount > 0 ? (rentedVehiclesCount / totalVehiclesCount) * 100 : 0;
        
        // This is a placeholder. A real implementation would calculate this dynamically.
        const topPerformingBrand = 'Tata'; 

        const input: GenerateAiRentalInsightsInput = {
            totalVehicles: totalVehiclesCount,
            availableVehicles: vehicles.filter(v => v.status === 'Available').length,
            rentedVehicles: rentedVehiclesCount,
            totalBookings: bookings.length,
            totalRevenue: totalRevenue,
            averageBookingValue: bookings.length > 0 ? totalRevenue / bookings.length : 0,
            fleetUtilizationRate: parseFloat(utilization.toFixed(2)),
            totalCustomers: customers.length,
            topPerformingBrand: topPerformingBrand,
        };

        const insights = await generateAiRentalInsights(input);
        return { success: true, data: insights };
    } catch (error) {
        console.error("Error generating AI insights:", error);
        return { success: false, error: 'Failed to generate insights. Please check the server logs.' };
    }
}
