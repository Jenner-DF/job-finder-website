import JobPostForm from "@/components/custom-ui/JobPostForm";
export const metadata = {
  title: "Job Finder App | Post a Job",
  description: "Post a new job to find the right candidate.",
};
const PostJobPage = () => {
  return <JobPostForm />;
};

export default PostJobPage;
