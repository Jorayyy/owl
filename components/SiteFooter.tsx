import { formatTime } from "@/lib/hours";
import type { Business, DaySchedule } from "@/lib/types";

export function SiteFooter({ business, hours }: { business: Business; hours: DaySchedule[] }) {
  const openDays = hours.filter((day) => !day.closed && day.open);
  const unique = new Set(openDays.map((day) => `${day.open}-${day.close}`));
  const summary =
    unique.size === 1 && openDays.length === 7
      ? `Open daily ${formatTime(openDays[0].open)} – ${formatTime(openDays[0].close)}`
      : "See hours above";

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xl">{business.name}</p>
            <p className="mt-1 text-sm text-ink-3">
              {business.area} · {summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-ink-2">
            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
              Facebook
            </a>
            <a
              href={business.messengerUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
              Messenger
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
              Directions
            </a>
          </div>
        </div>
        <p className="mt-8 text-xs text-ink-3">
          © {new Date().getFullYear()} {business.name}. Prices may change without notice.
        </p>
      </div>
    </footer>
  );
}
