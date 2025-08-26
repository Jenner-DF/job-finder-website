import Link from "next/link";
import { Card, CardTitle, CardContent } from "../ui/card";
import { ArrowRightToLine } from "lucide-react";
import { JobWithPoster } from "@/lib/actions/job";
import { formatDistanceToNow } from "date-fns";
import Case from "case";

const RenderJobsList = ({ jobs }: { jobs: JobWithPoster[] }) => {
  if (!jobs) return null;
  return (
    <div className="space-y-4 ">
      {jobs.map((job) => (
        <Card key={job.id} className="w-full shadow-sm rounded-lg sm:py-6">
          <CardContent className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col flex-1 space-y-2">
              <CardTitle className="text-lg font-semibold">
                {job.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{job.company}</p>

              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-2">
                <span>{job.location}</span>
                <span>•</span>
                <span>{Case.capital(job.type)}</span>
                <span>•</span>
                <span>
                  Posted{" "}
                  {formatDistanceToNow(new Date(job.postedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <p className="text-sm text-gray-700 line-clamp-2">
                {job.description}
              </p>

              <p className="flex items-center text-sm text-gray-400 gap-1">
                <span>Posted by: {job.postedBy?.name || "Unknown"}</span>
              </p>
            </div>

            <div className="flex md:flex-col items-center justify-between sm:items-end md:justify-between mt-4 lg:mt-0">
              {job.salary && (
                <span className="text-sm font-bold text-gray-900">
                  {Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(Number(job.salary))}
                </span>
              )}

              <Link
                href={`/jobs/${job.id}`}
                className="text-sm text-indigo-600 hover:underline mt-2 flex flex-nowrap items-center gap-1"
              >
                View Details <ArrowRightToLine className="inline" />
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RenderJobsList;
