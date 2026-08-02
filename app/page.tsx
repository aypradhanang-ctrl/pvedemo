import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Globe2,
  MessageSquare,
  Newspaper,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";

import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import SiteFrame from "@/components/SiteFrame";
import { featuredEvent, pastEvents, upcomingEvents } from "@/data/events";
import { newsItems } from "@/data/news";

export default function HomePage() {
  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <HeroSection />

      <section className="relative overflow-hidden bg-neutral-950 px-5 py-24 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Upcoming first"
            title="Lead visitors straight into live events"
            description="Step into the latest PVE experiences first, then explore the stories, partners, and energy behind them."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section id="ticketing" className="bg-neutral-900 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Ticket journey"
            title="A homepage flow built around discovery, decision, and conversion"
            description="Discover the event, explore the details, and move quickly toward the next step."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <WorkflowCard
              icon={CalendarDays}
              title="Browse upcoming events"
              text="Lead with upcoming events first, then let users compare type, date, city, and price."
            />
            <WorkflowCard
              icon={Ticket}
              title="Open event details"
              text="Move visitors into a richer event page with ticket status, timings, venue details, and FAQs."
            />
            <WorkflowCard
              icon={MessageSquare}
              title="Take the next action"
              text="Guide users toward booking, sign-up, sponsorship enquiry, WhatsApp help, or direct support."
            />
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Notable event"
              title={featuredEvent.title}
              description={featuredEvent.description}
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-6 text-white/70">
                {featuredEvent.date}
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-6 text-white/70">
                {featuredEvent.location}
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-6 text-white/70">
                {featuredEvent.price}
              </div>
            </div>

            <Link
              href={`/events/${featuredEvent.slug}`}
              className="mt-8 inline-flex items-center gap-3 bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-500"
            >
              Explore event
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative min-h-[540px] overflow-hidden border border-white/10">
            <Image
              src={featuredEvent.image}
              alt={featuredEvent.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/35 via-orange-500/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">
                {featuredEvent.date}
              </p>
              <h3 className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.04em]">
                {featuredEvent.city}, {featuredEvent.country}
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why PVE"
            title="Built for scale, atmosphere, and cultural momentum"
            description="Built to feel premium, current, and globally relevant across every event touchpoint."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ValueCard icon={CalendarDays} title="300+ events" text="A broad archive of concerts, festivals, and live entertainment formats." />
            <ValueCard icon={Globe2} title="Regional reach" text="Programming built for Nepal and for audiences across international markets." />
            <ValueCard icon={Sparkles} title="Premium production" text="Creative direction, staging, and sponsor activations designed to feel intentional." />
            <ValueCard icon={Newspaper} title="Story-led growth" text="News, visuals, and archive pages that help the brand feel alive beyond ticket sales." />
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="From the archive"
              title="Past events that still define the brand"
              description="Past productions remain part of the visitor journey by reinforcing trust, scale, and recall."
            />

            <div className="mt-8 space-y-4">
              {pastEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} mode="compact" />
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Newsroom"
              title="Recent updates and production stories"
              description="News and updates stay visible on the homepage so the site feels active between launches."
            />

            <div className="mt-8 space-y-4">
              {newsItems.map((item) => (
                <article key={item.slug} className="grid gap-5 border border-white/10 bg-black/30 p-4 sm:grid-cols-[200px_minmax(0,1fr)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
                      {item.category} · {item.publishedAt}
                    </p>
                    <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">
                      {item.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Sponsors and community"
              title="Keep the site useful after the first click"
              description="The site needs to support sponsorships, sign-up, and brand recall in addition to ticket intent."
            />

            <div className="mt-8 space-y-4">
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">
                Sponsorships should feel event-specific, premium, and action-oriented.
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">
                News and updates should support ongoing engagement and artist or event discovery.
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">
                Sign-up, WhatsApp, and chatbot flows can be layered in later without restructuring the site.
              </div>
            </div>
          </div>

          <div id="newsletter" className="border border-white/10 bg-gradient-to-br from-red-950/40 via-black to-black p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
              Newsletter and membership
            </p>
            <h3 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white">
              Keep fans close between event launches.
            </h3>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65">
              Sign up for announcements, presale access, artist updates, and priority event drops.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
              <input
                type="email"
                placeholder="Email address"
                className="h-14 border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-red-500"
              />
              <button className="h-14 bg-red-600 px-6 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-500">
                Join PVE
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <MiniStat icon={Users} label="Community-first updates" />
              <MiniStat icon={MessageSquare} label="WhatsApp and chat ready" />
              <MiniStat icon={Ticket} label="Presale and ticket alerts" />
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden">
      <Image
        src="/images/hero-event.jpg"
        alt="Crowd at a PVE event"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.2),transparent_35%)]" />

      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 pb-24 pt-[150px] lg:px-8">
        <div className="max-w-4xl">
          <p className="inline-flex items-center gap-3 border border-white/20 bg-black/30 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/80 backdrop-blur sm:text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            Live entertainment, festivals, and cultural experiences
          </p>

          <h1 className="mt-7 font-['Arial_Narrow',_'Avenir_Next_Condensed',sans-serif] text-6xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-7xl lg:text-[7rem]">
            Upcoming events first. Premium brand energy throughout.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            Discover the event, feel the energy, and move naturally toward tickets, updates, or sponsorship opportunities.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-3 bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-500"
            >
              View events
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/news"
              className="inline-flex items-center gap-3 border border-white/20 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Latest updates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof CalendarDays;
  title: string;
  text: string;
}) {
  return (
    <article className="border border-white/10 bg-white/5 p-6">
      <Icon size={22} className="text-red-500" />
      <h3 className="mt-5 text-2xl font-black uppercase tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
    </article>
  );
}

function WorkflowCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof CalendarDays;
  title: string;
  text: string;
}) {
  return (
    <article className="border border-white/10 bg-black/30 p-6">
      <Icon size={22} className="text-red-500" />
      <h3 className="mt-5 text-2xl font-black uppercase tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
    </article>
  );
}

function MiniStat({
  icon: Icon,
  label,
}: {
  icon: typeof CalendarDays;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/70">
      <Icon size={18} className="text-red-500" />
      <span>{label}</span>
    </div>
  );
}
