import type { DaySchedule } from "@/lib/types";

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type OpenStatusResult = {
  open: boolean;
  detail: string;
};

export function toMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatTime(value: string): string {
  if (!value) return "";
  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 === 0 ? 12 : hours % 12;
  return minutes === 0 ? `${hour} ${suffix}` : `${hour}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function manilaNow(timezone: string, date = new Date()): { dayIndex: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const weekday = value("weekday");
  const found = DAYS.indexOf(weekday as (typeof DAYS)[number]);
  return {
    dayIndex: found < 0 ? 0 : found,
    minutes: Number(value("hour")) * 60 + Number(value("minute")),
  };
}

export function todayIndex(timezone: string): number {
  return manilaNow(timezone).dayIndex;
}

function scheduleFor(hours: DaySchedule[], dayIndex: number): DaySchedule | undefined {
  return hours.find((day) => day.dayIndex === dayIndex);
}

export function getOpenStatus(
  hours: DaySchedule[],
  timezone: string,
  date = new Date(),
): OpenStatusResult {
  const { dayIndex, minutes } = manilaNow(timezone, date);
  const today = scheduleFor(hours, dayIndex);
  const yesterday = scheduleFor(hours, (dayIndex + 6) % 7);

  if (today && !today.closed && today.open && today.close) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (close > open) {
      if (minutes >= open && minutes < close) {
        return { open: true, detail: `closes ${formatTime(today.close)}` };
      }
    } else if (minutes >= open) {
      return { open: true, detail: `closes ${formatTime(today.close)}` };
    }
  }

  if (yesterday && !yesterday.closed && yesterday.open && yesterday.close) {
    const open = toMinutes(yesterday.open);
    const close = toMinutes(yesterday.close);
    if (close <= open && minutes < close) {
      return { open: true, detail: `closes ${formatTime(yesterday.close)}` };
    }
  }

  if (today && !today.closed && today.open && minutes < toMinutes(today.open)) {
    return { open: false, detail: `opens ${formatTime(today.open)}` };
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const next = scheduleFor(hours, (dayIndex + offset) % 7);
    if (next && !next.closed && next.open) {
      const label = offset === 1 ? "tomorrow" : next.day;
      return { open: false, detail: `opens ${label} ${formatTime(next.open)}` };
    }
  }

  return { open: false, detail: "closed" };
}
