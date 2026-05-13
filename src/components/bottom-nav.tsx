"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Camera, BookOpen, Bird, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";

const TABS = [
  { href: "/", label: "덕력", icon: Sparkles },
  { href: "/add", label: "덕 쌓기", icon: Camera },
  { href: "/deeds", label: "덕행록", icon: BookOpen },
  { href: "/dex", label: "환생도감", icon: Bird },
  { href: "/me", label: "나", icon: UserRound },
];

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="주요 메뉴"
      className="sticky bottom-0 z-50 mx-auto w-full max-w-md border-t border-border bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px]",
                  active ? "text-[var(--brand)]" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("h-5 w-5", active && "drop-shadow-[0_0_8px_color-mix(in_oklab,var(--brand),transparent_55%)]")} aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
