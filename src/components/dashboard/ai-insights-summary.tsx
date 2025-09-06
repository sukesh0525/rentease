
"use client";

import type { GenerateInsightsOutput } from "@/ai/flows/insights-flow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

interface AiInsightsSummaryProps {
    insights: GenerateInsightsOutput['insights'] | null;
}

export function AiInsightsSummary({ insights }: AiInsightsSummaryProps) {
    return (
        <Card className="lg:col-span-3 bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Lightbulb className="text-primary"/>
                    Today's Key Insights
                </CardTitle>
                <CardDescription>A quick summary of AI-generated insights from your data.</CardDescription>
            </CardHeader>
            <CardContent>
                 {!insights ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-card/50 p-4 rounded-lg space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                         <div className="bg-card/50 p-4 rounded-lg space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>
                 ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {insights.map((insight, index) => (
                            <div key={index} className="bg-card/50 p-4 rounded-lg">
                                <h4 className="font-bold font-headline">{insight.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-6 flex justify-end">
                    <Link href="/ai-insights" passHref>
                        <Button variant="ghost">
                            View All Insights <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
