"use client";

import type { RoleType } from "@/types/role";
import { SignOutButton, useSession } from "@clerk/nextjs";
import { PanelBottomClose } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";
import NavLink from "@/components/ui/NavLink";
import { cn } from "@/lib/utils";
import { UserSummary } from "./Header";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import TeacherPlan from "./TeacherPlan";

type Props = {
  userSummary?: UserSummary;
  userRole?: RoleType;
};

const HeaderClient = ({ userSummary, userRole }: Props) => {
  const session = useSession();

  if (!session.isSignedIn) {
    return (
      <>
        <div className="hidden lg:flex gap-4">
          <NavLink href="/sign-in">Sign In</NavLink>
          <NavLink href="/sign-up">Sign Up</NavLink>
        </div>
        <div className="flex items-center lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group outline-none cursor-pointer">
                <PanelBottomClose
                  size={24}
                  className="transition-all duration-300 text-foreground hover:text-foreground/70 group-data-[state=open]:rotate-180"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className={cn(
                "bg-secondary w-30 p-4 text-secondary-foreground ",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2 duration-300",
              )}
            >
              <nav className="flex flex-col gap-4 md:hidden">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/find-teachers">Find Teachers</NavLink>
                <NavLink href="/for-students">For Students</NavLink>
                <NavLink href="/for-teachers">For Teachers</NavLink>
                <NavLink href="/pricing">Pricing</NavLink>
                <NavLink href="/faq">FAQ</NavLink>
                <NavLink href="/about">About</NavLink>
                <DropdownMenuSeparator />
              </nav>
              <DropdownMenuItem asChild>
                <NavLink href="/sign-in">Sign In</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink href="/sign-up">Sign Up</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  }

  return (
    <div className="flex">
      {userSummary && (
        <div className="hidden lg:flex items-center gap-2 mr-1">
          <ProfileAvatar
            avatarUrl={userSummary.data.avatarUrl}
            fullName={userSummary.data.fullName}
            size={28}
          />

          {userSummary.role === "teacher" && (
            <TeacherPlan
              plan={userSummary.data.plan}
              activeStudentsCount={userSummary.data.studentIds.length}
            />
          )}
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group outline-none cursor-pointer">
            <PanelBottomClose
              size={24}
              className="transition-all duration-300 text-foreground hover:text-foreground/70 group-data-[state=open]:rotate-180"
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className={cn(
            "bg-secondary w-30 p-4 text-secondary-foreground",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2 duration-300",
          )}
        >
          {userSummary && (
            <DropdownMenuItem asChild>
              <div className="lg:hidden flex flex-col gap-2">
                <ProfileAvatar
                  avatarUrl={userSummary.data.avatarUrl}
                  fullName={userSummary.data.fullName}
                  size={28}
                />

                {userSummary.role === "teacher" && (
                  <TeacherPlan
                    plan={userSummary.data.plan}
                    activeStudentsCount={userSummary.data.studentIds.length}
                  />
                )}
              </div>
            </DropdownMenuItem>
          )}
          <nav className="flex flex-col gap-4 sm:hidden">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/find-teachers">Find Teachers</NavLink>
            <NavLink href={`/dashboard/${userRole}`}>Dashboard</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/about">About</NavLink>
            <DropdownMenuSeparator />
          </nav>
          <DropdownMenuItem asChild>
            <Link
              href="/profile/edit"
              className="flex items-center gap-2 cursor-pointer"
            >
              <UserIcon size={20} />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild variant="destructive">
            <SignOutButton>
              <button className="flex items-centers gap-2 w-full cursor-pointer">
                <LogOutIcon size={20} />
                Sign out
              </button>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderClient;
