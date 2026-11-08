insert into business (
  id, name, short_name, area, address_line, locality, region, postal_code, country,
  phone_display, phone_e164, messenger_url, facebook_url, maps_url, timezone
) values (
  1, 'Night Owls'' Sizzlogan', 'Night Owls', 'Palo, Leyte', 'Palo town proper', 'Palo', 'Leyte', '6501', 'PH',
  '+63 917 000 0000', '+639170000000',
  'https://m.me/nightowlssizzlogan',
  'https://www.facebook.com/nightowlssizzlogan',
  'https://www.google.com/maps/search/?api=1&query=Night+Owls+Sizzlogan+Palo+Leyte',
  'Asia/Manila'
)
on conflict (id) do update set
  name = excluded.name,
  short_name = excluded.short_name,
  area = excluded.area,
  address_line = excluded.address_line,
  locality = excluded.locality,
  region = excluded.region,
  postal_code = excluded.postal_code,
  country = excluded.country,
  phone_display = excluded.phone_display,
  phone_e164 = excluded.phone_e164,
  messenger_url = excluded.messenger_url,
  facebook_url = excluded.facebook_url,
  maps_url = excluded.maps_url,
  timezone = excluded.timezone,
  updated_at = now();

insert into opening_hours (day_index, is_closed, opens, closes) values
  (0, false, '17:00', '01:00'),
  (1, false, '17:00', '01:00'),
  (2, false, '17:00', '01:00'),
  (3, false, '17:00', '01:00'),
  (4, false, '17:00', '01:00'),
  (5, false, '17:00', '01:00'),
  (6, false, '17:00', '01:00')
on conflict (day_index) do update set
  is_closed = excluded.is_closed,
  opens = excluded.opens,
  closes = excluded.closes;

insert into menu_groups (slug, title, note, position, is_primary) values
  ('sizzling', 'Sizzling plates', 'Rice included', 1, true),
  ('rice-meals', 'Rice meals', null, 2, false),
  ('silog', 'Silog', 'Garlic rice and egg', 3, false),
  ('extras', 'Add-ons and drinks', null, 4, false)
on conflict (slug) do update set
  title = excluded.title,
  note = excluded.note,
  position = excluded.position,
  is_primary = excluded.is_primary;

insert into menu_items (group_id, name, note, price, heat, tag, position)
select
  g.id,
  v.name,
  nullif(v.note, ''),
  v.price,
  nullif(v.heat, '')::smallint,
  nullif(v.tag, ''),
  v.position
from (values
  ('sizzling', 'Sizzling Sisig', 'Pork jowl, chili, calamansi', 139, '3', '', 1),
  ('sizzling', 'Sizzling Porkchop', 'Soy-garlic sauce', 159, '2', '', 2),
  ('sizzling', 'Sizzling Chicken', 'Boneless thigh, garlic butter', 149, '2', '', 3),
  ('sizzling', 'Sizzling Bangus', 'Boneless milkfish, tomato, onion', 169, '1', '', 4),
  ('sizzling', 'Sizzling Squid', 'Chili and calamansi', 179, '2', '', 5),
  ('sizzling', 'Sizzling Beef Salpicao', 'Tenderloin tips, garlic', 199, '2', '', 6),
  ('sizzling', 'Sizzling Pork Belly', 'Liempo strips, chili soy', 189, '2', '', 7),
  ('sizzling', 'Sizzling Tofu Sisig', 'Crisp tofu, chili, calamansi', 129, '2', 'Vegetarian', 8),
  ('rice-meals', 'Grilled Liempo', 'Garlic rice and atsara', 149, '', '', 1),
  ('rice-meals', 'Pork BBQ', 'Two sticks, garlic rice, atsara', 139, '', '', 2),
  ('rice-meals', 'Chicken Inasal', 'Grilled leg quarter, garlic rice', 159, '', '', 3),
  ('rice-meals', 'Breaded Porkchop', 'Garlic rice and gravy', 149, '', '', 4),
  ('silog', 'TapSiLog', 'Beef tapa, garlic rice, egg', 109, '', '', 1),
  ('silog', 'LongSiLog', 'Sweet pork sausage, garlic rice, egg', 119, '', '', 2),
  ('silog', 'BangSiLog', 'Bangus flakes, garlic rice, egg', 129, '', '', 3),
  ('silog', 'Chicken Silog', 'Grilled chicken, garlic rice, egg', 129, '', '', 4),
  ('extras', 'Extra garlic rice', '', 25, '', '', 1),
  ('extras', 'Fried egg', '', 20, '', '', 2),
  ('extras', 'Melted cheese', '', 25, '', '', 3),
  ('extras', 'Unlimited rice upgrade', 'Dine-in only', 39, '', '', 4),
  ('extras', 'House iced tea', '', 45, '', '', 5),
  ('extras', 'Calamansi juice', '', 45, '', '', 6),
  ('extras', 'Softdrinks', 'In can', 35, '', '', 7),
  ('extras', 'Brewed coffee', '', 50, '', '', 8),
  ('extras', 'Bottled water', '', 20, '', '', 9)
) as v(group_slug, name, note, price, heat, tag, position)
join menu_groups g on g.slug = v.group_slug
on conflict (group_id, name) do update set
  note = excluded.note,
  price = excluded.price,
  heat = excluded.heat,
  tag = excluded.tag,
  position = excluded.position;
