
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { GenerateInsightsOutput } from "@/ai/flows/insights-flow";
import { getInsightsAction } from "@/app/(dashboard)/ai-insights/actions";
import { Lightbulb, Rocket, Wand2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function InsightsGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<GenerateInsightsOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setInsights(null);
    try {
      const result = await getInsightsAction();
      setInsights(result);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Generating Insights",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button onClick={handleGenerate} disabled={isLoading}>
        <Wand2 className="mr-2 h-4 w-4" />
        {isLoading ? "Analyzing Data..." : "Generate Insights"}
      </Button>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-card border p-6 rounded-lg space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
      )}

      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.insights.map((insight, index) => (
            <div key={index} className="bg-card border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex-grow">
                <div className="flex items-start gap-4 mb-4">
                    <div className="bg-primary/20 p-3 rounded-full">
                        <Lightbulb className="h-6 w-6 text-primary"/>
                    </div>
                    <h3 className="font-headline text-xl font-bold">{insight.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{insight.description}</p>
              </div>
              <div className="mt-auto pt-4 border-t">
                 <div className="flex items-start gap-4">
                    <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                        <Rocket className="h-6 w-6 text-green-600 dark:text-green-400"/>
                    </div>
                    <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Recommendation</h4>
                        <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
