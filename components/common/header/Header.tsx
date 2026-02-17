import type { RoleType } from "@/types/role";
import type { TeacherFullProfile } from "@/types/teachers";
import type { StudentFullProfile } from "@/types/students";
import { auth, currentUser } from "@clerk/nextjs/server";
import HeaderClient from "./HeaderClient";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { getStudentById, getStudentDbIdByClerkId } from "@/db/students";
import { getTeacherById, getTeacherDbIdByClerkId } from "@/db/teachers";
import TeacherPlan from "./TeacherPlan";
import logo from "@/public/logo.png";
import Image from "next/image";
import NavLink from "@/components/ui/NavLink";
import Link from "next/link";

type UserSummary =
  | {
      role: "student";
      data: Pick<StudentFullProfile, "id" | "fullName" | "avatarUrl">;
    }
  | {
      role: "teacher";
      data: Pick<
        TeacherFullProfile,
        "id" | "fullName" | "avatarUrl" | "plan" | "studentIds"
      >;
    };

const Header = async () => {
  const { userId } = await auth();
  if (!userId) {
    return (
      <header className="flex items-center gap-16 px-20 bg-secondary h-14">
        <Link href={"/"} className="cursor-pointer">
          <Image src={logo} alt="Chordly logo" width={72} />
        </Link>
        <nav className="flex justify-between items-center w-full">
          <div className="flex gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/find-teachers">Find Teachers</NavLink>
            <NavLink href="/for-students">For Students</NavLink>
            <NavLink href="/for-teachers">For Teachers</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
          <div className="flex gap-8">
            <NavLink href="/sign-in">Sign In</NavLink>
            <NavLink href="/sign-up">Sign Up</NavLink>
          </div>
        </nav>
      </header>
    );
  }

  const user = await currentUser();
  const userRole = user?.publicMetadata?.role as RoleType;

  const userDbId =
    userRole === "student"
      ? await getStudentDbIdByClerkId(userId)
      : await getTeacherDbIdByClerkId(userId);

  let userSummary: UserSummary;

  if (userRole === "student") {
    const student = await getStudentById(userDbId);
    userSummary = {
      role: "student",
      data: student,
    };
  } else {
    const teacher = await getTeacherById(userDbId);
    userSummary = {
      role: "teacher",
      data: teacher,
    };
  }

  return (
    <header className="flex justify-between items-center gap-4 px-20 bg-secondary h-14">
      <div className="flex items-center gap-16">
        <Link href={"/"} className="cursor-pointer">
          <Image src={logo} alt="Chordly logo" width={72} />
        </Link>
        <nav className="flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/find-teachers">Find Teachers</NavLink>
          <NavLink href={`/dashboard/${userRole}`}>Dashboard</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex gap-1">
          <p className="text-secondary-foreground">
            Welcome back,{" "}
            <span className="text-lg font-semibold">
              {userSummary.data.fullName.split(" ")[0]}
            </span>
          </p>
          <ProfileAvatar
            avatarUrl={userSummary.data.avatarUrl}
            fullName={userSummary.data.fullName}
            size={28}
          />
        </div>

        {userSummary.role === "teacher" && (
          <TeacherPlan
            plan={userSummary.data.plan}
            activeStudentsCount={userSummary.data.studentIds.length}
          />
        )}

        <HeaderClient />
      </div>
    </header>
  );
};

export default Header;
