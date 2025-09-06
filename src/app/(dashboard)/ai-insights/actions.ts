
'use server';

import { generateInsights, type GenerateInsightsInput } from "@/ai/flows/insights-flow";
import { z } from "zod";

const actionSchema = z.object({
    reportType: z.string(),
    data: z.string(),
});

export async function generateInsightsAction(input: GenerateInsightsInput) {
    const validatedInput = actionSchema.parse(input);
    return await generateInsights(validatedInput);
}
