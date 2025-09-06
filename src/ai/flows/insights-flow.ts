
'use server';
/**
 * @fileOverview An AI flow for generating business insights from rental data.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateInsightsInputSchema = z.object({
  reportType: z.string().describe('The type of report to generate, e.g., "performance", "customer", "fleet".'),
  data: z.string().describe('A JSON string containing the business data (bookings, customers, vehicles).'),
});
export type GenerateInsightsInput = z.infer<typeof GenerateInsightsInputSchema>;

const GenerateInsightsOutputSchema = z.object({
  insights: z.string().describe('The generated insights in HTML format.'),
});
export type GenerateInsightsOutput = z.infer<typeof GenerateInsightsOutputSchema>;

export async function generateInsights(input: GenerateInsightsInput): Promise<GenerateInsightsOutput> {
  return generateInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightsPrompt',
  input: { schema: GenerateInsightsInputSchema },
  output: { schema: GenerateInsightsOutputSchema },
  prompt: `
    You are a business analyst for a vehicle rental company called "RideTogether".
    Your task is to analyze the provided data and generate a concise report based on the requested report type.

    Report Type: {{{reportType}}}
    Business Data (JSON):
    {{{data}}}

    Based on the report type and data, provide a summary with the following structure in HTML format:
    - A main heading (h4) for the report title.
    - 2-3 key bullet points (ul/li) highlighting the most important findings. Use strong tags for key metrics or numbers.
    - A short paragraph with actionable recommendations.
    - Format numbers and currency appropriately (e.g., Rs. 10,000).

    Example for "Fleet Optimization":
    <h4>Fleet Optimization Insights</h4>
    <ul>
      <li>The <strong>Tata Nexon</strong> is the most profitable vehicle, generating <strong>Rs. 26,400</strong> in revenue.</li>
      <li>The <strong>Honda Activa</strong> has high utilization but low revenue per booking. Consider a price adjustment.</li>
    </ul>
    <p><strong>Recommendation:</strong> Promote the Tata Nexon more and review the pricing for scooters to maximize revenue.</p>
  `,
});


const generateInsightsFlow = ai.defineFlow(
  {
    name: 'generateInsightsFlow',
    inputSchema: GenerateInsightsInputSchema,
    outputSchema: GenerateInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
