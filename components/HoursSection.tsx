import { HoursTable } from "@/components/HoursTable";
import { OpenStatus } from "@/components/OpenStatus";
import type { Business, DaySchedule } from "@/lib/types";

export function HoursSection({
  business,
  hours,
}: {
  business: Business;
  hours: DaySchedule[];
}) {
  return (
    <section id="hours" className="reveal scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
            When we’re open
          </h2>
          <p className="mt-4 max-w-sm text-ink-2">
            Open every day until late. Hours can move on holidays — message us before a long trip.
          </p>
          <div className="mt-6">
            <OpenStatus hours={hours} timezone={business.timezone} />
          </div>
        </div>

        <div>
          <HoursTable hours={hours} timezone={business.timezone} />
        </div>
      </div>
    </section>
  );
}
