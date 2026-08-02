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
          src="/assets/past-events.jpg"
          alt="Past PVE events"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-end px-5 pb-20 pt-[150px] lg:px-8">
          <SectionHeading
            eyebrow="Archive"
            title="Past events and landmark productions"
            description="Every event shown here happened before Wednesday, July 29, 2026, giving the site a clear historical archive alongside the live calendar."
          />
        </div>
      </section>

      <section className="bg-black px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Event archive"
              title="Built show by show"
              description="These pages help the brand feel established by showing the kinds of experiences PVE has already delivered."
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
