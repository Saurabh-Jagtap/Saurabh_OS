import db, { desc } from "@repo/database";
import { guestbooksTable } from "@repo/database/schema";
import { CreateGuestbookEntryInput } from "./model";

class GuestbookService {
    public async createGuestbookEntry(feedback: CreateGuestbookEntryInput) {
        const { visitorId, name, message } = feedback;

        const [newGuestBookEntry] = await db
            .insert(guestbooksTable)
            .values({
                visitorId,
                name,
                message,
            })
            .returning();

        if (!newGuestBookEntry) {
            throw new Error("Failed to create guestbook entry");
        }

        return newGuestBookEntry;

    }

    public async getGuestbookEntries() {
        const entries = await db
            .select()
            .from(guestbooksTable)
            .orderBy(desc(guestbooksTable.createdAt));

        return entries;
    }
}

export default GuestbookService;