"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href" | "className"> & {
  href: string;
  className?: string | ((state: { isActive: boolean }) => string);
  children: ReactNode;
};

export function NavLink({ href, className, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const resolvedClass =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <Link href={href} className={resolvedClass} {...props}>
      {children}
    </Link>
  );
}
