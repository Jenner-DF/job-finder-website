import z from "zod";

export const formJobSchema = z.object({
  jobTitle: z
    .string()
    .trim()
    .min(2, "Job title must be at least 2 characters")
    .max(100, "Job title must be at most 100 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be at most 100 characters"),
  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be at most 100 characters"),
  jobType: z.enum(["full-time", "part-time", "contract", "internship"]),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be at most 2000 characters"),
  salary: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "Salary must be a valid number")
    .optional()
    .or(z.literal("")), // allow empty if optional
});
export const jobBasicSchema = formJobSchema
  .pick({ jobTitle: true, jobType: true, location: true })
  .partial() // makes all optional
  .refine(() => true);
