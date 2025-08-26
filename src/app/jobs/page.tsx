import JobFindForm from "@/components/custom-ui/JobFindForm";
import RenderJobsList from "@/components/custom-ui/RenderJobsList";
import { getJobsWithPoster } from "@/lib/actions/job";
export const metadata = {
  title: "Job Finder App | Browse Jobs",
  description: "Your dashboard for managing and finding jobs.",
};

const JobsList = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const Searchparams = searchParams ? await searchParams : {};
  const { jobTitle, jobType, location } = Searchparams;
  const query = jobTitle as string | undefined;
  const searchType = jobType as string | undefined;
  const searchLocation = location as string | undefined;

  const jobs = await getJobsWithPoster({
    query,
    searchType,
    searchLocation,
  });
  return (
    <div className="container max-w-5xl mx-auto space-y-4 py-8 flex flex-col ">
      <JobFindForm />
      <RenderJobsList jobs={jobs} />
    </div>
  );
};

export default JobsList;
