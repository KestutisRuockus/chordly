import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const NavLink = ({ href, children, className }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        "transition-all duration-300 text-foreground px-4 max-xl:px-2 py-0.5 rounded-md",
        "relative top-0 right-0 hover:top-0.5 hover:right-0.5 hover:text-foreground/70 shadow-md hover:shadow-sm hover:bg-muted-foreground/40",
        "text-sm lg:text-base text-nowrap",
        className,
      )}
    >
      {children}
    </Link>
  );
};
export default NavLink;
