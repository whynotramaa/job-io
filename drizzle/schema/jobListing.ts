import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { OrganizationTable } from "./organizations";
import { index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { jobListingApplicationTable } from "./jobListingApplication";

export const wageIntervals = ["hourly", "yearly"] as const
export type wageInterval = typeof wageIntervals[number]
export const wageIntervalEnum = pgEnum("job_listings_wage_interval", wageIntervals)


export const locationRequirement = ["in-office", "hybrid", "remote"] as const
export type locationRequirement = typeof locationRequirement[number]
export const locationRequirementEnum = pgEnum("job_listings_location_requirement", locationRequirement)

export const experienceLevel = ["junior", "mid-level", "senior"] as const
export type experienceLevel = typeof experienceLevel[number]
export const experienceLevelEnum = pgEnum("job_listings_experience_level", experienceLevel)

export const jobLisitingStatus = ["draft", "published", "delisted"] as const
export type jobLisitingStatus = typeof jobLisitingStatus[number]
export const jobLisitingStatusEnum = pgEnum("job_listings_status", jobLisitingStatus)

export const jobListingType = ["internship", "part-time", "full-time"] as const
export type jobListingType = typeof jobListingType[number]
export const jobListingTypeEnum = pgEnum("job_listings_type", jobListingType)



export const JobListingTable = pgTable("job-listings", {
    id,
    organizationId: varchar().references(() => OrganizationTable.id, { onDelete: "cascade" }).notNull(),
    title: varchar().notNull(),
    description: text().notNull(),
    wage: integer(),
    wageInterval: wageIntervalEnum(),
    stateAbbreviation: varchar(),
    city: varchar(),
    isFeatured: boolean().notNull().default(false),
    locationRequirement: locationRequirementEnum().notNull(),
    experienceLevel: experienceLevelEnum().notNull(),
    status: jobLisitingStatusEnum().notNull().default("draft"),
    type: jobListingTypeEnum().notNull(),
    postedAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt,

},
    table => [index().on(table.stateAbbreviation)]
)

export const jobListingRef = relations(JobListingTable, ({ one, many }) => ({
    organization: one(OrganizationTable, {
        fields: [JobListingTable.organizationId],
        references: [OrganizationTable.id]
    }),
    applications: many(jobListingApplicationTable)
}))