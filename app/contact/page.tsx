import { Mail, MapPin, Phone } from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import SiteFrame from "@/components/SiteFrame";
import { upcomingEvents } from "@/data/events";
import { contactDetails } from "@/data/contact";

export default function ContactPage() {
  return (
    <SiteFrame countdownEvents={upcomingEvents}>
      <section className="bg-neutral-950 px-5 pb-24 pt-[150px] lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Talk to the PVE team"
              description="Reach out for event support, sponsorships, organizer enquiries, partnerships, and general questions."
            />

            <div className="mt-8 space-y-5 text-sm text-white/70">
              {contactDetails.email && <p className="flex items-center gap-3">
                <Mail size={18} className="text-red-500" />
                <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
              </p>}
              {contactDetails.phone && <p className="flex items-center gap-3">
                <Phone size={18} className="text-red-500" />
                <a href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}>{contactDetails.phone}</a>
              </p>}
              <p className="flex items-center gap-3">
                <MapPin size={18} className="text-red-500" />
                {contactDetails.location}
              </p>
              {!contactDetails.email && !contactDetails.phone && <p className="leading-7">Public contact details will be listed here when available.</p>}
            </div>

            <div className="mt-10 space-y-4">
              <div id="organizer-enquiry" className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">
                <span className="font-semibold text-white">Organizer enquiries:</span> for event partnerships, venue collaborations, and production requests.
              </div>
              <div className="border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/65">
                <span className="font-semibold text-white">Audience support:</span> for ticket questions, event help, and customer assistance.
              </div>
            </div>
          </div>

          <fieldset disabled aria-describedby="contact-status" className="min-w-0 border border-white/10 bg-black/30 p-8">
            <p id="contact-status" className="mb-6 text-sm leading-7 text-white/65">Online enquiries are not available yet. This form is not accepting messages.</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Name" />
              <Input label="Email" />
              <Input label="Company" />
              <Input label="Subject" />
            </div>

            <label className="mt-5 block text-sm text-white/65">
              Message
              <textarea
                className="mt-2 min-h-40 w-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500"
                placeholder="Tell us what you're planning."
              />
            </label>

            <button
              type="button"
              className="mt-5 bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-500"
            >
              Enquiries not open yet
            </button>
          </fieldset>
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
