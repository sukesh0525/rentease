
"use client"

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import {
    ChartContainer,
    ChartTooltipContent,
  } from "@/components/ui/chart"

const revenueData = [
    { month: "Jan", revenue: 220 },
    { month: "Feb", revenue: 285 },
    { month: "Mar", revenue: 295 },
    { month: "Apr", revenue: 310 },
    { month: "May", revenue: 340 },
    { month: "Jun", revenue: 320 },
]

const bookingStatusData = [
    { name: 'Completed', value: 132, fill: "hsl(var(--chart-1))" },
    { name: 'Active', value: 12, fill: "hsl(var(--chart-2))" },
    { name: 'Confirmed', value: 8, fill: "hsl(var(--chart-4))" },
    { name: 'Cancelled', value: 4, fill: "hsl(var(--chart-5))" },
]

const revenueChartConfig = {
    revenue: {
      label: "Revenue (Rs. k)",
      color: "hsl(var(--chart-1))",
    },
}

const bookingStatusChartConfig = {
    bookings: {
      label: "Bookings",
    },
    Completed: {
        label: "Completed",
        color: "hsl(var(--chart-1))",
    },
    Active: {
        label: "Active",
        color: "hsl(var(--chart-2))",
    },
    Confirmed: {
        label: "Confirmed",
        color: "hsl(var(--chart-4))",
    },
    Cancelled: {
        label: "Cancelled",
        color: "hsl(var(--chart-5))",
    },
}


export function ReportCharts() {
    return (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Revenue Trends</CardTitle>
                    <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={revenueChartConfig} className="h-[300px] w-full">
                        <LineChart data={revenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Booking Status Distribution</CardTitle>
                    <CardDescription>All time booking status</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={bookingStatusChartConfig} className="h-[300px] w-full">
                         <PieChart>
                            <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                            <Legend />
                            <Pie
                                data={bookingStatusData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                labelLine={false}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    return (
                                        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                }}
                            >
                                {bookingStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
