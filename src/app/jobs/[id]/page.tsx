import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Building2,
  MapPin,
  Briefcase,
  CalendarDays,
  SendToBackIcon,
  ArrowLeftFromLine,
} from "lucide-react";
import Case from "case";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import ApplyButton from "./ApplyButton";
import { getJobById, isUserAppliedForThisJob } from "@/lib/actions/job";
import { auth } from "../../../../auth";
import { Button } from "@/components/ui/button";

const JobPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  const job = await getJobById(id);

  if (!job) {
    return <div className="p-6 text-red-500">Job not found</div>;
  }
  const isUserApplied = await isUserAppliedForThisJob(
    job?.id,
    session?.user?.id as string
  );
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Link
        href={"/jobs"}
        className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline mb-4"
      >
        <ArrowLeftFromLine /> Back to jobs
      </Link>
      <Card className="w-full shadow-xl border border-gray-200">
        <CardHeader className="pb-2 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">
              {job.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-base"
              >
                <Building2 className="w-4 h-4" /> {job.company}
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-base"
              >
                <MapPin className="w-4 h-4" /> {job.location}
              </Badge>
              <Badge
                variant="default"
                className="flex items-center gap-1 text-base"
              >
                <Briefcase className="w-4 h-4" /> {Case.capital(job.type)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="space-y-4 col-span-2">
              <div className="flex items-center gap-4 text-lg">
                <span className="font-semibold text-gray-700">Salary:</span>
                <span className="font-semibold text-xl">
                  {Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                    maximumFractionDigits: 0,
                  }).format(Number(job.salary))}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  Posted: {new Date(job.postedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  Updated: {new Date(job.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-1 text-sm text-gray-600 gap-4">
                {job.postedBy && (
                  <span className="flex items-center gap-1">
                    <strong>Posted By:</strong> {job.postedBy.name ?? "Unknown"}
                  </span>
                )}
                <span className="flex items-center gap-1 text-gray-400 ">
                  •{" "}
                  {formatDistanceToNow(new Date(job.postedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <Separator />
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                  Job Description
                </h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Quick Info Sidebar */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 h-fit">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Quick Info
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  📍 <span className="font-medium">Location:</span>{" "}
                  {job.location}
                </li>
                <li>
                  🏢 <span className="font-medium">Company:</span> {job.company}
                </li>
                <li>
                  💼 <span className="font-medium">Type:</span>{" "}
                  {Case.capital(job.type)}
                </li>
                <li>
                  🗓️ <span className="font-medium">Posted:</span>{" "}
                  {new Date(job.postedAt).toLocaleDateString()}
                </li>
                <li>
                  📝 <span className="font-medium">Updated:</span>{" "}
                  {new Date(job.updatedAt).toLocaleDateString()}
                </li>
                {job.postedBy && (
                  <li>
                    👤 <span className="font-medium">Poster:</span>{" "}
                    {job.postedBy.name ?? "Unknown"}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {isUserApplied ? (
            <Button disabled={isUserApplied}>
              You have already applied for this job
            </Button>
          ) : (
            <ApplyButton jobId={job.id} />
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobPage;
