import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Case from "case";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  const recents = await prisma.job.findMany({
    take: 3,
    orderBy: { postedAt: "desc" },
  });

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      {/* Hero Card */}
      <Card className="w-full mb-8 bg-white py-20 ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold">
            Find Your Dream Job
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600 md:text-lg">
            Browse and discover the best opportunities tailored for you
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/jobs">
            <Button size="lg" className="px-6">
              Browse Jobs
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Recent Jobs Section */}
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-4">Recent Jobs</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {recents.map((job) => (
            <Card
              key={job.id}
              className="bg-white shadow hover:shadow-lg transition-all duration-300 hover:scale-105 transform ease-in-out"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {Case.title(job.title)}
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-gray-500">
                  <p className="font-medium">{Case.capital(job.company)}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {Case.capital(job.location)} • {Case.capital(job.type)}
                  </p>
                  <p className="mt-2 line-clamp-3">
                    {Case.sentence(job.description)}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardFooter className="justify-between items-center">
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-indigo-600 hover:underline flex items-center gap-1 font-medium"
                >
                  View Details <MoveRight size={16} />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Jobs Link */}
        <div className="mt-6 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:underline"
          >
            View All Jobs <MoveRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
