import RenderJobsList from "@/components/custom-ui/RenderJobsList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { getJobsWithPoster } from "@/lib/actions/job";
import { ClipboardPlus, ListChecksIcon } from "lucide-react";
import Link from "next/link";

const PostedJobsPage = async () => {
  const jobs = await getJobsWithPoster({
    query: undefined,
    searchType: undefined,
    searchLocation: undefined,
  });
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h2 className="text-2xl font-bold mb-2 sm:mb-0">Posted Jobs</h2>
          <CardAction className="text-sm text-indigo-600 hover:underline">
            <Link href={"/jobs/post"} className="flex items-center gap-1  p-2">
              Post a new Job <ClipboardPlus size={16} />
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="container max-w-md sm:max-w-full mx-auto space-y-4 py-4 flex flex-col   h-[calc(100vh-12rem)] overflow-y-scroll  ">
            <RenderJobsList jobs={jobs} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostedJobsPage;
