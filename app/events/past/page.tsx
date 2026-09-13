import Image from "next/image";

import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import SiteFrame from "@/components/SiteFrame";
import { pastEvents, upcomingEvents } from "@/data/events";

export default function PastEventsPage() {
  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <section className="relative min-h-[520px] overflow-hidden">
        <Image
          src="/images/gallery/sajjan-raj-vaidya-siliguri/cover.webp"
          alt="Live photography from Sajjan Raj Vaidya in Siliguri"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-end px-5 pb-20 pt-[150px] lg:px-8">
          <SectionHeading
            eyebrow="Archive"
            title="Past events and landmark productions"
            description="Revisit concerts and social initiatives from PVE's history."
          />
        </div>
      </section>

      <section className="bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Event archive"
              title="Built show by show"
              description="Explore the artists, places and stories behind our past productions."
            />
            <p className="text-sm text-white/45">
              Showing {pastEvents.length} past events
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
