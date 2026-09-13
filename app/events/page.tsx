import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Ticket } from "lucide-react";

import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import SiteFrame from "@/components/SiteFrame";
import { upcomingEvents } from "@/data/events";

const eventTypes = [
  {
    id: "concerts",
    title: "Concerts",
    description: "Large-scale live shows, arena moments, and artist-led experiences.",
    match: "Concert",
  },
  {
    id: "festivals",
    title: "Festivals",
    description: "Destination-driven entertainment formats with music, food, and community energy.",
    match: "Festival",
  },
  {
    id: "international",
    title: "International",
    description: "PVE productions tailored for diaspora and regional audiences outside Nepal.",
    match: "International",
  },
];

export default function EventsPage() {
  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <section className="relative min-h-[640px] overflow-hidden">
        <Image
          src="/images/gallery/sajjan-raj-vaidya-gangtok/cover.webp"
          alt="Live photography from Sajjan Raj Vaidya in Gangtok"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-end px-5 pb-20 pt-[150px] lg:px-8">
          <div className="max-w-4xl">
            <SectionHeading
              eyebrow="Upcoming events"
              title="Find your next live experience"
              description="Concerts, festivals and live performances from PVE Network."
            />

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/75">
              <span className="inline-flex items-center gap-2 border border-white/15 bg-black/30 px-4 py-3">
                <CalendarDays size={16} className="text-red-500" />
                {upcomingEvents.length > 0 ? `${upcomingEvents.length} upcoming events` : "Event announcements to follow"}
              </span>
              <span className="inline-flex items-center gap-2 border border-white/15 bg-black/30 px-4 py-3">
                <MapPin size={16} className="text-red-500" />
                Nepal and international destinations
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Book and browse"
              title="All upcoming PVE experiences"
              description="Find dates, venues and event details as shows are announced."
            />

            <Link
              href="#ticketing"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-red-500"
            >
              <Ticket size={16} />
              Ticket information
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {upcomingEvents.length === 0 && (
              <div className="border border-white/10 bg-white/5 p-8 md:col-span-2 xl:col-span-3">
                <h2 className="text-2xl font-black uppercase">No upcoming events announced yet</h2>
                <p className="mt-4 text-sm leading-7 text-white/65">Check back for confirmed dates and admission details. Until then, explore performances from our past events.</p>
                <Link href="/gallery" className="mt-5 inline-block font-bold text-red-400">Explore the gallery &rarr;</Link>
              </div>
            )}
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-3">
          {eventTypes.map((type) => (
            <section
              key={type.id}
              id={type.id}
              className="border border-white/10 bg-white/5 p-6"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
                Event type
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white">
                {type.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/65">
                {type.description}
              </p>

              <div className="mt-6 space-y-3">
                {!upcomingEvents.some((event) => event.category === type.match) && (
                  <p className="text-sm text-white/50">No events announced in this category yet.</p>
                )}
                {upcomingEvents
                  .filter((event) => event.category === type.match)
                  .map((event) => (
                    <Link
                      key={event.slug}
                      href={`/events/${event.slug}`}
                      className="block border border-white/10 px-4 py-4 text-sm font-semibold text-white transition hover:border-red-500 hover:bg-white/5"
                    >
                      {event.title}
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section id="ticketing" className="bg-neutral-900 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Ticket information"
            title="Before you book"
            description="Ticket sales are not currently open on this website. Confirmed booking information will be published with each event."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["1. Find your event", "Explore the announced shows and choose the performance you want to attend."],
              ["2. Check the details", "Review the date, venue, admission information and published event rules."],
              ["3. Plan your visit", "Use the event's confirmed booking information when tickets become available."],
            ].map(([title, text]) => (
              <article key={title} className="border border-white/10 bg-black/30 p-6">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
