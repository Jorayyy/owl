import { MapPin, MessageCircle } from "lucide-react";
import { OpenStatus } from "@/components/OpenStatus";
import { SizzlingPlate } from "@/components/SizzlingPlate";
import { formatTime } from "@/lib/hours";
import type { Business, DaySchedule } from "@/lib/types";

export function Hero({ business, hours }: { business: Business; hours: DaySchedule[] }) {
  const firstOpen = hours.find((day) => !day.closed && day.close);

  return (
    <section id="top" className="relative">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-6 sm:px-8 lg:min-h-[calc(100svh_-_4rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-20">
        <div className="enter relative z-10 max-w-xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <OpenStatus hours={hours} timezone={business.timezone} />
            <span className="text-sm text-ink-3">{business.area}</span>
          </div>

          <h1 className="mt-6 font-display text-[46px] leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[76px]">
            Still sizzling
            <br />
            past midnight.
          </h1>

          <p className="mt-5 max-w-md text-lg leading-8 text-ink-2">
            Sisig, chicken, bangus and liempo on cast iron, with rice. Served hot in{" "}
            {business.area}
            {firstOpen ? ` until ${formatTime(firstOpen.close)}` : ""}.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="btn btn-primary" href={business.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin size={18} strokeWidth={1.5} aria-hidden />
              Get directions
            </a>
            <a className="btn btn-secondary" href={business.messengerUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={18} strokeWidth={1.5} aria-hidden />
              Message us
            </a>
          </div>

          <p className="mt-5 text-sm text-ink-3">Walk-ins welcome · Message ahead for pickup</p>
        </div>

        <div className="relative -mx-5 sm:-mx-8 lg:mx-0">
          <SizzlingPlate className="mx-auto h-auto w-full max-w-[560px] lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
