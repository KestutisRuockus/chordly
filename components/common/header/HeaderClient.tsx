"use client";

import { SignOutButton } from "@clerk/nextjs";
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

const HeaderClient = () => {
  return (
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
        className="bg-secondary w-30 p-4 text-secondary-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2 duration-300"
      >
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
            <button className="flex items-center gap-2 w-full cursor-pointer">
              <LogOutIcon size={20} />
              Sign out
            </button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderClient;

{
  /* <div className="relative">
      <PanelBottomClose
        size={20}
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer ${isOpen ? "rotate-180" : ""} transition-all duration-300 text-foreground hover:text-foreground/70`}
        />

      <div
        className={`absolute right-0 mt-2 border rounded-md p-4 w-23 ${isOpen ? "h-20 opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-2 pointer-events-none"} transition-all duration-500 overflow-hidden `}
      >
        <Link href={"/profile/edit"}>Profile</Link>
        <SignOutButton>
          <button className="cursor-pointer">Sign out</button>
        </SignOutButton>
      </div>
    </div> */
}
