import JobPostForm from "@/components/custom-ui/JobPostForm";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Job Finder App | Post a Job",
  description: "Post a new job to find the right candidate.",
};
const PostJobPage = async () => {
  const session = await auth();
  if (!session) redirect("/auth/signin");
  return <JobPostForm />;
};

export default PostJobPage;
