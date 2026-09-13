import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteFrame from "@/components/SiteFrame";
import { upcomingEvents } from "@/data/events";
import albums from "@/data/gallery-assets.json";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return albums.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = albums.find((item) => item.slug === slug);
  if (!album) return {};
  return { title: `${album.title} - Photos | PVE Network`, description: `Explore photographs from ${album.title}: live performances, stage atmosphere and audience moments.` };
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params;
  const album = albums.find((item) => item.slug === slug);
  if (!album) notFound();
  const [cover, ...photos] = album.photos;

  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <section className="bg-neutral-950 px-5 pb-16 pt-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/gallery#photos" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white">&larr; All albums</Link>
          <div className="mb-10 mt-10 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">{album.location} / {album.photos.length} photographs</p>
            <h1 className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-6xl">{album.title}</h1>
          </div>
          <a href={cover.src} target="_blank" rel="noopener noreferrer" aria-label={`View cover at full size in a new tab: ${cover.alt}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500">
            <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} priority sizes="(max-width: 1280px) 100vw, 1216px" className="h-auto w-full" />
          </a>
          <p className="mt-4 text-xs text-white/50">Select a photograph to view it at full size in a new tab.</p>
          <div className="mt-10 grid items-start gap-6 sm:grid-cols-2">
            {photos.map((photo, index) => (
              <figure key={photo.src} className="bg-black">
                <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`View photograph at full size in a new tab: ${photo.alt}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500">
                  <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 640px) 100vw, 50vw" className="h-auto w-full" />
                </a>
                <figcaption className="flex gap-4 px-4 py-4 text-xs leading-6 text-white/65"><span className="text-red-400">{String(index + 2).padStart(2, "0")}</span>{photo.alt}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-16 border-t border-white/15 pt-8">
            <Link href="/gallery#photos" className="text-sm font-black uppercase tracking-widest text-white">&larr; Explore more events</Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
