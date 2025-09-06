
"use server";

import { generateInsights } from "@/ai/flows/insights-flow";
import type { GenerateInsightsOutput } from "@/ai/flows/insights-flow";

export async function getInsightsAction(): Promise<GenerateInsightsOutput> {
  try {
    const insights = await generateInsights();
    return insights;
  } catch (error) {
    console.error("Error generating insights:", error);
    throw new Error("Failed to generate AI insights. Please try again.");
  }
}
