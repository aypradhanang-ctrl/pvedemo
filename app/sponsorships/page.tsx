import SectionHeading from "@/components/SectionHeading";
import SiteFrame from "@/components/SiteFrame";
import { upcomingEvents } from "@/data/events";

const sponsorshipPillars = [
  {
    title: "Brand visibility",
    text: "Placement across stage environments, venue signage, digital promotion, and partner storytelling.",
  },
  {
    title: "Audience access",
    text: "Reach communities across concerts, festivals, cultural events, and international diaspora markets.",
  },
  {
    title: "Experience design",
    text: "Bring your brand into the live experience through event activations and audience engagement.",
  },
];

export default function SponsorshipsPage() {
  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <section className="bg-black px-5 pb-24 pt-[150px] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Sponsorships"
            title="Bring your brand closer to the music"
            description="Explore PVE's work across live entertainment, touring and brand partnerships."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {sponsorshipPillars.map((item) => (
              <article key={item.title} className="border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/65">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
                Event partnerships
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white">
                Partnerships built around each event.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/65">
                Sponsorship opportunities vary by event. Event packages and downloadable decks are not published yet.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-white/10 bg-black/30 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-500">
                    Flyer
                  </p>
                  <h3 className="mt-3 text-2xl font-black uppercase tracking-tight text-white">
                    Event opportunities
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    Event flyers and confirmed partnership opportunities will appear here as they are announced.
                  </p>
                </div>

                <div className="border border-white/10 bg-black/30 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-500">
                    Deck
                  </p>
                  <h3 className="mt-3 text-2xl font-black uppercase tracking-tight text-white">
                    Sponsorship packages
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    Package details and sponsorship decks will be available here once released.
                  </p>
                </div>
              </div>
            </div>

            <fieldset disabled aria-describedby="sponsor-status" className="min-w-0 border border-white/10 bg-black/30 p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
                Sponsor enquiry
              </p>
              <p id="sponsor-status" className="mt-4 text-sm leading-7 text-white/65">Online sponsor enquiries are not available yet. This form is not accepting messages.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Input label="Brand name" />
                <Input label="Contact email" />
                <Input label="Industry" />
                <Input label="Interested event" />
              </div>

              <label className="mt-5 block text-sm text-white/65">
                Partnership goals
                <textarea
                  className="mt-2 min-h-36 w-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500"
                  placeholder="Tell us about your event, audience, or sponsorship goals."
                />
              </label>

              <button className="mt-5 bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-500">
                Enquiries not open yet
              </button>
            </fieldset>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

function Input({ label }: { label: string }) {
  return (
    <label className="block text-sm text-white/65">
      {label}
      <input
        className="mt-2 h-12 w-full border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-red-500"
        placeholder={label}
      />
    </label>
  );
}
