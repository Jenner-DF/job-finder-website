"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/auth";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "../ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const { data: session, status } = useSession();

  const navLinks = [
    { href: "/jobs", label: "Browse Jobs" },
    ...(session
      ? [
          { href: "/jobs/post", label: "Post a Job" },
          { href: "/dashboard", label: "Dashboard" },
        ]
      : []),
  ];

  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4  bg-white border-b border-gray-200">
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-4">
        <div className="relative h-10 w-10 sm:h-12 sm:w-12">
          <Image src="/logo.png" alt="logo" fill className="object-contain" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Job Finder App
        </h2>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 text-gray-600 font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
          >
            {link.label}
          </Link>
        ))}

        {status === "authenticated" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full overflow-hidden p-0"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                    {session.user?.name?.[0] || "U"}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-lg p-4">
              <DropdownMenuLabel className="text-sm text-gray-500 mb-2">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-gray-100 rounded-md p-2">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100 rounded-md p-2">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-100 rounded-md p-2"
                onClick={logout}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : status === "loading" ? (
          <Button variant="link">
            <span className="animate-spin">⏳</span>
          </Button>
        ) : (
          <Link
            href="/auth/signin"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Sign in
          </Link>
        )}
      </div>

      {/* Mobile Sheet */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <div onClick={() => setOpen(true)}>
              <Menu size={24} />
            </div>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-8">
            <SheetContent side="right" className="w-72 p-6 flex flex-col">
              {/* Header */}
              <SheetHeader className="p-0">
                <SheetTitle className="text-lg font-semibold text-gray-800">
                  Menu
                </SheetTitle>
              </SheetHeader>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-3 mt-6 border-b border-gray-200 pb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Auth Section */}
              <div className="mt-4">
                {status === "authenticated" ? (
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Sign out
                  </Button>
                ) : status === "loading" ? (
                  <span className="text-gray-500 animate-spin block text-center mt-2">
                    ⏳
                  </span>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="block w-full text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md  py-2 transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                )}
              </div>

              {/* Footer */}
              <SheetFooter className="mt-auto pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center">
                  © 2025 Job Finder App. All rights reserved.
                </p>
              </SheetFooter>
            </SheetContent>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
