import { ArrowRight, MapPin, Phone } from "lucide-react";
import { OpenStatus } from "@/components/OpenStatus";
import { SizzleMeter } from "@/components/SizzleMeter";
import { formatPrice } from "@/lib/format";
import { formatTime } from "@/lib/hours";
import type { Business, DaySchedule, MenuGroup } from "@/lib/types";

export function Hero({
  business,
  hours,
  groups,
}: {
  business: Business;
  hours: DaySchedule[];
  groups: MenuGroup[];
}) {
  const firstOpen = hours.find((day) => !day.closed && day.close);
  const primary = groups.find((group) => group.primary) ?? groups[0];
  const signature = primary?.items.filter((item) => item.available).slice(0, 3) ?? [];

  return (
    <section id="top">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-14 pb-20 pt-8 sm:pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:pb-28 lg:pt-16">
          <div className="enter">
            <OpenStatus hours={hours} timezone={business.timezone} />

            <h1 className="mt-7 font-display text-[clamp(2.9rem,8vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              Still sizzling
              <br />
              past midnight.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-ink-2">
              Pork sisig, chicken, bangus and liempo on cast iron, with rice — in {business.area}
              {firstOpen ? `, until ${formatTime(firstOpen.close)}` : ""}.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a className="btn btn-primary" href="#menu">
                See the menu
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
              </a>
              <a className="btn btn-secondary" href={`tel:${business.phone.e164}`}>
                <Phone size={18} strokeWidth={1.75} aria-hidden />
                Call to order
              </a>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-ink-3">
              <MapPin size={15} strokeWidth={1.75} aria-hidden />
              {business.address.line}, {business.address.locality} · Walk-ins welcome
            </p>
          </div>

          <aside className="enter-late bg-surface p-7 sm:p-8" aria-label="House plates">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold">House plates</h2>
              <span className="text-sm text-ink-3">Rice included</span>
            </div>

            <ul className="mt-6 space-y-5">
              {signature.map((item) => (
                <li key={item.id} className="flex items-baseline gap-3">
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-medium text-ink">
                      {item.name}
                      {item.heat ? <SizzleMeter level={item.heat} /> : null}
                    </span>
                    {item.note ? (
                      <span className="mt-1 block text-[13px] leading-5 text-ink-3">
                        {item.note}
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 tabular-nums text-lg text-ink">
                    {formatPrice(item.price)}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#menu"
              className="mt-7 inline-flex items-center gap-1.5 text-sm text-ember-soft transition-colors hover:text-ember"
            >
              Full menu and prices
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
