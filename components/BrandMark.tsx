export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Night Owls">
      <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <path
        d="M33 15.5c1.6 7.4 9.6 10.6 9.6 20.4a10.6 10.6 0 1 1-21.2 0c0-6.7 4.8-9.7 7-14.4 1 3.7 2.6 5.8 4.8 6.8-.4-5.6-1.4-9.4-.2-12.8Z"
        fill="#e4572e"
      />
    </svg>
  );
}
