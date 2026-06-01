import { relations } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    boolean,
    text,
} from "drizzle-orm/pg-core";
import { projectReactionsTable } from "./reaction";
import { projectViewsTable } from "./view";

export const projectStatusEnum = pgEnum(
    "project_status",
    ["ACTIVE", "COMPLETED", "PLANNED"]
);

export const projectsTable = pgTable("projects", {
    id: uuid("id").primaryKey().defaultRandom(),

    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),

    slug: varchar("slug", { length: 255 }).notNull().unique(),
    tech_stack: varchar("tech_stack").array().notNull(),

    github_url: text("github_url"),
    live_url: text("live_url"),
    cover_image_url: text("cover_image_url"),

    status: projectStatusEnum().notNull().default("PLANNED"),
    featured: boolean("featured").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).notNull(),
});

export const projectRelations = relations(projectsTable, ({ many }) => ({
    reactions: many(projectReactionsTable),
    views: many(projectViewsTable),
}))

export type SelectProject = typeof projectsTable.$inferSelect;
export type InsertProject = typeof projectsTable.$inferInsert;
