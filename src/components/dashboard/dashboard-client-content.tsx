
"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { Booking, Customer, Vehicle } from "@/lib/data";
import type { GenerateInsightsOutput } from "@/ai/flows/insights-flow";
import { getStatusBadge } from "@/lib/utils.tsx";
import Image from "next/image";
import { Button } from "../ui/button";
import { Car, Plus } from "lucide-react";
import Link from "next/link";
import { AiInsightsSummary } from "./ai-insights-summary";

import {
    ChartContainer,
    ChartTooltipContent,
  } from "@/components/ui/chart"

const fleetChartData = [
  { name: 'Maruti Suzuki', revenue: 120, utilization: 85 },
  { name: 'Tata', revenue: 190, utilization: 72 },
  { name: 'Honda', revenue: 80, utilization: 90 },
  { name: 'Hyundai', revenue: 95, utilization: 78 },
  { name: 'Bajaj', revenue: 25, utilization: 82 },
  { name: 'Royal Enfield', revenue: 18, utilization: 88 },
];

const chartConfig = {
    revenue: {
      label: "Revenue (Rs. k)",
      color: "hsl(var(--chart-1))",
    },
    utilization: {
      label: "Utilization (%)",
      color: "hsl(var(--chart-2))",
    },
  }

interface DashboardClientContentProps {
    availableVehicles: Vehicle[];
    recentBookings: (Booking & { customer: Customer | undefined; vehicle: Vehicle | undefined; })[];
    insights: GenerateInsightsOutput['insights'] | null;
}

export function DashboardClientContent({ availableVehicles, recentBookings, insights }: DashboardClientContentProps) {
    return (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="font-headline">Available Vehicles</CardTitle>
                    <CardDescription>Vehicles ready for booking right now.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableVehicles.slice(0, 4).map(v => (
                         <div key={v.id} className="bg-card border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <Image src={v.image} alt={v.name} width={600} height={400} data-ai-hint={v.aiHint} className="w-full h-40 object-cover rounded-md mb-4"/>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-lg font-headline">{v.brand} {v.name}</h4>
                                    <p className="text-sm text-muted-foreground">{v.type}</p>
                                </div>
                                {getStatusBadge(v.status)}
                            </div>
                            <p className="text-xl font-semibold mt-3">Rs.{v.pricePerDay.toLocaleString()}/day</p>
                            <Link href="/vehicles">
                                <Button className="w-full mt-4">View Details</Button>
                            </Link>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         {recentBookings.slice(0, 5).map(b => (
                            <div key={b.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                                <div>
                                    <p className="font-semibold">{b.customer?.name}</p>
                                    <p className="text-sm text-muted-foreground">{b.vehicle?.brand} {b.vehicle?.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">Rs.{b.amount.toLocaleString()}</p>
                                    {getStatusBadge(b.status)}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Link href="/bookings" passHref>
                            <Button className="w-full"><Plus className="mr-2 h-4 w-4"/> New Booking</Button>
                        </Link>
                         <Link href="/vehicles" passHref>
                            <Button variant="secondary" className="w-full">Add Vehicle</Button>
                        </Link>
                         <Link href="/customers" passHref>
                            <Button variant="secondary" className="w-full">Add Customer</Button>
                        </Link>
                        <Link href="/reports" passHref>
                            <Button variant="secondary" className="w-full">Generate Report</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
            
            <AiInsightsSummary insights={insights} />

            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="font-headline">Fleet Performance</CardTitle>
                    <CardDescription>Revenue and utilization by brand.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart data={fleetChartData} >
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="revenue" fill="hsl(var(--chart-1))" yAxisId="left" radius={4} />
                            <Line type="monotone" dataKey="utilization" stroke="hsl(var(--chart-2))" yAxisId="right" strokeWidth={2} dot={false} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
