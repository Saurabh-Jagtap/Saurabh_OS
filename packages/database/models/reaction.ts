import {
    pgTable,
    uuid,
    timestamp,
    pgEnum,
} from "drizzle-orm/pg-core";
import { visitorsTable } from "./visitor";
import { projectsTable } from "./project";
import { unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const reactionTypeEnum = pgEnum(
    "reaction_type",
    ["FIRE", "ROCKET", "CLAP"]
);

export const projectReactionsTable = pgTable("project_reactions", {
    id: uuid("id").primaryKey().defaultRandom(),

    visitorId: uuid("visitor_id").notNull().references(() => visitorsTable.id),
    projectId: uuid("project_id").notNull().references(() => projectsTable.id),

    reaction_type: reactionTypeEnum().notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).notNull(),
},

    (table) => [
        unique("unique_visitor_project_reaction").on(
            table.visitorId,
            table.projectId
        )
    ]
);

export const projectReactionRelations = relations(projectReactionsTable, ({ one }) => ({
    visitor: one(visitorsTable, {
        fields: [projectReactionsTable.visitorId],
        references: [visitorsTable.id],
    }),
    project: one(projectsTable, {
        fields: [projectReactionsTable.projectId],
        references: [projectsTable.id],
    }),
}))

export type SelectProjectReactions = typeof projectReactionsTable.$inferSelect;
export type InsertProjectReactions = typeof projectReactionsTable.$inferInsert;