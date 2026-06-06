import { z } from "zod";

export const CreateGuestbookEntryInput = z.object({
  visitorId: z.string().uuid(),
  name: z.string().min(1).max(255),
  message: z.string().min(1),
});

export const getEntriesSchema = z.object({
  limit: z.number().optional()
}).optional()

export const deleteEntrySchema = z.object({
  entryId: z.string(),
  visitorId: z.string(),
})

export const updateEntrySchema = z.object({
  entryId: z.string(),
  visitorId: z.string(),
  name: z.string().optional(),
  message: z.string().optional(),
})

export type CreateGuestbookEntryInput = z.infer<typeof CreateGuestbookEntryInput>;

export type getEntriesSchema = z.infer<typeof getEntriesSchema>;

export type deleteEntrySchema = z.infer<typeof deleteEntrySchema>;

export type updateEntrySchema = z.infer<typeof updateEntrySchema>;
