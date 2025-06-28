import { varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { userNotificationSettingTable } from "./userNotificationSetting";
import { userResumeTable } from "./userResume";
import { organizationUserSettingTable } from "./organizationUserSetting";

export const UserTable = pgTable("users", {
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    imageUrl: varchar().notNull(),
    email: varchar().notNull().unique(),
    createdAt,
    updatedAt,

})


export const userRel = relations(UserTable, ({ one, many }) => ({
    notificationSettings: one(userNotificationSettingTable),
    resume: one(userResumeTable),
    orgUserSettings: many(organizationUserSettingTable),
}))