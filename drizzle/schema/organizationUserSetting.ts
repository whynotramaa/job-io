import { boolean, integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { OrganizationTable } from "./organizations";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const organizationUserSettingTable = pgTable("organization_user_settings", {
    userId: varchar().notNull().references(() => UserTable.id),
    organizationId: varchar().notNull().references(() => OrganizationTable.id),
    newApplicationEmailNotifications: boolean().notNull().default(false),
    minimumRating: integer(),
    createdAt, updatedAt,
},
    table => [primaryKey({ columns: [table.userId, table.organizationId] })]
)


export const orgUserRel = relations(
    organizationUserSettingTable,
    ({ one }) => ({
        user: one(UserTable, {
            fields: [organizationUserSettingTable.userId],
            references: [UserTable.id],
        }),
        organization: one(OrganizationTable, {
            fields: [organizationUserSettingTable.userId],
            references: [OrganizationTable.id],
        }),
    }),
)