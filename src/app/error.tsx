"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="container flex items-center justify-center  bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="text-center space-y-4">
          <CardTitle className="text-2xl">Something went wrong</CardTitle>
          <CardDescription className="text-red-600">
            {error?.message || "An unexpected error occurred."}
          </CardDescription>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="default" onClick={() => router.push("/")}>
              Go Home
            </Button>
            <Button variant="secondary" onClick={reset}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
