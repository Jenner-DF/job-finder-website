"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { formJobSchema } from "@/lib/validations/job";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { createJob } from "@/lib/actions/job";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const JobPostForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formJobSchema>>({
    resolver: zodResolver(formJobSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      location: "",
      jobType: "full-time",
      description: "",
      salary: "",
    },
  });
  const { isSubmitting } = useFormState({ control: form.control });

  const handleSubmit = async (values: z.infer<typeof formJobSchema>) => {
    try {
      await createJob(values); // direct server action call
      toast.success("Your job is posted!", {
        description: () => (
          <p className="text-gray-600">Candidates can now see your listing.</p>
        ),
        action: { label: "View Jobs", onClick: () => router.push("/jobs") },
        duration: 4000,
        icon: "✅",
        position: "top-center",
        style: {
          background: "#f9fafb", // off-white background
          color: "#111827", // dark color for title
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
          padding: "1rem 1.25rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      });
    } catch (err) {
      //TOAST
      toast.error("Failed to post job!", {
        description: <p className="text-red-700">Please try again.</p>,
        duration: 4000,
        icon: "❌",
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          borderRadius: "0.75rem",
          padding: "1rem",
        },
      });
    }
  };
  return (
    <div className="container max-w-xl mx-auto p-6 ">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Post a New Job
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Fill out the form below to create a job listing. Make sure to
            provide accurate details so candidates can find your posting easily.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {/* Job Title */}
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Remote / City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Job Type */}
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the job role..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Salary */}
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $50,000/year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="mt-4 w-full"
                >
                  {isSubmitting ? "Submitting..." : "Post a Job"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostForm;
