"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import NavLink from "@/components/layout/NavLink";
import { mainNav } from "@/config/site";

export default function HeaderNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile panel whenever navigation completes. Adjusting state
  // during render (rather than in an effect) avoids an extra render pass.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  // Allow closing the mobile panel with Escape, returning focus to the toggle.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={toggleButtonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-border text-foreground outline-none transition-colors duration-200 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:hidden"
      >
        {isOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        <span className="sr-only">{isOpen ? "メニューを閉じる" : "メニューを開く"}</span>
      </button>

      <nav aria-label="メインナビゲーション" className="hidden sm:block">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {mainNav.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav
        id="mobile-nav-panel"
        hidden={!isOpen}
        aria-label="モバイルナビゲーション"
        className="absolute right-0 top-full z-20 mt-2 w-56 rounded-[10px] border border-border bg-surface p-2 shadow-md sm:hidden"
      >
        <ul className="flex flex-col gap-1 text-sm">
          {mainNav.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-[10px] px-3 py-2.5"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
