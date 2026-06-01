import { relations } from "drizzle-orm";
import {
    pgTable,
    uuid,
    timestamp,
} from "drizzle-orm/pg-core";
import { projectReactionsTable } from "./reaction";
import { guestbooksTable } from "./guestbook";
import { projectViewsTable } from "./view";

export const visitorsTable = pgTable("visitors", {
    id: uuid("id").primaryKey().defaultRandom(),

    first_seen_at: timestamp("first_seen_at").defaultNow().notNull(),
    last_seen_at: timestamp("last_seen_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const visitorRelations = relations(visitorsTable, ({ many }) => ({
    reactions: many(projectReactionsTable),
    entries: many(guestbooksTable),
    views: many(projectViewsTable),
}))

export type SelectVisitor = typeof visitorsTable.$inferSelect;
export type InsertVisitor = typeof visitorsTable.$inferInsert;

