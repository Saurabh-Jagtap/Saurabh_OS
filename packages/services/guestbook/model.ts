import { z } from "zod";

export const CreateGuestbookEntryInput = z.object({
  visitorId: z.string().uuid(),
  name: z.string().min(1).max(255),
  message: z.string().min(1),
});

export const getEntriesSchema = z.object({
  limit: z.number().optional()
}).optional()

export type CreateGuestbookEntryInput = z.infer<typeof CreateGuestbookEntryInput>;

export type getEntriesSchema = z.infer<typeof getEntriesSchema>;