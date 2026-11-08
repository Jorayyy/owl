import { ArrowUpRight } from "lucide-react";
import { SizzleMeter } from "@/components/SizzleMeter";
import { formatPrice } from "@/lib/format";
import type { MenuGroup, MenuItem } from "@/lib/types";

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex items-start gap-4 border-t border-line py-3.5">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={`text-[15px] ${item.available ? "text-ink" : "text-ink-3"}`}>
            {item.name}
          </span>
          {item.tag ? (
            <span className="rounded border border-line px-1.5 py-0.5 text-[11px] leading-4 text-ink-3">
              {item.tag}
            </span>
          ) : null}
          {item.heat ? <SizzleMeter level={item.heat} /> : null}
          {item.available ? null : <span className="text-[11px] text-ink-3">Sold out</span>}
        </div>
        {item.note ? <p className="mt-1 text-[13px] leading-5 text-ink-3">{item.note}</p> : null}
      </div>
      <span
        className={`tabular-nums text-[15px] ${item.available ? "text-ink" : "text-ink-3"}`}
      >
        {formatPrice(item.price)}
      </span>
    </li>
  );
}

function MenuList({ items, split = false }: { items: MenuItem[]; split?: boolean }) {
  const half = Math.ceil(items.length / 2);
  const columns = split ? [items.slice(0, half), items.slice(half)] : [items];

  return (
    <div className={split ? "grid gap-x-12 sm:grid-cols-2" : ""}>
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
    <section id="menu" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-4xl tracking-[-0.02em] sm:text-5xl">The board</h2>
            <p className="mt-3 max-w-md text-ink-2">
              Every sizzling plate comes with rice. Prices in Philippine pesos.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-ink-3">
            <SizzleMeter level={3} />
            <span>Three flames, hottest</span>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex items-baseline justify-between gap-6">
            <h3 className="font-display text-2xl sm:text-3xl">{primary.title}</h3>
            {primary.note ? <span className="text-xs text-ink-3">{primary.note}</span> : null}
          </div>
          <div className="mt-6">
            <MenuList items={primary.items} split />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {rest.map((group) => (
            <div key={group.slug} className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl">{group.title}</h3>
                {group.note ? <span className="text-xs text-ink-3">{group.note}</span> : null}
              </div>
              <div className="mt-4">
                <MenuList items={group.items} />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-ink-3">
          Ask about today’s specials on{" "}
          <a
            className="inline-flex items-center gap-1 text-ink-2 transition-colors hover:text-ember-soft"
            href={messengerUrl}
            target="_blank"
            rel="noreferrer"
          >
            Messenger
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
          </a>
        </p>
      </div>
    </section>
  );
}
