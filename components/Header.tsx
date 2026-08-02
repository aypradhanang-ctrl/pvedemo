"use client";

import Link from "next/link";
import { ChevronDown, Menu, Search, Ticket, X } from "lucide-react";
import { useState } from "react";

import DesktopMegaMenu from "@/components/DesktopMegaMenu";
import MobileMenu from "@/components/MobileMenu";
import {
  navigationMenus,
  type MenuKey,
} from "../data/navigation";

type HeaderProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setNavigationOpen: (open: boolean) => void;
};

export default function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
  setNavigationOpen,
}: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null);

  function closeAllMenus() {
    setActiveMenu(null);
    setMobileSection(null);
    setMobileMenuOpen(false);
    setNavigationOpen(false);
  }

  function openDesktopMenu(menu: MenuKey) {
    setActiveMenu(menu);
    setNavigationOpen(true);
  }

  function toggleDesktopMenu(menu: MenuKey) {
    setActiveMenu((currentMenu) => {
      const nextMenu = currentMenu === menu ? null : menu;
      setNavigationOpen(nextMenu !== null);
      return nextMenu;
    });
  }

  function closeDesktopNavigation() {
    setActiveMenu(null);
    setNavigationOpen(false);
  }

  function toggleMobileMenu() {
    const next = !mobileMenuOpen;
    setMobileMenuOpen(next);
    setActiveMenu(null);
    setMobileSection(null);
    setNavigationOpen(next);
  }

  return (
    <>
      <header
        className="group fixed inset-x-0 top-0 z-[80]"
        onMouseLeave={closeDesktopNavigation}
      >
        <div className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-6 lg:px-8">
          <div className="relative mx-auto flex h-[72px] max-w-[1080px] items-center justify-between rounded-2xl bg-white px-5 text-black shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-all duration-500 group-hover:h-[82px] group-hover:max-w-[1140px] group-hover:px-7 group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
            <nav className="hidden flex-1 items-center justify-end gap-8 lg:flex xl:gap-10">
              <NavBarItem
                label="Upcoming Events"
                active={activeMenu === "events"}
                onClick={() => toggleDesktopMenu("events")}
                onMouseEnter={() => openDesktopMenu("events")}
              />

              <NavBarItem
                label="Gallery"
                active={activeMenu === "gallery"}
                onClick={() => toggleDesktopMenu("gallery")}
                onMouseEnter={() => openDesktopMenu("gallery")}
              />

              <Link
                href="/news"
                className="text-xs font-black uppercase tracking-[0.08em] text-neutral-700 transition hover:text-red-600"
              >
                News
              </Link>
            </nav>

            <Link
              href="/"
              onClick={closeAllMenus}
              className="mx-5 flex shrink-0 items-center gap-3 xl:mx-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-sm font-black italic text-white transition-transform duration-500 group-hover:scale-105">
                PVE
              </span>

              <span className="hidden sm:block">
                <span className="block text-xs font-black uppercase tracking-[0.18em]">
                  PVE Network
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-black/45">
                  Live entertainment since 2006
                </span>
              </span>
            </Link>

            <nav className="hidden flex-1 items-center justify-start gap-8 lg:flex xl:gap-10">
              <NavBarItem
                label="Past Events"
                active={activeMenu === "past"}
                onClick={() => toggleDesktopMenu("past")}
                onMouseEnter={() => openDesktopMenu("past")}
              />

              <NavBarItem
                label="Connect"
                active={activeMenu === "connect"}
                onClick={() => toggleDesktopMenu("connect")}
                onMouseEnter={() => openDesktopMenu("connect")}
              />

              <NavBarItem
                label="About"
                active={activeMenu === "about"}
                onClick={() => toggleDesktopMenu("about")}
                onMouseEnter={() => openDesktopMenu("about")}
              />

              <Link
                href="/events#ticketing"
                className="hidden items-center gap-2 rounded-full bg-red-600 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-red-500 xl:inline-flex"
              >
                <Ticket size={14} />
                Tickets
              </Link>
            </nav>

            <div className="ml-auto flex items-center lg:hidden">
              <Link
                href="/news"
                className="mr-3 hidden h-11 w-11 items-center justify-center rounded-xl border border-black/10 text-black transition hover:bg-black hover:text-white sm:flex"
                aria-label="Open news"
              >
                <Search size={18} />
              </Link>

              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                onClick={toggleMobileMenu}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 text-black transition hover:bg-black hover:text-white"
              >
                {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
              </button>
            </div>
          </div>
        </div>

        {activeMenu ? (
          <DesktopMegaMenu
            menu={navigationMenus[activeMenu]}
            onNavigate={closeAllMenus}
          />
        ) : null}
      </header>

      <MobileMenu
        open={mobileMenuOpen}
        activeSection={mobileSection}
        onToggleSection={(key) =>
          setMobileSection((current) => (current === key ? null : key))
        }
        onNavigate={closeAllMenus}
      />
    </>
  );
}

type NavBarItemProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
};

function NavBarItem({
  label,
  active,
  onClick,
  onMouseEnter,
}: NavBarItemProps) {
  return (
    <button
      type="button"
      aria-expanded={active}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`relative flex h-[72px] items-center gap-1.5 whitespace-nowrap text-xs font-black uppercase tracking-[0.08em] transition-all duration-500 group-hover:h-[82px] ${
        active ? "text-red-600" : "text-neutral-700 hover:text-red-600"
      }`}
    >
      {label}
      <ChevronDown
        size={14}
        className={`transition-transform duration-500 ${active ? "rotate-180" : ""}`}
      />
      <span
        className={`absolute bottom-0 left-0 h-[3px] bg-red-600 transition-all duration-500 ${
          active ? "w-full" : "w-0"
        }`}
      />
    </button>
  );
}
