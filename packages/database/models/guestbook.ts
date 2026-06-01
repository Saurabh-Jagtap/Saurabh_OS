import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    text,
} from "drizzle-orm/pg-core";
import { visitorsTable } from "./visitor";
import { relations } from "drizzle-orm";

export const guestbooksTable = pgTable("guestbook", {
    id: uuid("id").primaryKey().defaultRandom(),

    visitorId: uuid("visitor_id").notNull().references(() => visitorsTable.id),

    name: varchar("name", { length: 255 }).notNull(),
    message: text("message").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const guestbookRelations = relations(guestbooksTable, ({ one }) => ({
    visitor: one(visitorsTable, {
        fields: [guestbooksTable.visitorId],
        references: [visitorsTable.id],
    }),
}))

export type SelectGuestbook = typeof guestbooksTable.$inferSelect;
export type InsertGuestbook = typeof guestbooksTable.$inferInsert;