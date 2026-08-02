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

export const pastEvents: EventItem[] = [
  {
    id: 4,
    slug: "project-one-legacy-night",
    title: "Project One Legacy Night",
    date: "8 November 2025",
    shortDate: "08 NOV",
    time: "6:00 PM",
    startsAt: "2025-11-08T18:00:00+05:45",
    location: "Kathmandu, Nepal",
    city: "Kathmandu",
    country: "Nepal",
    image: "/images/notable-2.jpg",
    category: "Concert",
    price: "Completed",
    description:
      "A packed Kathmandu production that blended nostalgia, live musicianship, and large-crowd energy.",
  },
  {
    id: 5,
    slug: "himalayan-cultural-evening",
    title: "Himalayan Cultural Evening",
    date: "22 March 2026",
    shortDate: "22 MAR",
    time: "4:30 PM",
    startsAt: "2026-03-22T16:30:00+05:45",
    location: "Kathmandu, Nepal",
    city: "Kathmandu",
    country: "Nepal",
    image: "/images/event-2.jpg",
    category: "Cultural",
    price: "Completed",
    description:
      "A cultural showcase mixing contemporary presentation with traditional performance storytelling.",
  },
  {
    id: 6,
    slug: "pokhara-live-sessions",
    title: "Pokhara Live Sessions",
    date: "16 May 2026",
    shortDate: "16 MAY",
    time: "5:00 PM",
    startsAt: "2026-05-16T17:00:00+05:45",
    location: "Pokhara, Nepal",
    city: "Pokhara",
    country: "Nepal",
    image: "/images/event-3.jpg",
    category: "Concert",
    price: "Completed",
    description:
      "An outdoor live-music experience in Pokhara with a travel-friendly atmosphere.",
  },
];

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
