import { formatTime } from "@/lib/hours";
import type { Business, DaySchedule } from "@/lib/types";

export function SiteFooter({ business, hours }: { business: Business; hours: DaySchedule[] }) {
  const openDays = hours.filter((day) => !day.closed && day.open);
  const unique = new Set(openDays.map((day) => `${day.open}-${day.close}`));
  const summary =
    unique.size === 1 && openDays.length === 7
      ? `Open daily ${formatTime(openDays[0].open)} – ${formatTime(openDays[0].close)}`
      : "See hours above";

  const address = [
    business.address.line,
    business.address.locality,
    business.address.region,
    business.address.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="font-display text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          {business.name}
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-ink-3">Visit</p>
            <p className="mt-2 max-w-[15rem] text-[15px] leading-6 text-ink-2">{address}</p>
          </div>
          <div>
            <p className="text-xs text-ink-3">Hours</p>
            <p className="mt-2 text-[15px] leading-6 text-ink-2">{summary}</p>
          </div>
          <div>
            <p className="text-xs text-ink-3">Call</p>
            <a
              href={`tel:${business.phone.e164}`}
              className="mt-2 block tabular-nums text-[15px] leading-6 text-ink-2 transition-colors hover:text-ink"
            >
              {business.phone.display}
            </a>
          </div>
          <div>
            <p className="text-xs text-ink-3">Follow</p>
            <div className="mt-2 flex flex-col gap-1 text-[15px] leading-6">
              <a
                href={business.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 transition-colors hover:text-ink"
              >
                Facebook
              </a>
              <a
                href={business.messengerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 transition-colors hover:text-ink"
              >
                Messenger
              </a>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 transition-colors hover:text-ink"
              >
                Directions
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {business.name}. Prices may change without notice.
          </span>
          <span>{business.area}</span>
        </div>
      </div>
    </footer>
  );
}
