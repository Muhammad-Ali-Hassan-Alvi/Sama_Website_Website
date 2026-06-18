"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const { t } = useTranslation();

  const switchToDark = t("theme.switchToDark");

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={toggleTheme}
      aria-label={
        mounted
          ? theme === "light"
            ? t("theme.switchToDark")
            : t("theme.switchToLight")
          : switchToDark
      }
      suppressHydrationWarning
    >
      {!mounted || theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only" suppressHydrationWarning>
        {mounted ? (theme === "light" ? t("theme.dark") : t("theme.light")) : t("theme.dark")}
      </span>
    </Button>
  );
}
