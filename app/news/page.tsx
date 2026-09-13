import Image from "next/image";
import Link from "next/link";

import SectionHeading from "@/components/SectionHeading";
import SiteFrame from "@/components/SiteFrame";
import { upcomingEvents } from "@/data/events";
import { newsItems } from "@/data/news";

export default function NewsPage() {
  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <section className="bg-black px-5 pb-24 pt-[150px] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Newsroom"
            title="Updates, announcements, and production stories"
            description="News from PVE Network, from event announcements to stories behind the performances."
          />

          <div className="mt-12 space-y-6">
            {newsItems.length === 0 && (
              <div className="border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-black uppercase">Updates to follow</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">There are no news announcements published here yet. Explore our event photographs and past productions in the meantime.</p>
                <Link href="/gallery" className="mt-5 inline-block font-bold text-red-400">Explore the gallery &rarr;</Link>
              </div>
            )}
            {newsItems.map((item, index) => (
              <article
                key={item.slug}
                className={`grid gap-6 border border-white/10 bg-white/5 p-5 lg:grid-cols-[320px_minmax(0,1fr)] ${
                  index === 0 ? "bg-gradient-to-r from-red-950/30 to-transparent" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
                    {item.category} · {item.publishedAt}
                  </p>
                  <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-white">
                    {item.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">
                    {item.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
