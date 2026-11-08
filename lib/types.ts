export type Heat = 1 | 2 | 3;

export type Business = {
  name: string;
  shortName: string;
  area: string;
  address: {
    line: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  phone: {
    display: string;
    e164: string;
  };
  messengerUrl: string;
  facebookUrl: string;
  mapsUrl: string;
  timezone: string;
};

export type DaySchedule = {
  dayIndex: number;
  day: string;
  closed: boolean;
  open: string;
  close: string;
};

export type MenuItem = {
  id: number;
  name: string;
  note: string | null;
  price: number;
  heat: Heat | null;
  tag: string | null;
  available: boolean;
};

export type MenuGroup = {
  slug: string;
  title: string;
  note: string | null;
  primary: boolean;
  items: MenuItem[];
};
