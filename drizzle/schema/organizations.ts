import { varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobListingTable } from "./jobListing";
import { organizationUserSettingTable } from "./organizationUserSetting";

export const OrganizationTable = pgTable("users", {
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    imageUrl: varchar(),
    createdAt,
    updatedAt,

})

export const OrgRel = relations(
    OrganizationTable, ({ many }) => ({
        jobListings: many(JobListingTable),
        organizationUserSettings: many(organizationUserSettingTable)
    })
)