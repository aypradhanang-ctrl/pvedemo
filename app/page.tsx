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
import { pastEvents, upcomingEvents } from "@/data/events";
import albums from "@/data/gallery-assets.json";
import { newsItems } from "@/data/news";

export default function HomePage() {
  const featuredAlbum = albums[0];
  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <HeroSection />

      <section className="relative overflow-hidden bg-neutral-950 px-5 py-24 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Upcoming events"
            title="Your next live experience"
            description="Explore concerts, festivals and live entertainment from PVE Network."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {upcomingEvents.length === 0 && (
              <div className="border border-white/10 bg-white/5 p-8 md:col-span-2 xl:col-span-3">
                <h3 className="text-2xl font-black uppercase">Watch this space</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">No upcoming events have been announced here yet. In the meantime, revisit the performances in our gallery.</p>
                <Link href="/gallery" className="mt-5 inline-block font-bold text-red-400">Explore event photographs &rarr;</Link>
              </div>
            )}
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section id="ticketing" className="bg-neutral-900 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Plan your visit"
            title="Make a night of it"
            description="Find your event, check the essentials and get ready for the show. Ticket sales are not currently open on this website."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <WorkflowCard
              icon={CalendarDays}
              title="Browse upcoming events"
              text="Check back for newly announced concerts, festivals and international shows."
            />
            <WorkflowCard
              icon={Ticket}
              title="Open event details"
              text="Look for the confirmed date, venue, artist lineup and admission information before making plans."
            />
            <WorkflowCard
              icon={MessageSquare}
              title="Know before you go"
              text="Check the event's published entry rules and show times before you travel."
            />
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Performance spotlight"
              title={featuredAlbum.title}
              description="Revisit the stage, the crowd and the confetti through photographs from the Gangtok show."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-6 text-white/70">
                {featuredAlbum.location}
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-6 text-white/70">
                Live photography
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-6 text-white/70">
                {featuredAlbum.photos.length} photographs
              </div>
            </div>

            <Link
              href={`/gallery/${featuredAlbum.slug}`}
              className="mt-8 inline-flex items-center gap-3 bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-500"
            >
              View photo album
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative min-h-[540px] overflow-hidden border border-white/10">
            <Image
              src={featuredAlbum.photos[0].src}
              alt={featuredAlbum.photos[0].alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/35 via-orange-500/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">
                From the stage
              </p>
              <h3 className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.04em]">
                {featuredAlbum.location}
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
            description="Since 2006, PVE has brought artists, audiences and brands together through live entertainment."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ValueCard icon={CalendarDays} title="300+ events" text="A broad archive of concerts, festivals, and live entertainment formats." />
            <ValueCard icon={Globe2} title="Regional reach" text="Programming built for Nepal and for audiences across international markets." />
            <ValueCard icon={Sparkles} title="Live production" text="Creative direction, lighting, sound and technical coordination for live experiences." />
            <ValueCard icon={Newspaper} title="Artist development" text="Artist management, album projects and touring across Nepal and beyond." />
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="From the archive"
              title="Moments from our history"
              description="Explore the concerts and social initiatives that helped shape PVE Network."
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
              description="Announcements and stories from PVE Network."
            />

            <div className="mt-8 space-y-4">
              {newsItems.length === 0 && (
                <div className="border border-white/10 bg-black/30 p-6">
                  <h3 className="text-2xl font-black uppercase">Updates to follow</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">There are no news announcements published here yet. Explore our event photographs while you wait.</p>
                  <Link href="/gallery" className="mt-5 inline-block font-bold text-red-400">Visit the gallery &rarr;</Link>
                </div>
              )}
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
              title="Be part of the experience"
              description="Discover the people, performances and partnerships behind PVE."
            />

            <div className="mt-8 space-y-4">
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">
                Connect your brand with live music, festivals and the audiences who make them memorable.
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">
                Explore concert photographs and revisit moments from the stage.
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">
                Learn about PVE's work in touring, artist management and event production.
              </div>
            </div>
          </div>

          <div id="newsletter" className="border border-white/10 bg-gradient-to-br from-red-950/40 via-black to-black p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
              Newsletter and membership
            </p>
            <h3 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white">
              Stay close to the music.
            </h3>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65">
              Newsletter registration is not open yet. Event announcements and updates will appear on this website.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
              <input
                disabled
                aria-label="Email address - newsletter registration not open"
                type="email"
                placeholder="Email address"
                className="h-14 border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-red-500"
              />
              <button disabled className="h-14 cursor-not-allowed bg-red-600/60 px-6 text-xs font-black uppercase tracking-[0.16em] text-white">
                Not open yet
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <MiniStat icon={Users} label="Music community" />
              <MiniStat icon={MessageSquare} label="Artist stories" />
              <MiniStat icon={Ticket} label="Event announcements" />
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
        src={albums[1].photos[0].src}
        alt={albums[1].photos[0].alt}
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
            Live music. Shared moments. Positive vibes.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            Bringing artists and audiences together in Nepal and around the world since 2006.
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
