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
          src="/assets/events-screen.jpg"
          alt="PVE upcoming events"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-end px-5 pb-20 pt-[150px] lg:px-8">
          <div className="max-w-4xl">
            <SectionHeading
              eyebrow="Upcoming calendar"
              title="Upcoming events designed for discovery, decision, and ticket action"
              description="Scan the calendar, explore event types, and move directly into the details that matter."
            />

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/75">
              <span className="inline-flex items-center gap-2 border border-white/15 bg-black/30 px-4 py-3">
                <CalendarDays size={16} className="text-red-500" />
                {upcomingEvents.length} live upcoming events
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
              description="Each event card acts as the next step in the user journey: learn more, understand the format, then move into the event page."
            />

            <Link
              href="#ticketing"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-red-500"
            >
              <Ticket size={16} />
              See ticket flow
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
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
            eyebrow="Ticket workflow"
            title="A simpler visitor journey from discovery to purchase intent"
            description="A clear path from discovering the event to taking the next step."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["1. Discover", "Scan upcoming events, categories, dates, and destinations from one page."],
              ["2. Decide", "Open the event page to review timing, venue, ticket status, FAQs, and things to know."],
              ["3. Convert", "Use ticket and enquiry actions to move into booking, sponsor interest, or customer support."],
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
