import { redirect } from "next/navigation";
import { auth } from "../../../auth";

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }
  return null;
  // return <div>DashboardPage{session?.user?.name}</div>;
};

export default DashboardPage;
