import db, { eq } from "@repo/database";
import { visitorsTable } from "@repo/database/schema";

class VisitorService {
    public async identify(visitorId?: string) {
        // First-time visitor
        if (!visitorId) {
            const [newVisitor] = await db
                .insert(visitorsTable)
                .values({})
                .returning();

            if (!newVisitor) {
                throw new Error("Failed to create visitor");
            }

            return newVisitor;
        }

        // Returning visitor
        const [visitor] = await db
            .select()
            .from(visitorsTable)
            .where(eq(visitorsTable.id, visitorId))
            .limit(1);

        // Cookie exists but visitor doesn't
        if (!visitor) {
            const [newVisitor] = await db
                .insert(visitorsTable)
                .values({})
                .returning();

            if (!newVisitor) {
                throw new Error("Failed to create visitor");
            }

            return newVisitor;
        }

        // Update last seen
        const [updatedVisitor] = await db
            .update(visitorsTable)
            .set({
                last_seen_at: new Date(),
            })
            .where(eq(visitorsTable.id, visitorId))
            .returning();

        if (!updatedVisitor) {
            throw new Error("Failed to update visitor");
        }

        return updatedVisitor;
    }
}

export default VisitorService;