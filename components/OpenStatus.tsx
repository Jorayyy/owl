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
  const open = status?.open ?? false;

  return (
    <span className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
      <span className="inline-flex items-center gap-2 text-ink-2">
        <span aria-hidden className={`size-1.5 rounded-full ${open ? "bg-ember" : "bg-ink-3"}`} />
        <span className={open ? "text-ink" : "text-ink-2"}>
          {status ? (open ? "Open now" : "Closed") : "Open daily"}
        </span>
      </span>
      <span aria-hidden className="text-ink-3">
        ·
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
