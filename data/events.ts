import { verifiedArchive } from "./archive";

export type EventItem = {
  id: number;
  slug: string;
  title: string;
  date: string;
  shortDate?: string;
  time: string;
  startsAt: string;
  location: string;
  city?: string;
  country?: string;
  image: string;
  category: string;
  price: string;
  description?: string;
  featured?: boolean;
  soldOut?: boolean;
  artists?: string;
  sourceUrl?: string;
};

export const upcomingEvents: EventItem[] = [
  {
    id: 1,
    slug: "lets-get-loud-india",
    title: "Let's Get Loud India",
    date: "18 September 2026",
    shortDate: "18 SEP",
    time: "6:00 PM",
    startsAt: "2026-09-18T18:00:00+05:30",
    location: "New Delhi, India",
    city: "New Delhi",
    country: "India",
    image: "/images/event-1.jpg",
    category: "International",
    price: "Tickets available soon",
    description:
      "A major international live-music experience bringing leading Nepali artists and audiences together.",
    featured: true,
  },
  {
    id: 2,
    slug: "project-one-live",
    title: "Project One Live",
    date: "10 October 2026",
    shortDate: "10 OCT",
    time: "5:30 PM",
    startsAt: "2026-10-10T17:30:00+05:45",
    location: "Kathmandu, Nepal",
    city: "Kathmandu",
    country: "Nepal",
    image: "/images/event-2.jpg",
    category: "Concert",
    price: "From NPR 1,500",
    description:
      "A large-scale live concert featuring leading Nepali rock artists.",
  },
  {
    id: 3,
    slug: "pve-music-festival",
    title: "PVE Music Festival",
    date: "21 November 2026",
    shortDate: "21 NOV",
    time: "2:00 PM",
    startsAt: "2026-11-21T14:00:00+05:45",
    location: "Pokhara, Nepal",
    city: "Pokhara",
    country: "Nepal",
    image: "/images/event-3.jpg",
    category: "Festival",
    price: "From NPR 2,000",
    description:
      "A full-day music and entertainment festival in Pokhara.",
  },
];

export const pastEvents: EventItem[] = verifiedArchive;

export const events: EventItem[] = [
  ...upcomingEvents,
  ...pastEvents,
];

export const featuredEvent =
  upcomingEvents.find((event) => event.featured) ??
  upcomingEvents[0];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
