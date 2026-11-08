import { Menu, Phone } from "lucide-react";
import type { Business } from "@/lib/types";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#hours", label: "Hours" },
  { href: "#visit", label: "Visit" },
];

export function SiteHeader({ business }: { business: Business }) {
  return (
    <header className="relative z-30">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-w-0 items-baseline gap-2.5">
          <span className="font-display text-[22px] leading-none tracking-[-0.01em]">
            {business.shortName}’
          </span>
          <span className="hidden truncate text-xs text-ink-3 sm:block">
            Sizzlogan · {business.area}
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:${business.phone.e164}`} className="btn btn-secondary h-9 px-4 text-sm">
            <Phone size={16} strokeWidth={1.5} aria-hidden />
            Call
          </a>

          <details className="relative md:hidden">
            <summary
              className="btn btn-secondary h-9 w-9 cursor-pointer list-none px-0 [&::-webkit-details-marker]:hidden"
              aria-label="Open section menu"
            >
              <Menu size={18} strokeWidth={1.5} aria-hidden />
            </summary>
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-surface p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-2 transition-colors hover:bg-raised hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
