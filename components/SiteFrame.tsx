"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import EventCountdownBar from "@/components/EventCountdownBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { EventItem } from "@/data/events";

type SiteFrameProps = {
  children: ReactNode;
  countdownEvents?: EventItem[];
};

export default function SiteFrame({
  children,
  countdownEvents = [],
}: SiteFrameProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <main className={`min-h-screen overflow-x-hidden bg-neutral-950 text-white ${countdownEvents.length > 0 ? "pb-[112px] sm:pb-[96px]" : ""}`}>
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setNavigationOpen={setNavigationOpen}
      />

      {children}
      <Footer />

      {!navigationOpen && countdownEvents.length > 0 ? (
        <EventCountdownBar events={countdownEvents} />
      ) : null}
    </main>
  );
}
