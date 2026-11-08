import { ArrowUpRight, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Business } from "@/lib/types";

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4 py-4 first:pt-0 last:pb-0">
      <Icon size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ink-3" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs text-ink-3">{label}</p>
        <div className="mt-1 text-[15px] text-ink">{children}</div>
      </div>
    </li>
  );
}

export function Visit({ business }: { business: Business }) {
  const address = [
    business.address.line,
    business.address.locality,
    business.address.region,
    business.address.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section id="visit" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-4xl tracking-[-0.02em] sm:text-5xl">
            Come by after work
          </h2>
          <p className="mt-4 max-w-sm text-ink-2">
            A short ride from Tacloban. Walk in, or message ahead for pickup.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={`tel:${business.phone.e164}`}>
              <Phone size={18} strokeWidth={1.5} aria-hidden />
              Call {business.phone.display}
            </a>
            <a
              className="btn btn-secondary"
              href={business.messengerUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} strokeWidth={1.5} aria-hidden />
              Message us
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <ul className="divide-y divide-line">
            <Row icon={MapPin} label="Address">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-ember-soft"
              >
                {address}
              </a>
            </Row>
            <Row icon={Phone} label="Phone">
              <a
                href={`tel:${business.phone.e164}`}
                className="tabular-nums transition-colors hover:text-ember-soft"
              >
                {business.phone.display}
              </a>
            </Row>
            <Row icon={MessageCircle} label="Messenger">
              <a
                href={business.messengerUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-ember-soft"
              >
                m.me/nightowlssizzlogan
              </a>
            </Row>
            <Row icon={ArrowUpRight} label="Facebook">
              <a
                href={business.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-ember-soft"
              >
                Night Owls’ Sizzlogan
              </a>
            </Row>
          </ul>
        </div>
      </div>
    </section>
  );
}
