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
    <ul>
      {ordered.map((day) => {
        const isToday = today === day.dayIndex;
        return (
          <li
            key={day.dayIndex}
            className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 ${
              isToday ? "bg-raised" : ""
            }`}
          >
            <span className="flex items-center gap-3 text-[15px]">
              <span className={isToday ? "text-ink" : "text-ink-2"}>{day.day}</span>
              {isToday ? <span className="text-[11px] text-ember">Today</span> : null}
            </span>
            <span className="tabular-nums text-[15px] text-ink-2">
              {day.closed || !day.open || !day.close
                ? "Closed"
                : `${formatTime(day.open)} – ${formatTime(day.close)}`}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
