"use server";
// app/jobs/post/actions.ts (or anywhere in app)
import { formJobSchema } from "@/lib/validations/job";
import type { z } from "zod";
import { auth } from "../../../auth";
import prisma from "../prisma";
import { Session } from "next-auth";

export async function getMyJobApplications(session: Session) {
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    include: { job: { include: { postedBy: true } } },
    orderBy: { appliedAt: "desc" },
  });
  return applications;
}

export async function createJob(data: z.infer<typeof formJobSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Validate with Zod
  const parsed = formJobSchema.parse(data);

  const job = await prisma.job.create({
    data: {
      title: parsed.jobTitle,
      company: parsed.company,
      location: parsed.location,
      type: parsed.jobType,
      description: parsed.description,
      salary: parsed.salary ?? null,
      postedById: session.user.id,
    },
  });

  return job;
}

interface GetJobsParams {
  query?: string;
  searchType?: string;
  searchLocation?: string;
}
export type JobWithPoster = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string | null;
  postedAt: Date;
  updatedAt: Date;
  postedById: string;
  postedBy?: { name: string } | null;
};

export async function getJobsWithPoster(
  params: GetJobsParams
): Promise<JobWithPoster[]> {
  const { query, searchType, searchLocation } = params;
  const jobs: JobWithPoster[] = await prisma.job.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { company: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        searchType ? { type: searchType } : {},
        searchLocation
          ? {
              location: { contains: searchLocation, mode: "insensitive" },
            }
          : {},
      ],
    },
    orderBy: { postedAt: "desc" },
    include: { postedBy: true },
  });
  return jobs;
}

export async function getJobById(id: string) {
  const job = await prisma.job.findUnique({
    where: { id: id as string },
    include: { postedBy: true },
  });
  return job;
}
export async function isUserAppliedForThisJob(
  jobId: string,
  sessionUserId: string
) {
  const existingApplication = await prisma.application.findFirst({
    where: { jobId, userId: sessionUserId },
  });
  if (!existingApplication) return false;

  return true;
}
export async function applyJob(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  const existingApplication = await prisma.application.findFirst({
    where: { jobId, userId: session.user.id },
  });
  if (existingApplication) {
    throw new Error("You have already applied for this job");
  }
  await prisma.application.create({
    data: {
      jobId: job.id,
      userId: session.user.id,
      status: "PENDING",
    },
  });

  // Here you can add logic to record the application, e.g., create an Application record
  // For simplicity, we'll just return a success message

  return { message: "Application submitted successfully!" };
}
export async function deleteJob(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.postedById !== session.user.id) {
    throw new Error("You are not authorized to delete this job");
  }

  await prisma.job.delete({
    where: { id },
  });

  return true;
}
