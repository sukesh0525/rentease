
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Bot, User, Hourglass } from "lucide-react";
import { generateInsightsAction } from "@/app/(dashboard)/ai-insights/actions";
import { Skeleton } from "../ui/skeleton";

interface InsightsGeneratorProps {
    data: any;
}

export function InsightsGenerator({ data }: InsightsGeneratorProps) {
    const [reportType, setReportType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [insights, setInsights] = useState('');

    const handleGenerate = async () => {
        if (!reportType) {
            alert('Please select a report type.');
            return;
        }
        setIsLoading(true);
        setInsights('');

        const result = await generateInsightsAction({
            reportType,
            data: JSON.stringify(data)
        });

        setInsights(result.insights);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="grid gap-2 flex-grow w-full sm:w-auto">
                    <Label htmlFor="report-type">Select Report Type</Label>
                    <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger id="report-type">
                            <SelectValue placeholder="e.g., Monthly Performance" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="performance">Monthly Performance</SelectItem>
                            <SelectItem value="customer">Customer Behavior</SelectItem>
                            <SelectItem value="fleet">Fleet Optimization</SelectItem>
                            <SelectItem value="revenue">Revenue Analysis</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleGenerate} disabled={isLoading || !reportType} className="w-full sm:w-auto">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isLoading ? 'Generating...' : 'Generate Insights'}
                </Button>
            </div>

            {isLoading && (
                <div className="space-y-4 pt-4">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            )}

            {insights && (
                 <div className="pt-6">
                    <div className="bg-muted p-6 rounded-lg shadow-inner space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/20 p-3 rounded-full">
                                <Bot className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg font-headline text-primary">AI Generated Insights</h3>
                                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: insights }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
