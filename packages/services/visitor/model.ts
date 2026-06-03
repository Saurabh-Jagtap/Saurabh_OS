import { z } from "zod";

export const identifyVisitorInputSchema = z.object({
  visitorId: z.string().uuid().optional(),
});

export type IdentifyVisitorInput = z.infer<
  typeof identifyVisitorInputSchema
>;