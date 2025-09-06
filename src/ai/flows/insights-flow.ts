
'use server';
/**
 * @fileOverview An AI flow for generating business insights from rental data.
 *
 * - generateInsights - A function that generates insights based on vehicle, customer, and booking data.
 * - GenerateInsightsOutput - The return type for the generateInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { bookings, customers, vehicles } from '@/lib/data';

const GenerateInsightsOutputSchema = z.object({
  insights: z.array(z.object({
    title: z.string().describe('A short, catchy title for the insight.'),
    description: z.string().describe('A detailed description of the insight, explaining the finding.'),
    recommendation: z.string().describe('A concrete, actionable recommendation based on the insight.'),
  })).describe('An array of 3-5 key business insights.'),
});
export type GenerateInsightsOutput = z.infer<typeof GenerateInsightsOutputSchema>;

export async function generateInsights(): Promise<GenerateInsightsOutput> {
  return generateInsightsFlow();
}

const prompt = ai.definePrompt({
  name: 'generateInsightsPrompt',
  output: { schema: GenerateInsightsOutputSchema },
  prompt: `You are a business analyst for a vehicle rental company called RideTogether. Your task is to analyze the provided data and generate actionable business insights.

Here is the data for the company:

**Vehicles:**
\`\`\`json
{{{json vehicles}}}
\`\`\`

**Customers:**
\`\`\`json
{{{json customers}}}
\`\`\`

**Bookings:**
\`\`\`json
{{{json bookings}}}
\`\`\`

Based on this data, identify 3 to 5 key trends, patterns, or opportunities. For each insight, provide a clear title, a detailed description of your finding, and a concrete, actionable recommendation that the business can implement. Focus on areas like fleet utilization, customer behavior, revenue optimization, and popular vehicle types.`,
});

const generateInsightsFlow = ai.defineFlow(
  {
    name: 'generateInsightsFlow',
    outputSchema: GenerateInsightsOutputSchema,
  },
  async () => {
    const { output } = await prompt({
      vehicles,
      customers,
      bookings
    });
    return output!;
  }
);
