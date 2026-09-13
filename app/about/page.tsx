import Image from "next/image";
import Link from "next/link";

import SectionHeading from "@/components/SectionHeading";
import SiteFrame from "@/components/SiteFrame";
import { upcomingEvents } from "@/data/events";

const milestones = [
  "2006-2015: Positive Vibes established its roots in live music and socially responsible entertainment.",
  "2016-2021: Bandwagon by Positive Vibes expanded nationwide touring and helped bring Project One together.",
  "2021 onwards: PVE Network continued its international touring and corporate event work.",
];

export default function AboutPage() {
  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <section className="bg-neutral-950 px-5 pb-24 pt-[150px] lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About PVE"
              title="Connecting artists and audiences since 2006"
              description="Founded by Bikesh Kayastha, Positive Vibes Entertainment (PVE) Network is a Kathmandu-based entertainment company working across live events, artist management and touring."
            />

            <div className="mt-8 space-y-4">
              {milestones.map((item) => (
                <div key={item} className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[560px] overflow-hidden border border-white/10">
            <Image
              src="/images/gallery/chill-music-fest-kathmandu/cover.webp"
              alt="Band performing at Chill Music Fest in Kathmandu"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          </div>
        </div>
      </section>

      <section id="portfolio" className="bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Company portfolio"
            title="From Nepal to stages around the world"
            description="PVE Network brings together entertainment, touring, production, partnerships, and large-scale live experiences under one brand."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              "300+ events across 40+ cities",
              "Artist management, touring, launches, and international shows",
              "Corporate activations, live entertainment, and cultural destination events",
            ].map((item) => (
              <div key={item} className="border border-white/10 bg-white/5 p-6 text-sm leading-7 text-white/65">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-neutral-900 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services"
            title="From the first idea to the final encore"
            description="Artist management, touring, technical production and brand partnerships are at the heart of PVE's work."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Artist management",
              "National and international tours",
              "Corporate event production",
              "Festival and concert strategy",
            ].map((item) => (
              <div key={item} className="border border-white/10 bg-black/30 p-6 text-xl font-black uppercase tracking-tight text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Get to know PVE"
              description="A few helpful answers about who we are, what we do, and where to go next."
            />
          </div>

          <div className="space-y-4">
            {[
              ["What does PVE do?", "PVE works across artist management, live events, touring, technical production and brand partnerships."],
              ["Where is PVE based?", "PVE is based in Kathmandu, Nepal, with experience delivering events across Nepal and international markets."],
              ["Where can I see past work?", "Browse the event archive for past productions and the gallery for live photographs."],
            ].map(([question, answer]) => (
              <div key={question} className="border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-black uppercase tracking-tight text-white">
                  {question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-500"
          >
            Contact PVE
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
