import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const registrationStatusEnum = pgEnum("registration_status", [
  "pending",
  "paid",
  "rejected",
]);

export const accountStatusEnum = pgEnum("account_status", [
  "pending",
  "active",
  "inactive",
]);

export const courseRegistrationsTable = pgTable("course_registrations", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerk_user_id"),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  receiptUrl: text("receipt_url").notNull(),
  status: registrationStatusEnum("status").notNull().default("pending"),
  accountStatus: accountStatusEnum("account_status").notNull().default("pending"),
  rejectionReason: text("rejection_reason"),
  consent: boolean("consent").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
});

export const insertCourseRegistrationSchema = createInsertSchema(
  courseRegistrationsTable,
).omit({
  id: true,
  createdAt: true,
  reviewedAt: true,
});

export type CourseRegistration = typeof courseRegistrationsTable.$inferSelect;
export type NewCourseRegistration = typeof courseRegistrationsTable.$inferInsert;

export type RegistrationSummary = {
  totalRegistrations: number;
  pendingOrders: number;
  approvedOrders: number;
  totalRevenue: number;
};
