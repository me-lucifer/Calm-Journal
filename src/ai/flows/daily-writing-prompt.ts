'use server';

/**
 * @fileOverview Provides a daily writing prompt to inspire journal entries.
 *
 * - generateDailyWritingPrompt - Generates a unique writing prompt for the day.
 * - GenerateDailyWritingPromptInput - The input type for the generateDailyWritingPrompt function (currently empty).
 * - GenerateDailyWritingPromptOutput - The return type for the generateDailyWritingPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyWritingPromptInputSchema = z.object({});
export type GenerateDailyWritingPromptInput = z.infer<typeof GenerateDailyWritingPromptInputSchema>;

const GenerateDailyWritingPromptOutputSchema = z.object({
  prompt: z.string().describe('A unique, AI-generated writing prompt for the day.'),
});
export type GenerateDailyWritingPromptOutput = z.infer<typeof GenerateDailyWritingPromptOutputSchema>;

export async function generateDailyWritingPrompt(): Promise<GenerateDailyWritingPromptOutput> {
  // If the API key isn't set, return a default prompt to avoid crashing.
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
    return {
      prompt: 'What is a small moment from today that you want to remember forever?',
    };
  }

  try {
    return await generateDailyWritingPromptFlow({});
  } catch (error) {
    console.error('Error generating daily writing prompt:', error);
    // Return a default prompt on error
    return {
      prompt: 'Describe a challenge you overcame today.',
    };
  }
}

const dailyWritingPromptPrompt = ai.definePrompt({
  name: 'dailyWritingPromptPrompt',
  prompt: `You are a creative writing assistant designed to inspire users to journal daily.
  Generate a unique and thought-provoking writing prompt to help users reflect on their day, 
  explore their emotions, or set intentions for the future.

  The prompt should be open-ended and encourage introspection.

  Example Prompts:
  - What is a small moment from today that you want to remember forever?
  - What are you grateful for right now?
  - Describe a challenge you overcame today.

  Today's Prompt:`,
  input: {schema: GenerateDailyWritingPromptInputSchema},
  output: {schema: GenerateDailyWritingPromptOutputSchema},
});

const generateDailyWritingPromptFlow = ai.defineFlow(
  {
    name: 'generateDailyWritingPromptFlow',
    inputSchema: GenerateDailyWritingPromptInputSchema,
    outputSchema: GenerateDailyWritingPromptOutputSchema,
  },
  async () => {
    const {output} = await dailyWritingPromptPrompt({});
    return output!;
  }
);
