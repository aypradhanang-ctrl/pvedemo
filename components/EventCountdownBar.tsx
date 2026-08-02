"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type CountdownEvent = {
  id: number;
  slug: string;
  title: string;
  date: string;
  startsAt: string;
  location: string;
};

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

type EventCountdownBarProps = {
  events: CountdownEvent[];
};

const emptyCountdown: CountdownTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  finished: false,
};

function calculateCountdown(startsAt: string): CountdownTime {
  const eventTimestamp = new Date(startsAt).getTime();

  if (Number.isNaN(eventTimestamp)) {
    return {
      ...emptyCountdown,
      finished: true,
    };
  }

  const difference = eventTimestamp - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      finished: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    finished: false,
  };
}

export default function EventCountdownBar({
  events,
}: EventCountdownBarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState<CountdownTime>(emptyCountdown);

  const activeEvent = events[activeIndex];

  useEffect(() => {
    if (!activeEvent) {
      return;
    }

    function updateCountdown() {
      setCountdown(calculateCountdown(activeEvent.startsAt));
    }

    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, [activeEvent]);

  useEffect(() => {
    if (events.length <= 1) {
      return;
    }

    const slider = window.setInterval(() => {
      setActiveIndex((current) => (current === events.length - 1 ? 0 : current + 1));
    }, 7000);

    return () => window.clearInterval(slider);
  }, [events.length]);

  if (!activeEvent) {
    return null;
  }

  return (
    <section className="fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-black text-white shadow-[0_-12px_35px_rgba(0,0,0,0.45)]">
      <div className="mx-auto flex min-h-[96px] max-w-[1440px] items-center px-3 py-3 sm:px-6 sm:py-0 lg:px-8">
        <div className="grid w-full items-center gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-10">
          <div className="min-w-0">
            <p className="text-[8px] font-black uppercase tracking-[0.25em] text-white/50 sm:text-[10px]">
              Upcoming event
            </p>

            <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
              <h2 className="truncate text-sm font-black uppercase sm:text-lg">
                {activeEvent.title}
              </h2>

              <span className="hidden text-white/30 lg:inline">/</span>

              <p className="hidden text-xs text-white/65 lg:block">
                {activeEvent.date} · {activeEvent.location}
              </p>
            </div>
          </div>

          {countdown.finished ? (
            <div className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
              Event started
            </div>
          ) : (
            <div className="flex items-center justify-end gap-1.5 sm:gap-3">
              <CountdownUnit value={countdown.days} label="Days" />
              <CountdownSeparator />
              <CountdownUnit value={countdown.hours} label="Hours" />
              <CountdownSeparator />
              <CountdownUnit value={countdown.minutes} label="Mins" />
              <CountdownSeparator />
              <CountdownUnit value={countdown.seconds} label="Secs" />
            </div>
          )}

          <div className="col-span-2 flex items-center justify-between gap-3 lg:col-span-1 lg:justify-end">
            <div className="flex items-center gap-1.5">
              {events.map((event, index) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${event.title}`}
                  className={`h-1.5 transition-all duration-300 ${
                    activeIndex === index
                      ? "w-7 bg-red-500"
                      : "w-2 bg-white/30 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <Link
              href={`/events/${activeEvent.slug}`}
              className="flex shrink-0 items-center gap-2 border border-white/30 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] transition hover:bg-white hover:text-black sm:px-4 sm:text-[10px]"
            >
              Event details
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="min-w-9 text-center sm:min-w-14">
      <span className="block text-lg font-black leading-none text-red-500 sm:text-2xl">
        {String(value).padStart(2, "0")}
      </span>

      <span className="mt-1.5 block text-[7px] font-bold uppercase tracking-[0.14em] text-white/50 sm:text-[9px]">
        {label}
      </span>
    </div>
  );
}

function CountdownSeparator() {
  return (
    <span className="-mt-4 text-base font-black text-white/30 sm:text-xl">:</span>
  );
}
