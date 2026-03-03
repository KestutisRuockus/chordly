import { getStudentById, getStudentDbIdByClerkId } from "@/db/students";
import { getTeacherById, getTeacherDbIdByClerkId } from "@/db/teachers";
import type { RoleType } from "@/types/role";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileEditClient from "./components/ProfileEditClient";
import Main from "@/components/layout/Main";

const ProfileEdit = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const role = user?.publicMetadata?.role as RoleType;

  const userDbId =
    role === "teacher"
      ? await getTeacherDbIdByClerkId(userId)
      : await getStudentDbIdByClerkId(userId);

  let userData;
  if (role === "student") {
    userData = await getStudentById(userDbId);
  } else {
    userData = await getTeacherById(userDbId);
  }

  return (
    <Main>
      <ProfileEditClient role={role} initialData={userData} />
    </Main>
  );
};

export default ProfileEdit;
