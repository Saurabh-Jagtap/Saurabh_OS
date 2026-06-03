import { z } from "zod";

export const CreateGuestbookEntryInput = z.object({
  visitorId: z.string().uuid(),
  name: z.string().min(1).max(255),
  message: z.string().min(1),
});

export type CreateGuestbookEntryInput = z.infer<
  typeof CreateGuestbookEntryInput
>;