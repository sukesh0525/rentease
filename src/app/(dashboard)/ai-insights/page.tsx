
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightsGenerator } from "@/components/ai/insights-generator";

export default function AiInsightsPage() {
    return (
        <div className="fade-in space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">AI-Powered Business Insights</CardTitle>
                    <CardDescription>
                        Generate actionable insights from your business data using generative AI. 
                        Click the button below to analyze your latest vehicle, customer, and booking information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <InsightsGenerator />
                </CardContent>
            </Card>
        </div>
    );
}
