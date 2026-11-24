"use client";

import { useEffect, useState } from "react";
import { formatTime, todayIndex } from "@/lib/hours";
import type { DaySchedule } from "@/lib/types";

export function HoursTable({ hours, timezone }: { hours: DaySchedule[]; timezone: string }) {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(todayIndex(timezone));
  }, [timezone]);

  const ordered = [...hours.slice(1), hours[0]];

  return (
    <dl>
      {ordered.map((day) => {
        const isToday = today === day.dayIndex;
        const closed = day.closed || !day.open || !day.close;
        return (
          <div
            key={day.dayIndex}
            className={`flex items-baseline justify-between gap-6 py-4 ${
              isToday ? "text-ink" : "text-ink-2"
            }`}
          >
            <dt className="flex items-center gap-2.5 text-[15px]" aria-current={isToday ? "date" : undefined}>
              <span
                aria-hidden
                className={`size-1.5 rounded-full ${isToday ? "bg-ember" : "bg-transparent"}`}
              />
              {day.day}
            </dt>
            <dd className="tabular-nums text-[15px]">
              {closed ? "Closed" : `${formatTime(day.open)} – ${formatTime(day.close)}`}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
