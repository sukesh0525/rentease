
import { StatCard } from "@/components/dashboard/stat-card";
import { ReportCharts } from "@/components/reports/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Star, Calendar, Wallet } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="fade-in space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Business Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                         <StatCard title="Fleet Utilization" value="76%" icon={<Gauge className="h-5 w-5"/>} />
                         <StatCard title="Customer Satisfaction" value="4.8/5" icon={<Star className="h-5 w-5"/>} />
                         <StatCard title="Avg Rental Duration" value="4.2 Days" icon={<Calendar className="h-5 w-5"/>} />
                         <StatCard title="Revenue per Vehicle" value="Rs.15,200" icon={<Wallet className="h-5 w-5"/>} />
                    </div>
                </CardContent>
            </Card>
            <ReportCharts />
        </div>
    );
}
