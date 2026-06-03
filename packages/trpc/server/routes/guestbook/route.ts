import { publicProcedure, router } from "../../trpc";
import { guestbookService } from "../../services";

import { CreateGuestbookEntryInput } from "@repo/services/guestbook/model";
export const guestbookRouter = router({
    createEntry: publicProcedure
        .input(CreateGuestbookEntryInput)
        .mutation(async ({ input }) => {
            return guestbookService.createGuestbookEntry(input);
        }),
    getEntries: publicProcedure.query(async () => {
        return guestbookService.getGuestbookEntries();
    }),
});
