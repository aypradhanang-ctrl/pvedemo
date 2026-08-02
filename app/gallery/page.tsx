import Image from "next/image";

import SectionHeading from "@/components/SectionHeading";
import SiteFrame from "@/components/SiteFrame";
import { upcomingEvents } from "@/data/events";

const galleryImages = [
  {
    id: "photos",
    title: "Event photography",
    text: "Professionally shot event coverage for headline productions and archive moments.",
    image: "/images/event-1.jpg",
  },
  {
    id: "videos",
    title: "Highlight videos",
    text: "Recap videos, reels, and showreels that bring each event back to life.",
    image: "/images/event-2.jpg",
  },
  {
    id: "bts",
    title: "Behind the scenes",
    text: "Process-driven content covering build, rehearsals, backstage energy, and production prep.",
    image: "/images/event-3.jpg",
  },
  {
    id: "media",
    title: "Media coverage",
    text: "Press stories, interviews, editorial coverage, and social-first event storytelling.",
    image: "/images/notable-1.jpg",
  },
  {
    id: "drone",
    title: "Drone footage",
    text: "A dedicated slot for scale-driven venue shots and crowd atmosphere coverage.",
    image: "/images/notable-2.jpg",
  },
  {
    id: "archive",
    title: "Event archive",
    text: "A branded visual archive connecting old productions to current event discovery.",
    image: "/assets/gallery-section.jpg",
  },
];

export default function GalleryPage() {
  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <section className="relative min-h-[520px] overflow-hidden">
        <Image
          src="/assets/gallery-section.jpg"
          alt="PVE gallery"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-end px-5 pb-20 pt-[150px] lg:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="Stage energy, crowd atmosphere, and media discovery"
            description="Explore photos, videos, drone footage, behind-the-scenes moments, and media coverage from across the PVE experience."
          />
        </div>
      </section>

      <section className="bg-neutral-950 px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Visual archive"
            title="A gallery structure built for event, media type, and artist discovery"
            description="Browse media by format, discover stories around each production, and explore moments connected to events and artists."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            {["Photos", "Videos", "Drone", "BTS", "Media", "By artist", "By event"].map((filter) => (
              <div
                key={filter}
                className="border border-white/10 bg-white/5 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white/70"
              >
                {filter}
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {galleryImages.map((item, index) => (
              <section
                key={item.id}
                id={item.id === "drone" ? undefined : item.id}
                className={`relative overflow-hidden border border-white/10 bg-white/5 ${
                  index === 0 || index === 5 ? "sm:col-span-2" : ""
                }`}
              >
                <div className={`relative ${index === 0 || index === 5 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-white/65">{item.text}</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
