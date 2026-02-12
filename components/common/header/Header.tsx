import type { RoleType } from "@/types/role";
import type { TeacherFullProfile } from "@/types/teachers";
import type { StudentFullProfile } from "@/types/students";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import HeaderClient from "./HeaderClient";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { getStudentById, getStudentDbIdByClerkId } from "@/db/students";
import { getTeacherById, getTeacherDbIdByClerkId } from "@/db/teachers";
import TeacherPlan from "./TeacherPlan";

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
      <header className="flex gap-4">
        <nav className="flex justify-between w-full px-20 py-4">
          <div className="flex gap-8">
            <Link href="/">Home</Link>
            <Link href="/find-teachers">Find Teachers</Link>
            <Link href="/for-students">For Students</Link>
            <Link href="/for-teachers">For Teachers</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/about">About</Link>
          </div>
          <div className="flex gap-8">
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up">Sign Up</Link>
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
    <header className="flex gap-4">
      <nav className="flex justify-between w-full px-20 py-4">
        <div className="flex gap-8">
          <Link href="/">Home</Link>
          <Link href="/find-teachers">Find Teachers</Link>
          <Link href={`/dashboard/${userRole}`}>Dashboard</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex gap-1">
            <p>Welcome back, {userSummary.data.fullName.split(" ")[0]}</p>
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
      </nav>
    </header>
  );
};

export default Header;
