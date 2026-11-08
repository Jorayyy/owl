import { cache } from "react";
import { getSql } from "@/lib/db";
import { fallbackBusiness, fallbackGroups, fallbackHours } from "@/lib/fallback";
import { DAYS } from "@/lib/hours";
import type { Business, DaySchedule, Heat, MenuGroup, MenuItem } from "@/lib/types";

export type SiteData = {
  business: Business;
  hours: DaySchedule[];
  groups: MenuGroup[];
};

const fallback: SiteData = {
  business: fallbackBusiness,
  hours: fallbackHours,
  groups: fallbackGroups,
};

export const getSiteData = cache(async (): Promise<SiteData> => {
  const sql = getSql();
  if (!sql) return fallback;

  try {
    const [businessRows, hourRows, groupRows, itemRows] = await Promise.all([
      sql`select name, short_name, area, address_line, locality, region, postal_code, country,
                 phone_display, phone_e164, messenger_url, facebook_url, maps_url, timezone
          from business where id = 1`,
      sql`select day_index, is_closed,
                 to_char(opens, 'HH24:MI') as opens,
                 to_char(closes, 'HH24:MI') as closes
          from opening_hours order by day_index`,
      sql`select id, slug, title, note, is_primary from menu_groups order by position, id`,
      sql`select id, group_id, name, note, price, heat, tag, is_available from menu_items order by position, id`,
    ]);

    const row = businessRows[0];
    if (!row) return fallback;

    const business: Business = {
      name: row.name,
      shortName: row.short_name,
      area: row.area,
      address: {
        line: row.address_line,
        locality: row.locality,
        region: row.region,
        postalCode: row.postal_code,
        country: row.country,
      },
      phone: {
        display: row.phone_display,
        e164: row.phone_e164,
      },
      messengerUrl: row.messenger_url,
      facebookUrl: row.facebook_url,
      mapsUrl: row.maps_url,
      timezone: row.timezone,
    };

    const hourByDay = new Map<number, (typeof hourRows)[number]>();
    for (const hour of hourRows) hourByDay.set(Number(hour.day_index), hour);

    const hours: DaySchedule[] = DAYS.map((day, dayIndex) => {
      const hour = hourByDay.get(dayIndex);
      return {
        dayIndex,
        day,
        closed: hour ? Boolean(hour.is_closed) : false,
        open: hour?.opens ?? "",
        close: hour?.closes ?? "",
      };
    });

    const groups: MenuGroup[] = groupRows.map((group) => ({
      slug: group.slug,
      title: group.title,
      note: group.note,
      primary: Boolean(group.is_primary),
      items: itemRows
        .filter((item) => item.group_id === group.id)
        .map(
          (item): MenuItem => ({
            id: item.id,
            name: item.name,
            note: item.note,
            price: item.price,
            heat: item.heat === null ? null : (Number(item.heat) as Heat),
            tag: item.tag,
            available: Boolean(item.is_available),
          }),
        ),
    }));

    if (!groups.length) return fallback;

    return { business, hours, groups };
  } catch (error) {
    console.error("Neon query failed, serving fallback menu", error);
    return fallback;
  }
});
