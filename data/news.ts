export type NewsRecord = {
  id: number;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  image: string;
};

export const newsItems: NewsRecord[] = [
  {
    id: 1,
    slug: "international-expansion-2026",
    title: "PVE expands its international live-event roadmap for late 2026",
    category: "Announcement",
    publishedAt: "July 20, 2026",
    excerpt:
      "New destination programming in India and the Gulf signals a bigger international chapter for PVE's concert portfolio.",
    image: "/images/event-1.jpg",
  },
  {
    id: 2,
    slug: "inside-pve-production",
    title: "How PVE builds large-scale shows from concept to curtain call",
    category: "Behind the Scenes",
    publishedAt: "July 12, 2026",
    excerpt:
      "A look at the production systems, partner coordination, and technical planning behind complex live experiences.",
    image: "/images/notable-2.jpg",
  },
  {
    id: 3,
    slug: "pokhara-audience-growth",
    title: "Destination events are helping PVE grow audiences beyond Kathmandu",
    category: "Insight",
    publishedAt: "June 28, 2026",
    excerpt:
      "Pokhara-led programming is proving that experience-driven event travel has real momentum in Nepal.",
    image: "/images/event-3.jpg",
  },
];
