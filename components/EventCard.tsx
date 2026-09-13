import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";

import type { EventItem } from "@/data/events";

type EventCardProps = {
  event: EventItem;
  mode?: "default" | "compact";
};

export default function EventCard({
  event,
  mode = "default",
}: EventCardProps) {
  if (mode === "compact") {
    return (
      <Link
        href={`/events/${event.slug}`}
        className="group grid gap-4 border border-white/10 bg-white/5 p-4 transition hover:border-white/25 hover:bg-white/[0.08] sm:grid-cols-[160px_minmax(0,1fr)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {event.image ? <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          /> : <div className="flex h-full items-center justify-center bg-red-950 p-4 text-center font-black">{event.title}</div>}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-red-500">
            {event.category}
          </p>

          <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-white">
            {event.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-white/65">
            {event.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/50">
            <span className="flex items-center gap-2">
              <Clock3 size={14} />
              {event.date}
            </span>

            <span className="flex items-center gap-2">
              <MapPin size={14} />
              {event.city ?? event.location}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="group overflow-hidden border border-white/10 bg-neutral-900 transition duration-500 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
      <Link
        href={`/events/${event.slug}`}
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          {event.image ? <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-950 to-neutral-950 p-8 text-center text-4xl font-black">{event.title}</div>}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="bg-red-600 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
              {event.category}
            </span>

            {event.featured ? (
              <span className="bg-black/60 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur">
                Featured
              </span>
            ) : null}

            {event.soldOut ? (
              <span className="bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-black">
                Sold out
              </span>
            ) : null}
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
              {event.date}
            </p>

            <h3 className="mt-3 text-3xl font-black uppercase leading-none tracking-[-0.03em] text-white">
              {event.title}
            </h3>
          </div>

          <p className="text-sm leading-7 text-white/65">
            {event.description}
          </p>

          <div className="space-y-2 text-sm text-white/55">
            <p className="flex items-center gap-2">
              <Clock3 size={16} className="text-red-500" />
              {event.time}
            </p>

            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-red-500" />
              {event.location}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">
            <span>{event.price}</span>
            <span className="flex items-center gap-2 text-red-500">
              View event
              <ArrowRight size={15} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
