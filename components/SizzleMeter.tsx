import { Flame } from "lucide-react";
import type { Heat } from "@/lib/types";

export function SizzleMeter({ level }: { level: Heat }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`Heat ${level} of 3`}>
      {[1, 2, 3].map((step) => (
        <Flame
          key={step}
          size={16}
          strokeWidth={1.5}
          aria-hidden
          fill={step <= level ? "currentColor" : "none"}
          className={step <= level ? "text-ember" : "text-ink-3/40"}
        />
      ))}
    </span>
  );
}
