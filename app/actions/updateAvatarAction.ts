"use server";

import { getStudentDbIdByClerkId, updateStudentAvatarUrl } from "@/db/students";
import { getTeacherDbIdByClerkId, updateTeacherAvatarUrl } from "@/db/teachers";
import type { RoleType } from "@/types/role";
import { auth, currentUser } from "@clerk/nextjs/server";

type Input = {
  avatarUrl: string;
};

export const updateAvatarAction = async ({ avatarUrl }: Input) => {
  const { userId } = await auth();
  console.log("asd", userId);
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await currentUser();
  const role = user?.publicMetadata?.role as RoleType | undefined;

  if (!role) {
    throw new Error("User role not found");
  }

  if (role === "student") {
    const studentId = await getStudentDbIdByClerkId(userId);
    if (!studentId) {
      throw new Error("Student not found");
    }

    await updateStudentAvatarUrl(studentId, avatarUrl);
    return;
  }

  if (role === "teacher") {
    const teacherId = await getTeacherDbIdByClerkId(userId);
    if (!teacherId) {
      throw new Error("Teacher bot found");
    }

    await updateTeacherAvatarUrl(teacherId, avatarUrl);
    return;
  }

  throw new Error("Invalid role");
};
