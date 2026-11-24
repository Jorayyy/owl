import { Menu, Phone } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import type { Business } from "@/lib/types";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#hours", label: "Hours" },
  { href: "#visit", label: "Visit" },
];

export function SiteHeader({ business }: { business: Business }) {
  return (
    <header className="relative z-30">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6 sm:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <BrandMark className="size-7 shrink-0 text-ink" />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-[21px] font-semibold tracking-[-0.01em]">
              {business.shortName}’
            </span>
            <span className="mt-1 hidden truncate text-xs text-ink-3 sm:block">
              Sizzlogan · {business.area}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
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
          <a href={`tel:${business.phone.e164}`} className="btn btn-primary h-11 px-5 text-sm">
            <Phone size={16} strokeWidth={1.75} aria-hidden />
            Call
          </a>

          <details className="relative md:hidden">
            <summary
              className="btn btn-secondary h-11 w-11 cursor-pointer list-none px-0 [&::-webkit-details-marker]:hidden"
              aria-label="Open section menu"
            >
              <Menu size={18} strokeWidth={1.75} aria-hidden />
            </summary>
            <div className="absolute right-0 mt-2 w-48 rounded-sm bg-raised p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-sm px-3 py-2.5 text-sm text-ink-2 transition-colors hover:bg-surface hover:text-ink"
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
