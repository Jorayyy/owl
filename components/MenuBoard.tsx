import { ArrowUpRight } from "lucide-react";
import { SizzleMeter } from "@/components/SizzleMeter";
import { formatPrice } from "@/lib/format";
import type { MenuGroup, MenuItem } from "@/lib/types";

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li className="py-3.5 first:pt-0">
      <div className="flex items-baseline gap-3">
        <span
          className={`text-[15px] ${item.available ? "text-ink" : "text-ink-3 line-through"}`}
        >
          {item.name}
        </span>
        {item.tag ? <span className="text-[13px] text-ember-soft">{item.tag}</span> : null}
        {item.heat ? <SizzleMeter level={item.heat} /> : null}
        <span className="leader" aria-hidden />
        <span
          className={`shrink-0 tabular-nums text-[15px] ${
            item.available ? "text-ink" : "text-ink-3"
          }`}
        >
          {formatPrice(item.price)}
        </span>
      </div>
      {item.note ? <p className="mt-1 text-[13px] leading-5 text-ink-3">{item.note}</p> : null}
      {item.available ? null : <p className="mt-1 text-[13px] text-ink-3">Sold out</p>}
    </li>
  );
}

function MenuList({ items, split = false }: { items: MenuItem[]; split?: boolean }) {
  const half = Math.ceil(items.length / 2);
  const columns = split ? [items.slice(0, half), items.slice(half)] : [items];

  return (
    <div className={split ? "grid gap-x-14 sm:grid-cols-2" : ""}>
      {columns.map((column, index) => (
        <ul key={index}>
          {column.map((item) => (
            <MenuRow key={item.id} item={item} />
          ))}
        </ul>
      ))}
    </div>
  );
}

export function MenuBoard({
  groups,
  messengerUrl,
}: {
  groups: MenuGroup[];
  messengerUrl: string;
}) {
  const primary = groups.find((group) => group.primary) ?? groups[0];
  const rest = groups.filter((group) => group !== primary);

  return (
    <section id="menu" className="reveal scroll-mt-20 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
              The full board
            </h2>
            <p className="mt-4 max-w-md text-ink-2">
              Every sizzling plate comes with rice. Prices in Philippine pesos.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-ink-3">
            <SizzleMeter level={3} />
            <span>Three flames, hottest</span>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-baseline justify-between gap-6">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">{primary.title}</h3>
            {primary.note ? <span className="text-xs text-ink-3">{primary.note}</span> : null}
          </div>
          <div className="mt-6">
            <MenuList items={primary.items} split />
          </div>
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-14 lg:grid-cols-3">
          {rest.map((group) => (
            <div key={group.slug}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                {group.note ? <span className="text-xs text-ink-3">{group.note}</span> : null}
              </div>
              <div className="mt-5">
                <MenuList items={group.items} />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-14 text-sm text-ink-3">
          Ask about today’s specials on{" "}
          <a
            className="inline-flex items-center gap-1 text-ember-soft transition-colors hover:text-ember"
            href={messengerUrl}
            target="_blank"
            rel="noreferrer"
          >
            Messenger
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
          </a>
        </p>
      </div>
    </section>
  );
}
