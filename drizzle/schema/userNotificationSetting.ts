import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const userNotificationSettingTable = pgTable("user_notification_settings", {
    userId: varchar().notNull().references(() => UserTable.id),
    // organizationId: varchar().notNull().references(() => OrganizationTable.id),
    newJobEmailNotifications: boolean().notNull().default(false),
    // minimumRating: integer(),
    aiPrompt: varchar(),
    createdAt, updatedAt,

},
    // table => [primaryKey({ columns: [table.userId, table.organizationId] })]
)


export const userNotifRel = relations(
    userNotificationSettingTable, ({ one }) => ({
        user: one(UserTable, {
            fields: [userNotificationSettingTable.userId],
            references: [UserTable.id],
        })
    })
)