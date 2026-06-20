import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
};

const sizeClasses = {
  sm: "h-8",
  md: "h-12",
  lg: "h-16",
  xl: "h-20",
} as const;

/** Logo lockup — 677×369, transparent background. */
export function BrandLogo({ className, size = "md", priority }: BrandLogoProps) {
  return (
    <Image
      src="/logo-removebg-preview.png"
      alt="Zyvron Tech"
      width={677}
      height={369}
      priority={priority}
      className={cn(
        "w-auto max-w-[min(100%,18rem)] object-contain object-left transition group-hover:scale-[1.02]",
        sizeClasses[size],
        className,
      )}
    />
  );
}
