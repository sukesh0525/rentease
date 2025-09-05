
// src/ai/flows/generate-ai-rental-insights.ts
'use server';
/**
 * @fileOverview Generates AI-powered insights for vehicle rental performance.
 *
 * - generateAiRentalInsights - A function that generates rental insights.
 * - GenerateAiRentalInsightsInput - The input type for the generateAiRentalInsights function.
 * - GenerateAiRentalInsightsOutput - The return type for the generateAiRentalInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiRentalInsightsInputSchema = z.object({
  totalVehicles: z.number().describe('Total number of vehicles in the fleet.'),
  availableVehicles: z.number().describe('Number of vehicles currently available for rent.'),
  rentedVehicles: z.number().describe('Number of vehicles currently rented out.'),
  totalBookings: z.number().describe('Total number of bookings in the period.'),
  totalRevenue: z
    .number()
    .describe('Total revenue generated in the period (in Rupees).'),
  averageBookingValue: z
    .number()
    .describe('Average value of a booking (in Rupees).'),
  fleetUtilizationRate: z
    .number()
    .describe('Fleet utilization rate (percentage).'),
  totalCustomers: z.number().describe('Total number of customers.'),
  topPerformingBrand: z
    .string()
    .describe('The brand that generated the most revenue.'),
});

export type GenerateAiRentalInsightsInput = z.infer<
  typeof GenerateAiRentalInsightsInputSchema
>;

const GenerateAiRentalInsightsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise, data-driven summary of the company performance, including key insights and actionable recommendations.'
    ),
});

export type GenerateAiRentalInsightsOutput = z.infer<
  typeof GenerateAiRentalInsightsOutputSchema
>;

export async function generateAiRentalInsights(
  input: GenerateAiRentalInsightsInput
): Promise<GenerateAiRentalInsightsOutput> {
  return generateAiRentalInsightsFlow(input);
}

const insightsPrompt = ai.definePrompt({
  name: 'insightsPrompt',
  input: {schema: GenerateAiRentalInsightsInputSchema},
  output: {schema: GenerateAiRentalInsightsOutputSchema},
  prompt: `You are a senior business analyst for a vehicle rental company called VehicleRent. Your task is to provide a concise, data-driven summary of the company's performance based on the provided metrics. Structure your analysis into bullet points covering key areas like revenue, fleet performance, and customer trends. Conclude with one or two actionable recommendations.

Here is the data for the last period:
- Total Vehicles: {{{totalVehicles}}}
- Available Vehicles: {{{availableVehicles}}}
- Rented Vehicles: {{{rentedVehicles}}}
- Total Bookings: {{{totalBookings}}}
- Total Revenue: Rs.{{{totalRevenue}}}
- Average Booking Value: Rs.{{{averageBookingValue}}}
- Top Performing Brand: {{{topPerformingBrand}}}
- Fleet Utilization Rate: {{{fleetUtilizationRate}}}%
- Total Customers: {{{totalCustomers}}}

Please provide your analysis.`,
});

const generateAiRentalInsightsFlow = ai.defineFlow(
  {
    name: 'generateAiRentalInsightsFlow',
    inputSchema: GenerateAiRentalInsightsInputSchema,
    outputSchema: GenerateAiRentalInsightsOutputSchema,
  },
  async input => {
    const {output} = await insightsPrompt(input);
    return output!;
  }
);
