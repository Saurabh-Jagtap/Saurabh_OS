import db, { and, desc, eq, isNull } from "@repo/database";
import { guestbooksTable } from "@repo/database/schema";
import { CreateGuestbookEntryInput, deleteEntrySchema, updateEntrySchema } from "./model";

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

    public async getGuestbookEntries(limit?: number) {
        let entries;

        if (limit) {
            entries = await db
                .select()
                .from(guestbooksTable)
                .where(isNull(guestbooksTable.deletedAt))
                .orderBy(desc(guestbooksTable.createdAt))
                .limit(limit);

            return entries;
        }
        
        entries = await db
            .select()
            .from(guestbooksTable)
            .where(isNull(guestbooksTable.deletedAt))
            .orderBy(desc(guestbooksTable.createdAt));

        return entries;
    }

    public async deleteGuestbookEntry(entry: deleteEntrySchema) {
        let entryId = entry.entryId.trim()
        let visitorId = entry.visitorId.trim()
        if (!visitorId || !entryId) throw new Error("Guestbook ID and visitorId required");

        const [deletedEntry] = await db
            .update(guestbooksTable)
            .set({
                deletedAt: new Date()
            })
            .where(and(
                eq(guestbooksTable.id, entryId),
                eq(guestbooksTable.visitorId, visitorId),
                isNull(guestbooksTable.deletedAt)
            ))
            .returning()

        if (!deletedEntry) {
            throw new Error("Entry not found or you do not have permission to delete it.");
        }

        return deletedEntry
    }

    public async updateGuestbookEntry(entry: updateEntrySchema) {
        if (!entry.entryId || !entry.visitorId) {
            throw new Error(
                "Guestbook ID and visitorId required"
            );
        }

        const updatePayload: Partial<typeof guestbooksTable.$inferInsert> = {};

        if (entry.name?.trim()) {
            updatePayload.name = entry.name.trim();
        }

        if (entry.message?.trim()) {
            updatePayload.message = entry.message.trim()
        }

        if (Object.keys(updatePayload).length === 0) {
            throw new Error("No valid fields provided to update");
        }

        const [updatedEntry] = await db
            .update(guestbooksTable)
            .set(updatePayload)
            .where(and(
                eq(guestbooksTable.id, entry.entryId),
                eq(guestbooksTable.visitorId, entry.visitorId),
                isNull(guestbooksTable.deletedAt)
            ))
            .returning()

        if (!updatedEntry) {
            throw new Error("Failed to update the entry (not found or unauthorized)")
        }

        return updatedEntry;
    }
}

export default GuestbookService;