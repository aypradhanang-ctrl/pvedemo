# Publication status

The design is approved. I am retaining the approved sections and styling while completing the content.

## Published source material

- Company history, founding year, founder, Kathmandu base, services and scale: client's Website Discovery Questionnaire.
- Seven historical event records: client portfolio spreadsheet, SOCIAL EVENTS rows 4-10, linked in `archive.ts`.
- Five photographed events: client-supplied Drive folders, filenames and sources recorded in `gallery-assets.json`.

## Awaiting confirmation

- Upcoming events: confirmed names, dates, time zones, venues, artists, prices and ticket status. The three demo records have been removed, including their public detail routes and countdowns.
- News: approved stories and publication dates. Invented announcements have been removed rather than relabelled as real news.
- Contact: official public email, phone and social URLs. The demo email and phone have been removed. I have not used private questionnaire contacts as public contact details.
- Sponsorships: event flyers, packages and decks. The page now states that these are not published yet.

## Inactive services

Newsletter, contact and sponsor forms are disabled and labelled as unavailable until their integrations are built. No working booking, QR delivery, presale, WhatsApp or chatbot service is implied by the copy.

## Adding approved content

- Add confirmed upcoming records to `events.ts`; keep unknown optional timings, rules and biographies empty rather than supplying defaults.
- Add approved news to `news.ts`.
- Set verified public channels in `contact.ts`; the contact page and footer share this data.
- Empty-state sections automatically yield to event/news records when they are added. The countdown returns when upcoming records are published.

No new dates, prices, public contact channels or news announcements were confirmed by the client during this cleanup.
