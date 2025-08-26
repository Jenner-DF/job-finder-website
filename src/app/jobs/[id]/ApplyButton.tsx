"use client";
import { Button } from "@/components/ui/button";
import { applyJob, isUserAppliedForThisJob } from "@/lib/actions/job";
import { BookMarked, DoorOpen, ListCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ApplyButton = ({ jobId }: { jobId: string }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const router = useRouter();

  const handleApply = async () => {
    // Logic to handle job application, e.g., redirect to application form or open a modal
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    try {
      setLoading(true);
      await toast.promise(applyJob(jobId), {
        loading: "Applying...",
        success: "Application submitted successfully!",
        error: "Failed to apply for the job.",
      });
      setApplied(true);
    } catch (error: unknown) {
      // Since you threw `new Error(...)`, this will always be an Error
      if (error instanceof Error) {
        toast.error(error.message); // show the message in toast
        console.error(error); // log full error
      } else {
        // fallback for any unexpected non-Error throws
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };
  if (status === "loading") {
    return (
      <Button disabled className="w-full">
        Loading...
      </Button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Link href={"/auth/signin"}>
        <Button disabled className="w-full">
          Sign in to apply
        </Button>
      </Link>
    );
  }
  if (applied) {
    return (
      <Button className="w-full" disabled={true}>
        You have already applied for this job
      </Button>
    );
  }
  return (
    <Button disabled={loading} className="w-full" onClick={() => handleApply()}>
      <span>
        <BookMarked />
      </span>
      Apply Now
    </Button>
  );
};

export default ApplyButton;
