"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getAiInsights } from '@/app/(dashboard)/ai-insights/actions';
import { BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

export function InsightsGenerator() {
    const [isLoading, setIsLoading] = useState(false);
    const [insights, setInsights] = useState<string | null>(null);
    const { toast } = useToast();

    const handleGenerate = async () => {
        setIsLoading(true);
        setInsights(null);

        const result = await getAiInsights();

        if (result.success && result.data?.summary) {
            // Replace markdown-like lists with HTML lists for better formatting
            const formattedSummary = result.data.summary
                .replace(/\* /g, '• ')
                .replace(/- /g, '• ');
            setInsights(formattedSummary);
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error || "An unknown error occurred.",
            });
        }

        setIsLoading(false);
    };

    return (
        <Card className="shadow-md">
            <CardContent className="p-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 font-headline">Generate Business Summary</h2>
                    <p className="text-muted-foreground mb-6">
                        Let AI analyze your rental data to provide a concise performance overview and actionable recommendations.
                    </p>
                    <Button onClick={handleGenerate} disabled={isLoading} size="lg">
                        <BrainCircuit className="mr-2 h-5 w-5" />
                        {isLoading ? 'Generating...' : 'Generate Insights'}
                    </Button>
                </div>
                <div className="mt-8 p-6 bg-muted/50 rounded-lg border min-h-[200px] whitespace-pre-wrap font-mono text-sm">
                    {isLoading ? (
                        <div className="space-y-3">
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-3/4" />
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-1/2" />
                        </div>
                    ) : insights ? (
                        <p className='font-sans text-foreground leading-relaxed'>{insights}</p>
                    ) : (
                        <p className="text-muted-foreground text-center font-sans">
                            Your generated report will appear here...
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
