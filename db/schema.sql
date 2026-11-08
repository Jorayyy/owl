create table if not exists business (
  id smallint primary key default 1 check (id = 1),
  name text not null,
  short_name text not null,
  area text not null,
  address_line text not null default '',
  locality text not null,
  region text not null,
  postal_code text not null,
  country text not null default 'PH',
  phone_display text not null,
  phone_e164 text not null,
  messenger_url text not null,
  facebook_url text not null,
  maps_url text not null,
  timezone text not null default 'Asia/Manila',
  updated_at timestamptz not null default now()
);

create table if not exists opening_hours (
  day_index smallint primary key check (day_index between 0 and 6),
  is_closed boolean not null default false,
  opens time,
  closes time,
  constraint opening_hours_times check (is_closed or (opens is not null and closes is not null))
);

create table if not exists menu_groups (
  id serial primary key,
  slug text not null unique,
  title text not null,
  note text,
  position integer not null default 0,
  is_primary boolean not null default false
);

create table if not exists menu_items (
  id serial primary key,
  group_id integer not null references menu_groups(id) on delete cascade,
  name text not null,
  note text,
  price integer not null check (price >= 0),
  heat smallint check (heat between 1 and 3),
  tag text,
  is_available boolean not null default true,
  position integer not null default 0,
  unique (group_id, name)
);

create index if not exists menu_items_group_index on menu_items (group_id, position);
