"use client";

import Link from "next/link";
import { ChevronDown, Search, Ticket } from "lucide-react";

import {
  navigationMenus,
  type MenuKey,
} from "../data/navigation";

type MobileMenuProps = {
  open: boolean;
  activeSection: MenuKey | null;
  onToggleSection: (key: MenuKey) => void;
  onNavigate: () => void;
};

export default function MobileMenu({
  open,
  activeSection,
  onToggleSection,
  onNavigate,
}: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-[70] bg-black text-white transition-all duration-500 lg:hidden ${
        open
          ? "visible translate-x-0 opacity-100"
          : "invisible translate-x-full opacity-0"
      }`}
    >
      <div className="h-full overflow-y-auto px-5 pb-10 pt-[118px]">
        <div className="border-t border-white/15">
          {(Object.keys(navigationMenus) as MenuKey[]).map((key) => {
            const menu = navigationMenus[key];
            const expanded = activeSection === key;

            return (
              <div key={key} className="border-b border-white/15">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => onToggleSection(key)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="text-2xl font-black uppercase tracking-tight">
                    {menu.title}
                  </span>

                  <ChevronDown
                    size={22}
                    className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-500 ${
                    expanded
                      ? "grid-rows-[1fr] pb-6 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mb-5 max-w-sm text-sm leading-6 text-white/55">
                      {menu.description}
                    </p>

                    <div className="space-y-1">
                      {menu.links.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onNavigate}
                          className="block border-l-2 border-transparent py-3 pl-4 transition hover:border-red-600 hover:bg-white/5"
                        >
                          <span className="block text-base font-bold">
                            {item.label}
                          </span>

                          <span className="mt-1 block text-xs text-white/45">
                            {item.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/events"
            onClick={onNavigate}
            className="flex min-h-14 items-center justify-center gap-2 bg-red-600 px-5 text-sm font-black uppercase tracking-[0.12em]"
          >
            <Ticket size={18} />
            View events
          </Link>

          <Link
            href="/news"
            onClick={onNavigate}
            className="flex min-h-14 items-center justify-center gap-2 border border-white/20 px-5 text-sm font-black uppercase tracking-[0.12em]"
          >
            <Search size={18} />
            Latest news
          </Link>
        </div>
      </div>
    </div>
  );
}
