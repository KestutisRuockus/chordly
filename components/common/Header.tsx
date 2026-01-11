"use client";

import { RoleType } from "@/app/sign-up/[[...sign-up]]/page";
import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role as RoleType;

  return (
    <header className="flex gap-4">
      <div>Header Component</div>
      <nav className="flex justify-between w-full px-20 py-4">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/find-teachers">Find Teachers</Link>
          {!user ? (
            <div className="flex gap-4">
              <Link href="/for-students">For Students</Link>
              <Link href="/for-teachers">For Teachers</Link>
            </div>
          ) : (
            <Link href={`/dashboard/${userRole}`}>Dashboard</Link>
          )}

          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
        </div>
        {!user ? (
          <div className="flex gap-4">
            {}
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up">Sign Up</Link>
          </div>
        ) : (
          <>
            <p>
              Hello, {user?.firstName ?? user.id}. You signed in as {userRole}
            </p>
            <SignOutButton />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
