export const metadata = {
  title: "Job Finder App | Dashboard",
  description: "Your dashboard for managing and finding jobs.",
};
const DashboardLayout = ({
  children,
  jobApplications,
  postedJobs,
}: {
  children: React.ReactNode;
  jobApplications: React.ReactNode;
  postedJobs: React.ReactNode;
}) => {
  return (
    <div className="container mx-auto px-4  mt-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome to your dashboard! Manage your job postings and view
          applications.
        </p>
      </div>

      {/* Main Sections */}
      <div className="grid lg:grid-cols-2 gap-6 items-center  justify-center">
        {/* Job Applications Section */}
        <div className="bg-white shadow-sm rounded-lg  flex flex-col space-y-4  ">
          {jobApplications}
        </div>

        {/* Posted Jobs Section */}
        <div className="bg-white shadow-sm rounded-lg  flex flex-col space-y-4">
          {postedJobs}
        </div>
      </div>

      {/* Optional Footer / Children */}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
};

export default DashboardLayout;
