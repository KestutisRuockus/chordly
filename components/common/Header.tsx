"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  return (
    <header className="flex gap-4">
      <div>Header Component</div>
      <Link href="/">Home</Link>
      {!user ? (
        <div className="flex gap-4">
          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </div>
      ) : (
        <>
          <SignOutButton>
            <button>Log out</button>
          </SignOutButton>
          {user && <p>Hello, {user?.firstName ?? user.id}</p>}
        </>
      )}
    </header>
  );
};

export default Header;
