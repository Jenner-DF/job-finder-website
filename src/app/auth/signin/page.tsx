"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // or your button component
import { Github } from "lucide-react";
import Link from "next/link";
import { login } from "@/lib/auth";

export default function SignInPage() {
  return (
    <div className="w-full  min-h-full bg-gradient-to-b from-white to-gray-300 flex items-center justify-center ">
      <Card className="w-full max-w-sm text-center ">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Welcome to JobList
          </CardTitle>

          <CardDescription>
            Sign in to post jobs or apply for opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={login} className="w-full">
            <Github size={16} /> Sign in with Github
          </Button>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p className="text-sm text-gray-500 ">
            By signing in, you agree to our{" "}
            <Link href={""} className="text-indigo-500 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href={""} className="text-indigo-500 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
