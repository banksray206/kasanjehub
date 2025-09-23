'use server';

/**
 * @fileOverview An AI agent that determines if content updates are semantically meaningful and applies them.
 *
 * - shouldUpdateContent - A function that checks if content should be updated.
 * - ShouldUpdateContentInput - The input type for the shouldUpdateContent function.
 * - ShouldUpdateContentOutput - The return type for the shouldUpdateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShouldUpdateContentInputSchema = z.object({
  currentContent: z.string().describe('The current content on the mirrored website.'),
  newContent: z.string().describe('The new content fetched from the original website.'),
});
export type ShouldUpdateContentInput = z.infer<typeof ShouldUpdateContentInputSchema>;

const ShouldUpdateContentOutputSchema = z.object({
  shouldUpdate: z
    .boolean()
    .describe(
      'Whether the content should be updated on the mirrored website. True if the new content is semantically different, false otherwise.'
    ),
  reason: z.string().describe('The reason for the decision.'),
});
export type ShouldUpdateContentOutput = z.infer<typeof ShouldUpdateContentOutputSchema>;

export async function shouldUpdateContent(input: ShouldUpdateContentInput): Promise<ShouldUpdateContentOutput> {
  return shouldUpdateContentFlow(input);
}

const shouldUpdateContentPrompt = ai.definePrompt({
  name: 'shouldUpdateContentPrompt',
  input: {schema: ShouldUpdateContentInputSchema},
  output: {schema: ShouldUpdateContentOutputSchema},
  prompt: `You are a content update analyzer. Your task is to determine whether the content on a mirrored website should be updated with new content fetched from the original website.

  Consider the following:
  - Semantic similarity: If the new content is semantically the same as the current content, do not update.
  - Significant changes: Only update if the new content has meaningful changes that would affect the user experience.
  - Avoid unnecessary updates: Do not update for minor changes like whitespace or formatting.

  Current Content: {{{currentContent}}}
  New Content: {{{newContent}}}

  Based on your analysis, determine whether the content should be updated and provide a reason for your decision.
  Set the 'shouldUpdate' field to true if the content should be updated, and false otherwise.
  Explain your reasoning in the 'reason' field.
`,
});

const shouldUpdateContentFlow = ai.defineFlow(
  {
    name: 'shouldUpdateContentFlow',
    inputSchema: ShouldUpdateContentInputSchema,
    outputSchema: ShouldUpdateContentOutputSchema,
  },
  async input => {
    const {output} = await shouldUpdateContentPrompt(input);
    return output!;
  }
);
