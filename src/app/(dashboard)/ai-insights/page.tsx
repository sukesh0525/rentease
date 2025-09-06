
import { InsightsGenerator } from "@/components/ai/insights-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { bookings, customers, vehicles } from "@/lib/data";

export default function AIInsightsPage() {
    const data = {
        bookings,
        customers,
        vehicles
    };

    return (
        <div className="fade-in space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">AI-Powered Business Insights</CardTitle>
                    <CardDescription>
                        Select a report type and let our AI analyze your data to provide actionable insights,
                        identify trends, and suggest improvements for your rental business.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <InsightsGenerator data={data} />
                </CardContent>
            </Card>
        </div>
    );
}
