
'use server';
/**
 * @fileOverview An AI flow for generating business insights from rental data.
 *
 * - generateInsights - A function that generates insights based on vehicle, customer, and booking data.
 * - GenerateInsightsOutput - The return type for the generateInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
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

Based on this data, identify 3 to 5 key trends and status reports. Please include the following types of insights:
1.  **Customer Vehicle Preference:** Analyze which vehicles are most frequently booked by customers. Mention specific popular models like the Swift if the data supports it.
2.  **Weekly Status:** Provide a summary of the business performance over the last week (e.g., number of new bookings, revenue).
3.  **Monthly Status:** Provide a summary of the business performance for the current month.
4.  **Yearly Status:** Provide a high-level overview of the business performance for the year.

For each insight, provide a clear title, a detailed description, and a concrete recommendation.`,
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
