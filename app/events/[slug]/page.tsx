import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Clock3,
  Info,
  MapPin,
  Music4,
  ShieldCheck,
  Ticket,
} from "lucide-react";

import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import SiteFrame from "@/components/SiteFrame";
import { events, getEventBySlug, upcomingEvents } from "@/data/events";

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  if (event.sourceUrl) {
    return (
      <SiteFrame countdownEvents={upcomingEvents}>
        <section className="bg-gradient-to-br from-red-950 to-neutral-950 px-5 pb-20 pt-40">
          <div className="mx-auto max-w-7xl">
            <Link href="/events/past" className="text-sm text-white/70">Back to event archive</Link>
            <p className="mt-10 text-sm uppercase tracking-widest text-red-400">Past event · {event.date}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase sm:text-7xl">{event.title}</h1>
            <p className="mt-6 text-white/70">{event.location}</p>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[2fr_1fr]">
          <div>
            <SectionHeading eyebrow="From our history" title="About the event" description={event.description} />
            <h2 className="mt-10 text-2xl font-black uppercase">Artist lineup</h2>
            <p className="mt-4 leading-8 text-white/70">{event.artists}</p>
          </div>
          <aside className="h-fit border border-white/15 p-8">
            <h2 className="text-xl font-bold">Event record</h2>
            <p className="mt-5">{event.date}</p>
            <p className="mt-3 text-white/70">{event.location}</p>
            <p className="mt-5 text-sm text-white/50">This event has concluded.</p>
            <Link href="/events" className="mt-6 inline-block bg-red-600 px-5 py-3 font-bold">Explore upcoming events</Link>
          </aside>
        </section>
      </SiteFrame>
    );
  }

  const relatedEvents = events
    .filter((item) => item.slug !== event.slug)
    .slice(0, 3);

  const mapQuery = encodeURIComponent(event.location);

  const schedule = [
    ["Doors open", "4:30 PM"],
    ["Show starts", event.time],
    ["Expected end", "10:30 PM"],
  ];

  const thingsToKnow = [
    "Carry a valid ticket confirmation and a government-issued ID at entry.",
    "Arrive early for security checks, entry queues, and venue orientation.",
    "Venue instructions, rules, and QR-based check-in details will be shared after purchase.",
  ];

  const faqItems = [
    ["Where will ticket details appear?", "Booking confirmations, QR delivery, and event-day instructions will be sent to the buyer after purchase."],
    ["Is venue information easy to access?", "Yes. Timing, venue directions, and event essentials are all easy to find in one place."],
    ["Can I contact the organizer?", "Yes. Every event page includes a direct contact path for ticketing, partnerships, and general support."],
  ];

  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <section className="relative min-h-[680px] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-orange-500/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/35" />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-end px-5 pb-20 pt-[150px] lg:px-8">
          <div className="max-w-4xl">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-500">
              {event.category} event
            </p>
            <h1 className="mt-4 font-['Arial_Narrow',_'Avenir_Next_Condensed',sans-serif] text-6xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-7xl">
              {event.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              {event.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/75">
              <span className="flex items-center gap-2">
                <Clock3 size={16} className="text-red-500" />
                {event.date} · {event.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-red-500" />
                {event.location}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-500"
              >
                <Ticket size={16} />
                Ticket and support flow
              </Link>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-white/20 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
              >
                <MapPin size={16} />
                Open venue map
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Event workflow"
              title="What attendees need before they book and before they arrive"
              description="Everything you need to know before booking and before arriving at the venue."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">
                {event.date}
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">
                {event.location}
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">
                {event.price}
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="border border-white/10 bg-black/30 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
                  Show timeline
                </p>
                <div className="mt-5 space-y-4">
                  {schedule.map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between border-b border-white/10 pb-4 text-sm text-white/70 last:border-b-0 last:pb-0">
                      <span>{label}</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 bg-black/30 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
                  Things to know
                </p>
                <div className="mt-5 space-y-4">
                  {thingsToKnow.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-7 text-white/70">
                      <ShieldCheck size={18} className="mt-1 shrink-0 text-red-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-black/30 p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-500">
              Event essentials
            </p>

            <div className="mt-6 space-y-5 text-sm text-white/70">
              <div>
                <p className="text-white/40">Ticket status</p>
                <p className="mt-2 font-semibold text-white">{event.price}</p>
              </div>
              <div>
                <p className="text-white/40">Category</p>
                <p className="mt-2 font-semibold text-white">{event.category}</p>
              </div>
              <div>
                <p className="text-white/40">Location</p>
                <p className="mt-2 font-semibold text-white">{event.location}</p>
              </div>
              <div>
                <p className="text-white/40">Artist and event content</p>
                <p className="mt-2 font-semibold text-white">
                  Artist stories, media, gallery highlights, setlist details, and organizer information all live here.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 bg-red-600 px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-500"
            >
              Ask about this event
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="border border-white/10 bg-black/30 p-8">
            <div className="flex items-center gap-3">
              <Music4 size={20} className="text-red-500" />
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
                Artist spotlight
              </p>
            </div>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-white">
              A dedicated area for artist biography and listening links
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Discover artist stories, background, and listening links connected to each event.
            </p>
          </div>

          <div className="border border-white/10 bg-black/30 p-8">
            <div className="flex items-center gap-3">
              <Info size={20} className="text-red-500" />
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
                FAQs and attendee support
              </p>
            </div>
            <div className="mt-5 space-y-4">
              {faqItems.map(([question, answer]) => (
                <div key={question} className="border border-white/10 p-5">
                  <h3 className="text-lg font-black uppercase tracking-tight text-white">
                    {question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="More events"
            title="Keep exploring the calendar"
            description="The event detail route now works as a stronger bridge between discovery, conversion, and ongoing browsing."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {relatedEvents.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
