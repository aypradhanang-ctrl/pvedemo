import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import SectionHeading from "@/components/SectionHeading";
import SiteFrame from "@/components/SiteFrame";
import { upcomingEvents } from "@/data/events";
import albums from "@/data/gallery-assets.json";

export const metadata: Metadata = {
  title: "Event Photography | PVE Network",
  description: "Explore live photography from Sajjan Raj Vaidya in Gangtok and Siliguri, and Chill Music Fest in Kathmandu, Chitwan and Birtamode.",
};

export default function GalleryPage() {
  const featured = albums[0];
  const backstage = albums[1].photos[4];

  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <section className="relative isolate min-h-[580px] overflow-hidden bg-neutral-950">
        <Image src={featured.photos[0].src} alt={featured.photos[0].alt} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/25" />
        <div className="relative mx-auto flex min-h-[580px] max-w-7xl items-end px-5 pb-14 pt-44 lg:px-8 lg:pb-20">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-red-400">PVE in pictures</p>
            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl">The stage.<br />The crowd.<br />The moments.</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/80">From the first note to the final encore. Explore our live shows, one photograph at a time.</p>
            <a href="#photos" className="mt-7 inline-flex border-b border-red-500 pb-2 text-xs font-black uppercase tracking-widest text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore {albums.length} event albums &darr;</a>
          </div>
        </div>
      </section>

      <section id="photos" className="scroll-mt-32 bg-neutral-950 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Event photography" title="Find your night" description="Live performances, crowd energy and a look behind the scenes across Nepal and India." />
          <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {albums.map((album, index) => (
              <Link key={album.slug} href={`/gallery/${album.slug}`} className={`group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-red-500 ${index === 0 ? "md:col-span-2" : ""}`}>
                <div className={`relative overflow-hidden bg-neutral-900 ${index === 0 ? "aspect-[3/2] md:aspect-[2/1]" : "aspect-[3/2]"}`}>
                  <Image src={album.photos[0].src} alt={album.photos[0].alt} fill sizes={index === 0 ? "(max-width: 1280px) 100vw, 1216px" : "(max-width: 768px) 100vw, 50vw"} className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
                  <span className="absolute bottom-4 left-4 bg-black/75 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white">{album.photos.length} photographs</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 border-b border-white/15 pb-5">
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-red-400">{album.location}</p>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">{album.title}</h2>
                  </div>
                  <span aria-hidden="true" className="text-3xl text-red-400">&nearr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="bts" className="scroll-mt-32 border-t border-white/10 bg-black px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <Image src={backstage.src} alt={backstage.alt} width={backstage.width} height={backstage.height} sizes="(max-width: 768px) 100vw, 50vw" className="h-auto w-full" />
          <div>
            <SectionHeading eyebrow="Behind the scenes" title="Before the lights come on" description="A different view of the live experience: the venue, the setup and the spaces waiting for an audience." />
            <Link href={`/gallery/${albums[1].slug}`} className="mt-6 inline-block text-sm font-bold text-red-400 underline underline-offset-8">Explore Siliguri photography</Link>
          </div>
        </div>
      </section>

      <section id="videos" className="scroll-mt-32 border-t border-white/10 bg-neutral-950 px-5 py-14 lg:px-8">
        <div id="media" className="mx-auto max-w-7xl scroll-mt-32">
          <h2 className="text-xl font-black uppercase text-white">Film &amp; press</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">Video highlights and press coverage are coming soon. For media enquiries, <Link href="/contact" className="text-white underline underline-offset-4">contact the PVE team</Link>.</p>
        </div>
      </section>
    </SiteFrame>
  );
}
