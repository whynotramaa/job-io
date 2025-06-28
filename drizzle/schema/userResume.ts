import { pgTable, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const userResumeTable = pgTable("user_resume", {
    userId: varchar().notNull().references(() => UserTable.id),
    resumeFileUrl: varchar().notNull(),
    resumeFileKey: varchar().notNull(),
    aiSummary: varchar(),
    createdAt, updatedAt,
},

)


export const userResumeRel = relations(
    userResumeTable, ({ one }) => ({
        user: one(UserTable, {
            fields: [userResumeTable.userId],
            references: [UserTable.id],
        })
    })
)