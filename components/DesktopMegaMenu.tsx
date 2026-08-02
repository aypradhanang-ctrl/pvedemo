"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { NavigationMenu } from "../data/navigation";

type DesktopMegaMenuProps = {
  menu: NavigationMenu;
  onNavigate: () => void;
};

export default function DesktopMegaMenu({
  menu,
  onNavigate,
}: DesktopMegaMenuProps) {
  return (
    <div className="fixed inset-x-0 top-[112px] z-[75] hidden border-t border-white/10 bg-neutral-950 text-white shadow-2xl lg:block">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[0.8fr_1.3fr_0.9fr] gap-12 px-8 py-10">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-red-500">
            Explore
          </p>

          <h2 className="mt-4 font-['Arial_Narrow',_'Avenir_Next_Condensed',sans-serif] text-5xl font-black uppercase leading-none tracking-[-0.04em]">
            {menu.title}
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
            {menu.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
          {menu.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="group border-b border-white/10 py-5"
            >
              <span className="flex items-center justify-between text-lg font-black uppercase tracking-tight">
                <span className="transition group-hover:text-red-500">
                  {item.label}
                </span>

                <ArrowRight
                  size={18}
                  className="-translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                />
              </span>

              <span className="mt-2 block text-xs leading-5 text-white/45">
                {item.description}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href={menu.featured.href}
          onClick={onNavigate}
          className="group relative min-h-[240px] overflow-hidden bg-white/5"
        >
          <Image
            src={menu.featured.image}
            alt={menu.featured.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-red-500">
              {menu.featured.eyebrow}
            </p>

            <h3 className="mt-2 text-2xl font-black uppercase leading-tight text-white">
              {menu.featured.title}
            </h3>

            <p className="mt-3 text-xs text-white/65">
              {menu.featured.subtitle}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
