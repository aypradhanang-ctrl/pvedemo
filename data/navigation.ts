export type MenuKey =
  | "events"
  | "past"
  | "gallery"
  | "connect"
  | "about";

export type MenuLink = {
  label: string;
  description: string;
  href: string;
};

export type NavigationMenu = {
  title: string;
  description: string;
  links: MenuLink[];
  featured: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
    href: string;
  };
};

export const navigationMenus: Record<
  MenuKey,
  NavigationMenu
> = {
  events: {
    title: "Upcoming Events",
    description:
      "Discover upcoming concerts, festivals and PVE productions.",
    links: [
      {
        label: "All Upcoming Events",
        description: "Explore every upcoming PVE experience",
        href: "/events",
      },
      {
        label: "Concerts",
        description: "Upcoming concerts and live shows",
        href: "/events#concerts",
      },
      {
        label: "Festivals",
        description: "Upcoming festivals and productions",
        href: "/events#festivals",
      },
      {
        label: "International Events",
        description: "PVE events outside Nepal",
        href: "/events#international",
      },
    ],
    featured: {
      eyebrow: "Featured event",
      title: "Let's Get Loud India",
      subtitle: "New Delhi, India",
      image: "/images/event-1.jpg",
      href: "/events/lets-get-loud-india",
    },
  },

  past: {
    title: "Past Events",
    description:
      "Explore previous concerts, festivals and major PVE productions.",
    links: [
      {
        label: "All Past Events",
        description: "Browse the full event archive",
        href: "/events/past",
      },
      {
        label: "Concerts",
        description: "Previous concerts and artist shows",
        href: "/events/past#concerts",
      },
      {
        label: "Festivals",
        description: "Previous festivals and productions",
        href: "/events/past#festivals",
      },
      {
        label: "International Events",
        description: "Past events held outside Nepal",
        href: "/events/past#international",
      },
    ],
    featured: {
      eyebrow: "Featured production",
      title: "Explore the event archive",
      subtitle: "Concerts and social initiatives since 2006",
      image: "/images/notable-2.jpg",
      href: "/events/past",
    },
  },

  gallery: {
    title: "Gallery",
    description:
      "Explore photography, videos and behind-the-scenes content.",
    links: [
      {
        label: "Photos",
        description: "Professional event photography",
        href: "/gallery#photos",
      },
      {
        label: "Videos",
        description: "Highlights and event showreels",
        href: "/gallery#videos",
      },
      {
        label: "Behind the Scenes",
        description: "Discover how events are produced",
        href: "/gallery#bts",
      },
      {
        label: "Media Coverage",
        description: "Press and featured stories",
        href: "/gallery#media",
      },
    ],
    featured: {
      eyebrow: "Latest gallery",
      title: "Sajjan Raj Vaidya in Gangtok",
      subtitle: "Explore the photo album",
      image: "/images/gallery/sajjan-raj-vaidya-gangtok/cover.webp",
      href: "/gallery/sajjan-raj-vaidya-gangtok",
    },
  },

  connect: {
    title: "Connect",
    description:
      "Partner, collaborate or communicate with PVE Network.",
    links: [
      {
        label: "Sponsorships",
        description: "Explore partnership opportunities",
        href: "/sponsorships",
      },
      {
        label: "Organize an Event",
        description: "Work with PVE on your event",
        href: "/contact#organizer-enquiry",
      },
      {
        label: "Newsletter",
        description: "Receive PVE announcements",
        href: "/#newsletter",
      },
      {
        label: "Contact Us",
        description: "Connect with the PVE team",
        href: "/contact",
      },
    ],
    featured: {
      eyebrow: "Partnerships",
      title: "Build Culture with PVE",
      subtitle: "Sponsorship opportunities",
      image: "/images/event-2.jpg",
      href: "/sponsorships",
    },
  },

  about: {
    title: "About",
    description:
      "Learn more about PVE Network and its history.",
    links: [
      {
        label: "Our Story",
        description: "Discover the PVE journey",
        href: "/about",
      },
      {
        label: "Company Portfolio",
        description: "Explore productions and milestones",
        href: "/about#portfolio",
      },
      {
        label: "Services",
        description: "Tours, artists and event production",
        href: "/about#services",
      },
      {
        label: "FAQ",
        description: "Frequently asked questions",
        href: "/about#faq",
      },
    ],
    featured: {
      eyebrow: "Since 2006",
      title: "300+ Events in 40+ Cities",
      subtitle: "Nepal and worldwide",
      image: "/images/notable-1.jpg",
      href: "/about",
    },
  },
};
