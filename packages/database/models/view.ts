import {
    pgTable,
    uuid,
    timestamp,
} from "drizzle-orm/pg-core";
import { visitorsTable } from "./visitor";
import { projectsTable } from "./project";
import { relations } from "drizzle-orm";

export const projectViewsTable = pgTable("project_views", {
    id: uuid("id").primaryKey().defaultRandom(),

    visitorId: uuid("visitor_id").notNull().references(() => visitorsTable.id),
    projectId: uuid("project_id").notNull().references(() => projectsTable.id),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectViewRelations = relations(projectViewsTable, ({ one }) => ({
    visitor: one(visitorsTable, {
        fields: [projectViewsTable.visitorId],
        references: [visitorsTable.id],
    }),
    project: one(projectsTable, {
        fields: [projectViewsTable.projectId],
        references: [projectsTable.id],
    }),
}))

export type SelectProjectViews = typeof projectViewsTable.$inferSelect;
export type InsertProjectViews = typeof projectViewsTable.$inferInsert;