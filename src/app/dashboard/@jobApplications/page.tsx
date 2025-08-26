import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMyJobApplications } from "@/lib/actions/job";
import { formatDistanceToNow } from "date-fns";
import { ArrowRightToLine, ClipboardPlus } from "lucide-react";
import Link from "next/link";
import Case from "case";
const JobApplicationsPage = async () => {
  const applications = await getMyJobApplications();
  console.log(applications);
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl font-bold mb-2 sm:mb-0">Your Applications</h2>
        <CardAction className="text-sm text-indigo-600 hover:underline">
          {/* Optional action */}
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="container max-w-md sm:max-w-full mx-auto space-y-4 py-4 flex flex-col   max-h-[calc(100vh-12rem)] overflow-y-scroll  ">
          {applications.map((application) => (
            <Card
              key={application.id}
              className="w-full shadow-sm rounded-lg  sm:p-6"
            >
              <CardContent className="flex flex-col md:flex-row justify-between gap-4 ">
                {/* Left Column */}
                <div className="flex flex-col flex-1 space-y-2">
                  <CardTitle className="text-lg font-semibold">
                    {application.job.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {application.job.company}
                  </p>

                  {/* Location • Type • Updated */}
                  <div className="flex flex-wrap items-center text-sm text-gray-500 gap-2">
                    <span>{application.job.location}</span>
                    <span>•</span>
                    <span>{Case.capital(application.job.type)}</span>
                    <span>•</span>
                    <span>
                      Applied{" "}
                      {formatDistanceToNow(new Date(application.appliedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {application.job.description}
                  </p>

                  {/* Salary */}
                  {application.job.salary && (
                    <span className="text-sm font-bold text-gray-900">
                      {Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(Number(application.job.salary))}
                    </span>
                  )}

                  {/* Posted By */}
                  <p className="flex items-center text-sm text-gray-400 gap-1">
                    <span>
                      Posted by: {application.job.postedBy?.name || "Unknown"}
                    </span>
                  </p>
                </div>

                {/* Right Column */}
                <div className="flex md:flex-col items-center justify-between sm:items-end md:justify-between mt-4 lg:mt-0">
                  {/* Status Badge */}
                  <Badge
                    variant={
                      application.status === "ACCEPTED"
                        ? "success"
                        : application.status === "PENDING"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {application.status}
                  </Badge>

                  {/* View Details */}
                  <Link
                    href={`/jobs/${application.job.id}`}
                    className="text-sm text-indigo-600 hover:underline mt-2 flex flex-nowrap items-center gap-1"
                  >
                    View Details <ArrowRightToLine className="inline" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobApplicationsPage;
