"use client";

import { SignOutButton } from "@clerk/nextjs";
import { PanelBottomClose } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HeaderClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <PanelBottomClose
        size={16}
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer ${isOpen ? "rotate-180" : ""} transition-transform duration-500`}
      />

      <div
        className={`absolute right-0 mt-2 border rounded-md p-4 w-23 ${isOpen ? "h-20 opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-2 pointer-events-none"} transition-all duration-500 overflow-hidden `}
      >
        <Link href={"/profile/edit"}>Profile</Link>
        <SignOutButton>
          <button className="cursor-pointer">Sign out</button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default HeaderClient;
