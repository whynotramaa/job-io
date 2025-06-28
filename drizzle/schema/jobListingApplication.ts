import { integer, pgEnum, pgTable, primaryKey, text, uuid, varchar } from "drizzle-orm/pg-core"
import { JobListingTable } from "./jobListing"
import { UserTable } from "./user"
import { createdAt, updatedAt } from "../schemaHelpers"
import { relations } from "drizzle-orm"


export const applicationStage = [
    "denied", "applied", "interested", "interviewed", "hired",
] as const

export type ApplicationStage = (typeof applicationStage)[number]
export const applicationStageEnum = pgEnum("job_listing_application_stage", applicationStage)



export const jobListingApplicationTable = pgTable("job_listing_applications", {
    jobLisitingId: uuid().references(() => JobListingTable.id, { onDelete: "cascade" }).notNull(),
    userId: varchar().references(() => UserTable.id, { onDelete: "cascade" }).notNull(),
    coverLetter: text(),
    rating: integer(),
    stage: applicationStageEnum().notNull().default("applied"),
    createdAt,
    updatedAt,

},
    table => [primaryKey({ columns: [table.jobLisitingId, table.userId] })]
)


export const jobListingApp = relations(jobListingApplicationTable, ({ one }) => ({
    jobListing: one(JobListingTable, {
        fields: [jobListingApplicationTable.jobLisitingId],
        references: [JobListingTable.id]
    }),
    user: one(UserTable, {
        fields: [jobListingApplicationTable.userId],
        references: [UserTable.id]
    })
}))