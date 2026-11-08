"use client";

import { useEffect, useState } from "react";
import { formatTime, getOpenStatus, type OpenStatusResult } from "@/lib/hours";
import type { DaySchedule } from "@/lib/types";

export function OpenStatus({ hours, timezone }: { hours: DaySchedule[]; timezone: string }) {
  const [status, setStatus] = useState<OpenStatusResult | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus(hours, timezone));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [hours, timezone]);

  const firstOpen = hours.find((day) => !day.closed && day.open);

  return (
    <span className="inline-flex h-8 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-[13px]">
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${status?.open ? "bg-ember" : "bg-ink-3"}`}
      />
      <span className="text-ink">
        {status ? (status.open ? "Open now" : "Closed") : "Open daily"}
      </span>
      <span className="text-ink-3">
        {status
          ? status.detail
          : firstOpen
            ? `${formatTime(firstOpen.open)} – ${formatTime(firstOpen.close)}`
            : ""}
      </span>
    </span>
  );
}
