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
  doorsOpen?: string;
  endsAt?: string;
  rules?: string[];
  faq?: { question: string; answer: string }[];
  artistBio?: string;
  organizer?: string;
};

// I publish upcoming dates and prices only after PVE confirms them.
export const upcomingEvents: EventItem[] = [];

export const pastEvents: EventItem[] = verifiedArchive;

export const events: EventItem[] = [
  ...upcomingEvents,
  ...pastEvents,
];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
