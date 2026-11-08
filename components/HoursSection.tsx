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
    <section id="hours" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-4xl tracking-[-0.02em] sm:text-5xl">
            When we’re open
          </h2>
          <p className="mt-4 max-w-sm text-ink-2">
            Hours can change on holidays. Message us to confirm before a long trip.
          </p>
          <div className="mt-6">
            <OpenStatus hours={hours} timezone={business.timezone} />
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-2">
          <HoursTable hours={hours} timezone={business.timezone} />
        </div>
      </div>
    </section>
  );
}
