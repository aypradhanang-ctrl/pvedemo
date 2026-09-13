import Link from "next/link";
import { contactDetails } from "@/data/contact";

const exploreLinks = [
  { label: "Upcoming Events", href: "/events" },
  { label: "Past Events", href: "/events/past" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Sponsorships", href: "/sponsorships" },
  { label: "FAQ", href: "/about#faq" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  { label: "Terms and Conditions", href: "/contact" },
  { label: "Privacy Policy", href: "/contact" },
  { label: "Careers", href: "/contact" },
  { label: "Help", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link href="/" className="flex w-fit items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-sm font-black italic">
                PVE
              </span>

              <span>
                <span className="block font-extrabold uppercase tracking-[0.18em]">
                  PVE Network
                </span>
                <span className="mt-1 block text-xs text-white/45">
                  Established 2006
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm leading-7 text-white/55">
              Connecting artists, audiences, and brands through high-energy live experiences across Nepal and beyond.
            </p>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
              Stay connected
            </h3>

            <div className="mt-6 space-y-3 text-sm text-white/55">
              <p>{contactDetails.location}</p>
              {contactDetails.email && <a className="block" href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>}
              {contactDetails.phone && <a className="block" href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}>{contactDetails.phone}</a>}
              <p>Explore live photography, past productions and the story of PVE Network.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PVE Network. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <Link href="/sponsorships" className="transition hover:text-white">
              Sponsorships
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{title}</h3>

      <ul className="mt-6 space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/55 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
