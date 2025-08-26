"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

// Pick only the fields you want
// 1. Schema for search
const jobSearchSchema = z.object({
  jobTitle: z.string().optional(),
  jobType: z.string().optional(),
  location: z.string().optional(),
});

const JobFindForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof jobSearchSchema>>({
    resolver: zodResolver(jobSearchSchema),
    defaultValues: {
      jobTitle: searchParams.get("jobTitle") || "",
      jobType: searchParams.get("jobType") || "",
      location: searchParams.get("location") || "",
    },
  });
  // const handleSubmit = async (values: z.infer<typeof jobBasicSchema>) => {
  //   console.log("values ko to!", values);
  // };
  const onSubmit = (values: z.infer<typeof jobSearchSchema>) => {
    const params = new URLSearchParams();

    if (values.jobTitle) params.set("jobTitle", values.jobTitle);
    if (values.jobType) params.set("jobType", values.jobType);
    if (values.location) params.set("location", values.location);

    router.push(`/jobs?${params.toString()}`);
  };
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Post a Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-2 flex-wrap"
          >
            <div className="flex flex-col gap-2 lg:flex-row flex-stretch w-full">
              <Input placeholder="Job Title" {...form.register("jobTitle")} />

              <Controller
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <Input placeholder="Location" {...form.register("location")} />
            </div>

            <CardFooter className="w-full">
              <Button type="submit" className="block w-full">
                Search
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobFindForm;
