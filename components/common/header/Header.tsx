import type { RoleType } from "@/types/role";
import type { TeacherFullProfile } from "@/types/teachers";
import type { StudentFullProfile } from "@/types/students";
import { auth, currentUser } from "@clerk/nextjs/server";
import HeaderClient from "./HeaderClient";
import { getStudentById, getStudentDbIdByClerkId } from "@/db/students";
import { getTeacherById, getTeacherDbIdByClerkId } from "@/db/teachers";
import logo from "@/public/logo.png";
import Image from "next/image";
import NavLink from "@/components/ui/NavLink";
import Link from "next/link";

export type UserSummary =
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
      <header className="flex items-center justify-between lg:justify-start gap-16 max-xl:gap-4 px-4 bg-secondary h-14">
        <Link href={"/"} className="cursor-pointer">
          <Image src={logo} alt="Chordly logo" width={72} />
        </Link>
        <nav className="hidden md:flex gap-8 max-[1440px]:gap-4 items-center w-full">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/find-teachers">Find Teachers</NavLink>
          <NavLink href="/for-students">For Students</NavLink>
          <NavLink href="/for-teachers">For Teachers</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>
        <HeaderClient />
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
    <header className="flex justify-between items-center gap-4 px-4 max-xl:px-4 bg-secondary h-14">
      <div className="flex items-center">
        <Link href={"/"} className="cursor-pointer">
          <Image src={logo} alt="Chordly logo" width={72} />
        </Link>
        <nav className="hidden sm:flex items-center gap-4 xl:gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/find-teachers">Find Teachers</NavLink>
          <NavLink href={`/dashboard/${userRole}`}>Dashboard</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>
      </div>

      <HeaderClient userSummary={userSummary} userRole={userRole} />
    </header>
  );
};

export default Header;
